import { Hash, Cell, RPC, commons, helpers as lumosHelpers, HexString, hd } from "@ckb-lumos/lumos";
import { minimalScriptCapacity } from "@ckb-lumos/helpers"
import {
  CKB_TESTNET_EXPLORER, TESTNET_SCRIPTS, encodeStringToHex,
  generateAccountFromPrivateKey, ckbIndexer, collectInputCells, calculateTxFee, addWitness
} from "./helper";
import { CHARLIE } from "./test-keys";
import { Account, CapacityUnit } from "./type";

// get a test key used for demo purposes
const testPrivKey = CHARLIE.PRIVATE_KEY;

// get the account info from the test private key
const testAccount: Account = generateAccountFromPrivateKey(testPrivKey);
console.assert(testAccount.address === CHARLIE.ADDRESS);

/** 
 * create a new transaction that adds a cell with a given message
 * @param onChainMemo The message to be sent writted in the target cell
 * See https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0022-transaction-structure/0022-transaction-structure.md
 */
const constructHelloWorldTx = async (
  onChainMemo: string
): Promise<lumosHelpers.TransactionSkeletonType> => {
  const onChainMemoHex: HexString = encodeStringToHex(onChainMemo);
  console.log(`onChainMemoHex: ${onChainMemoHex}`);

  // CapacityUnit.Byte = 100000000, because 1 CKB = 100000000 shannon
  const dataOccupiedCapacity = BigInt(CapacityUnit.Byte * onChainMemo.length);

  // FAQ: How do you set the value of capacity in a Cell?
  // See: https://docs.nervos.org/docs/essays/faq/#how-do-you-set-the-value-of-capacity-in-a-cell
  const minimalCellCapacity = minimalScriptCapacity(testAccount.lockScript) + 800000000n; // 8 CKB for Capacity field itself
  const targetCellCapacity =  minimalCellCapacity + dataOccupiedCapacity;

  // collect the sender's live input cells with enough CKB capacity
  const inputCells: Cell[] = await collectInputCells(
    testAccount.lockScript,
    // requiredCapacity = targetCellCapacity + minimalCellCapacity
    targetCellCapacity + minimalCellCapacity
  );
  const collectedCapacity = inputCells.reduce((acc: bigint, cell: Cell) => {
    return acc + BigInt(cell.cellOutput.capacity);
  }, 0n);

  let txSkeleton = lumosHelpers.TransactionSkeleton({ cellProvider: ckbIndexer });
  // push the live input cells into the transaction's inputs array
  txSkeleton = txSkeleton.update("inputs", (inputs) => inputs.push(...inputCells));

  // the transaction needs cellDeps to indicate the lockScript's code (SECP256K1_BLAKE160)
  txSkeleton = txSkeleton.update("cellDeps", (cellDeps) =>
    cellDeps.push({
      outPoint: {
        txHash: TESTNET_SCRIPTS.SECP256K1_BLAKE160.TX_HASH,
        index: TESTNET_SCRIPTS.SECP256K1_BLAKE160.INDEX,
      },
      depType: TESTNET_SCRIPTS.SECP256K1_BLAKE160.DEP_TYPE,
    })
  );

  // push the output cells into the transaction's outputs array
  const targetCell: Cell = {
    cellOutput: {
      capacity: "0x" + targetCellCapacity.toString(16),
      // In this demo, we only want to write a message on chain, so we define the 
      // target lock script to be the test account itself.
      lock: testAccount.lockScript, // toScript
    },
    data: onChainMemoHex,
  };
  const changeCell: Cell = {
    cellOutput: {
      capacity: "0x" + (collectedCapacity - targetCellCapacity).toString(16),
      lock: testAccount.lockScript,
    },
    data: "0x",
  };
  txSkeleton = txSkeleton.update("outputs", (outputs) => outputs.push(...[targetCell, changeCell]));

  // add witness placeholder for the skeleton, it helps in transaction fee estimation
  txSkeleton = addWitness(txSkeleton);

  const fee: bigint = calculateTxFee(txSkeleton, 1002n /** fee rate */);
  // fee = sum(all input cells' capacity) - sum(all output cells' capacity),
  // therefore the changeCell's capacity is reduced to cover the transaction fee
  txSkeleton = txSkeleton.update("outputs", (outputs) => {
    if (outputs.size < 2) throw new Error("outputs.size < 2");
    const changeCellCapacity = collectedCapacity - targetCellCapacity - fee;
    changeCell.cellOutput.capacity = "0x" + changeCellCapacity.toString(16)
    return outputs.set(-1, changeCell);
  });

  console.debug(`txSkeleton: ${JSON.stringify(txSkeleton, undefined, 2)}`);
  return txSkeleton;
}

/** sign the prepared transaction skeleton, then send it to a CKB node. */
const signAndSendTx = async (
  txSkeleton: lumosHelpers.TransactionSkeletonType,
  privateKey: HexString,
): Promise<Hash> => {
  const { prepareSigningEntries } = commons.common;
  txSkeleton = prepareSigningEntries(txSkeleton);

  const message = txSkeleton.get('signingEntries').get(0)?.message;

  // sign the transaction with the private key
  const sig = hd.key.signRecoverable(message!, privateKey);
  const signedTx = lumosHelpers.sealTransaction(txSkeleton, [sig]);

  // create a new RPC instance pointing to CKB testnet
  const rpc = new RPC("https://testnet.ckb.dev/rpc");

  // send the transaction to CKB node
  const txHash = await rpc.sendTransaction(signedTx);
  return txHash;
}

(async () => {
  // Let's use Charlie's account as a test account which is only for demo purposes,
  // please DO NOT use it in production environments!
  console.log(`Charlie's account: ${JSON.stringify(testAccount, undefined, 2)}`);
  console.log(`Explorer: ${CKB_TESTNET_EXPLORER}/address/${testAccount.address}\n\n`);

  // Step 1: this is the message that will be written on chain
  const onChainMemo: string = "Hello Common Knowledge Base!";

  // Step 2: construct the transaction
  let txSkeleton = await constructHelloWorldTx(onChainMemo);

  // Step 3: sign and send the transaction
  const txHash = await signAndSendTx(txSkeleton, testPrivKey);
  console.log(`Transaction ${txHash} sent.\n`);

  // Done, let's see the transaction in CKB Testnet Explorer
  console.log(`See ${CKB_TESTNET_EXPLORER}/transaction/${txHash}`);
})();
