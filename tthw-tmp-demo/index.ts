import { generateAccountFromPrivateKey, ckbIndexer } from "./helper";
import { CHARLIE } from "./test-keys";
import { Hash, Cell, RPC, commons, helpers as lumosHelpers, HexString, hd, config } from "@ckb-lumos/lumos";
import { Account } from "./type";

// get a test key used for demo purposes
const testPrivKey = CHARLIE.PRIVATE_KEY;

// get the account info from the test private key
const account: Account = generateAccountFromPrivateKey(testPrivKey);
console.assert(account.address === CHARLIE.ADDRESS);
console.log(`Charlie's account: ${JSON.stringify(account, undefined, 2)}`);
const CKB_TESTNET_EXPLORER = "https://pudge.explorer.nervos.org";
console.log(`Explorer: ${CKB_TESTNET_EXPLORER}/address/${account.address}`);

// TODO: one line code to get faucet from https://faucet.nervos.org or https://github.com/Flouse/nervos-functions#faucet

// create a new transaction that adds a cell with the message "Common Knowledge: Hello world!"
const constructHelloWorldTx = async (): Promise<lumosHelpers.TransactionSkeletonType> => {
  const onChainMemo: string = "Common Knowledge: Hello world!";
  const onChainMemoHex: string = "0x" + Buffer.from(onChainMemo).toString("hex");
  console.log(`onChainMemoHex: ${onChainMemoHex}`);

  const { injectCapacity, payFeeByFeeRate } = commons.common;
  let txSkeleton = lumosHelpers.TransactionSkeleton({ cellProvider: ckbIndexer });

  // FAQ: How do you set the value of capacity in a Cell?
  // https://docs.nervos.org/docs/essays/faq/#how-do-you-set-the-value-of-capacity-in-a-cell
  const targetCellCapacity = BigInt(8 + 32 + 20 + 1 + onChainMemo.length) * 100000000n;


  const targetOutput: Cell = {
    cellOutput: {
      capacity: "0x" + targetCellCapacity.toString(16),
      // In this demo, we only want to write a message on chain, so we define the 
      // target lock script to be the test account itself.
      lock: account.lockScript, // toScript
    },
    data: onChainMemoHex,
  };
  txSkeleton = txSkeleton.update("outputs", (outputs) => outputs.push(targetOutput));

  // FIXME: The data of the input cells should be empty
  txSkeleton = await injectCapacity(
    txSkeleton,
    [account.address],
    targetCellCapacity,
    undefined,
    undefined,
    {
      enableDeductCapacity: false
    }
  );

  txSkeleton = await payFeeByFeeRate(txSkeleton, [account.address], 1000, undefined, {
    enableDeductCapacity: true
  });

  console.debug(`txSkeleton: ${JSON.stringify(txSkeleton, undefined, 2)}`);
  return txSkeleton;
}

/**
 * Sign the prepared transaction skeleton, then send it to CKB.
 */
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
  const txHash = await rpc.sendTransaction(signedTx, 'passthrough')
  return txHash;
}

(async () => {
  let txSkeleton = await constructHelloWorldTx();
  const txHash = await signAndSendTx(txSkeleton, testPrivKey);
  console.log(`Transaction sent: ${txHash}`);
})();
