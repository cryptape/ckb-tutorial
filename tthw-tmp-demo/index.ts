import { Hash, Cell, RPC, commons, helpers as lumosHelpers, HexString, hd } from "@ckb-lumos/lumos";
import { generateAccountFromPrivateKey, ckbIndexer, CKB_TESTNET_EXPLORER } from "./helper";
import { CHARLIE } from "./test-keys";
import { Account } from "./type";

// get a test key used for demo purposes
const testPrivKey = CHARLIE.PRIVATE_KEY;

// get the account info from the test private key
const testAccount: Account = generateAccountFromPrivateKey(testPrivKey);
console.assert(testAccount.address === CHARLIE.ADDRESS);

/** create a new transaction that adds a cell with the message "Common Knowledge: Hello world!" */
const constructHelloWorldTx = async (
  onChainMemo: string
): Promise<lumosHelpers.TransactionSkeletonType> => {
  const onChainMemoHex: string = "0x" + Buffer.from(onChainMemo).toString("hex");
  console.log(`onChainMemoHex: ${onChainMemoHex}`);

  const { injectCapacity, payFeeByFeeRate } = commons.common;
  let txSkeleton = lumosHelpers.TransactionSkeleton({ cellProvider: ckbIndexer });

  // FAQ: How do you set the value of capacity in a Cell?
  // See: https://docs.nervos.org/docs/essays/faq/#how-do-you-set-the-value-of-capacity-in-a-cell
  const targetCellCapacity = BigInt(8 + 32 + 20 + 1 + onChainMemo.length) * 100000000n;

  const targetOutput: Cell = {
    cellOutput: {
      capacity: "0x" + targetCellCapacity.toString(16),
      // In this demo, we only want to write a message on chain, so we define the 
      // target lock script to be the test account itself.
      lock: testAccount.lockScript, // toScript
    },
    data: onChainMemoHex,
  };
  txSkeleton = txSkeleton.update("outputs", (outputs) => outputs.push(targetOutput));

  // FIXME: The data of the input cells should be empty => don't inject memo cells
  txSkeleton = await injectCapacity(
    txSkeleton,
    [testAccount.address],
    targetCellCapacity,
    undefined,
    undefined,
    {
      enableDeductCapacity: false
    }
  );
  txSkeleton = await payFeeByFeeRate(txSkeleton, [testAccount.address], 1000, undefined, {
    enableDeductCapacity: false
  });

  console.debug(`txSkeleton: ${JSON.stringify(txSkeleton, undefined, 2)}`);
  return txSkeleton;
}

/** Sign the prepared transaction skeleton, then send it to CKB. */
const signAndSendTx = async (
  txSkeleton: lumosHelpers.TransactionSkeletonType,
  privateKey: HexString,
): Promise<Hash> => {
  const { prepareSigningEntries } = commons.common;
  txSkeleton = prepareSigningEntries(txSkeleton);

  const message = txSkeleton.get('signingEntries').get(0)?.message;

  // sign the transaction with the private key
  const Sig = hd.key.signRecoverable(message!, privateKey);
  const signedTx = lumosHelpers.sealTransaction(txSkeleton, [Sig]);

  // create a new RPC instance pointing to CKB testnet
  const rpc = new RPC("https://testnet.ckb.dev/rpc");

  // send the transaction to CKB node, null and passthrough mean skipping outputs validation
  const txHash = await rpc.sendTransaction(signedTx)
  return txHash;
}

(async () => {
  // Let's use Charlie's account as a test account which is only for demo purposes,
  // please DO NOT use it in production environments!
  console.log(`Charlie's account: ${JSON.stringify(testAccount, undefined, 2)}`);
  console.log(`Explorer: ${CKB_TESTNET_EXPLORER}/address/${testAccount.address}\n\n`);

  // Step 1: this is the message that will be written on chain
  const onChainMemo: string = "Common Knowledge: Hello world!";

  // Step 2: construct the transaction
  let txSkeleton = await constructHelloWorldTx(onChainMemo);

  // Step 3: sign and send the transaction
  const txHash = await signAndSendTx(txSkeleton, testPrivKey);
  console.log(`Transaction ${txHash} sent.\n`);

  // Done, let's see the transaction in CKB Testnet Explorer
  console.log(`See ${CKB_TESTNET_EXPLORER}/transaction/${txHash}`);
})();
