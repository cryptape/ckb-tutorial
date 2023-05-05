import { hd, config, helpers, HexString, BI, Indexer, Address } from '@ckb-lumos/lumos';
import { Account } from './type';

export const CKB_TESTNET_EXPLORER = "https://pudge.explorer.nervos.org";
export const CKB_TESTNET_RPC = "https://testnet.ckb.dev/rpc";
export const ckbIndexer = new Indexer(CKB_TESTNET_RPC);

// This tutorial uses CKB testnet.
// CKB Testnet Explorer: https://pudge.explorer.nervos.org
config.initializeConfig(config.predefined.AGGRON4);

// get the address of CKB testnet from the private key
export const getAddressByPrivateKey = (privateKey: HexString): Address => {
  const args = hd.key.privateKeyToBlake160(privateKey);
  const template = config.predefined.AGGRON4.SCRIPTS["SECP256K1_BLAKE160"]!;
  const lockScript = {
    codeHash: template.CODE_HASH,
    hashType: template.HASH_TYPE,
    args: args,
  };

  return helpers.encodeToAddress(lockScript);
}

// generate an Account from the private key
export const generateAccountFromPrivateKey = (privateKey: string): Account => {
  const pubKey = hd.key.privateToPublic(privateKey);
  const args = hd.key.publicKeyToBlake160(pubKey);
  const template = config.predefined.AGGRON4.SCRIPTS["SECP256K1_BLAKE160"]!;
  const lockScript = {
    codeHash: template.CODE_HASH,
    hashType: template.HASH_TYPE,
    args: args,
  };
  const address = helpers.encodeToAddress(lockScript);

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
    lock: helpers.parseAddress(address),
  });

  let capacities = BI.from(0);
  for await (const cell of collector.collect()) {
    capacities = capacities.add(cell.cellOutput.capacity);
  }

  return capacities;
}

/**
 * Get faucet from https://github.com/Flouse/nervos-functions#faucet
 */
export async function getFaucet() {
  // TODO: one line code to get faucet from https://faucet.nervos.org or https://github.com/Flouse/nervos-functions#faucet
  throw new Error("TODO: get faucet from https://faucet.nervos.org or https://github.com/Flouse/nervos-functions#faucet");
}
