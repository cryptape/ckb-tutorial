import { blockchain } from "@ckb-lumos/base";
import { bytes } from "@ckb-lumos/codec";
import {
  Address,
  BI,
  Cell,
  HexString,
  Indexer,
  Script,
  Transaction,
  WitnessArgs,
  config,
  hd,
  helpers as lumosHelpers,
} from "@ckb-lumos/lumos";
import { Account } from "./type";

export {
  payFeeByFeeRate,
  prepareSigningEntries,
} from "@ckb-lumos/common-scripts/lib/common";

export const CKB_TESTNET_EXPLORER = "https://pudge.explorer.nervos.org";
export const CKB_TESTNET_RPC = "https://testnet.ckb.dev/rpc";
export const ckbIndexer = new Indexer(CKB_TESTNET_RPC);

// This tutorial uses CKB testnet.
// CKB Testnet Explorer: https://pudge.explorer.nervos.org
config.initializeConfig(config.predefined.AGGRON4);
export const TESTNET_SCRIPTS = config.predefined.AGGRON4.SCRIPTS;

// get the address of CKB testnet from the private key
export const getAddressByPrivateKey = (privateKey: HexString): Address => {
  const args = hd.key.privateKeyToBlake160(privateKey);
  // rome-ignore lint: SECP256K1_BLAKE160 script should exist
  const template = TESTNET_SCRIPTS["SECP256K1_BLAKE160"]!;
  const lockScript = {
    codeHash: template.CODE_HASH,
    hashType: template.HASH_TYPE,
    args: args,
  };

  return lumosHelpers.encodeToAddress(lockScript);
};

// generate an Account from the private key
export const generateAccountFromPrivateKey = (privateKey: string): Account => {
  const pubKey = hd.key.privateToPublic(privateKey);
  const args = hd.key.publicKeyToBlake160(pubKey);
  // rome-ignore lint: SECP256K1_BLAKE160 script should exist
  const template = TESTNET_SCRIPTS["SECP256K1_BLAKE160"]!;
  const lockScript = {
    codeHash: template.CODE_HASH,
    hashType: template.HASH_TYPE,
    args: args,
  };
  const address = lumosHelpers.encodeToAddress(lockScript);

  return {
    lockScript,
    address,
    pubKey,
  };
};

/**
 * Get CKB balance of an address
 *
 * In CKB, the CKB balance is the sum of all capacity field of the Cells owned
 * by the address
 * @param address
 * @returns
 */
export async function getCapacities(address: string): Promise<BI> {
  const collector = ckbIndexer.collector({
    lock: lumosHelpers.parseAddress(address),
  });

  let capacities = BI.from(0);
  for await (const cell of collector.collect()) {
    capacities = capacities.add(cell.cellOutput.capacity);
  }

  return capacities;
}

export async function capacityOf(lock: Script): Promise<BI> {
  const collector = ckbIndexer.collector({ lock });

  let balance: BI = BI.from(0);
  for await (const cell of collector.collect()) {
    balance = balance.add(cell.cellOutput.capacity);
  }

  return balance;
}

/**
 * collect input cells with empty output data
 * @param lock The lock script protects the input cells
 * @param requiredCapacity The required capacity sum of the input cells
 */
export async function collectInputCells(
  lock: Script,
  requiredCapacity: bigint,
): Promise<Cell[]> {
  const collector = ckbIndexer.collector({
    lock,
    // filter cells by output data len range, [inclusive, exclusive)
    // data length range: [0, 1), which means the data length is 0
    outputDataLenRange: ["0x0", "0x1"],
  });

  let _needCapacity = requiredCapacity;
  const collected: Cell[] = [];
  for await (const inputCell of collector.collect()) {
    collected.push(inputCell);
    _needCapacity -= BigInt(inputCell.cellOutput.capacity);
    if (_needCapacity <= 0) break;
  }

  return collected;
}

/**
 * add the first witness for the fromAddress script,
 * which has a WitnessArgs constructed with 65-byte zero filled values
 */
export function addWitness(
  txSkeleton: lumosHelpers.TransactionSkeletonType,
): lumosHelpers.TransactionSkeletonType {
  const firstLockInputIndex = 0;

  /* 65-byte zeros in hex */
  const SECP_SIGNATURE_PLACEHOLDER =
    "0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
  const newWitnessArgs: WitnessArgs = { lock: SECP_SIGNATURE_PLACEHOLDER };
  const witness = bytes.hexify(blockchain.WitnessArgs.pack(newWitnessArgs));

  return txSkeleton.update("witnesses", (witnesses) =>
    witnesses.set(firstLockInputIndex, witness),
  );
}

/**
 * Calculate transaction fee
 *
 * @param txSkeleton {@link lumosHelpers.TransactionSkeletonType}
 * @param feeRate how many shannons per KB charge
 * @returns fee, unit: shannons
 *
 * See https://github.com/nervosnetwork/ckb/wiki/Transaction-%C2%BB-Transaction-Fee
 */
export function calculateTxFee(
  txSkeleton: lumosHelpers.TransactionSkeletonType,
  feeRate: bigint,
): bigint {
  const tx: Transaction =
    lumosHelpers.createTransactionFromSkeleton(txSkeleton);
  const serializedTx = blockchain.Transaction.pack(tx);
  // 4 is serialized offset bytesize
  const txSize = BigInt(serializedTx.byteLength + 4);

  const ratio = 1000n;
  const base = txSize * feeRate;
  const fee = base / ratio;
  return fee * ratio < base ? fee + 1n : fee;
}

export function encodeStringToHex(str: string): HexString {
  return `0x${Buffer.from(str).toString("hex")}`;
}

/**
 * Get faucet from https://github.com/Flouse/nervos-functions#faucet
 */
export async function getFaucet() {
  // TODO: one line code to get faucet from https://faucet.nervos.org or https://github.com/Flouse/nervos-functions#faucet
  throw new Error(
    "TODO: get faucet from https://faucet.nervos.org or https://github.com/Flouse/nervos-functions#faucet",
  );
}
