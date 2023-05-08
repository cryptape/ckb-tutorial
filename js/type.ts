import { Address, Script } from "@ckb-lumos/lumos";

export type Account = {
  lockScript: Script;
  address: Address;
  pubKey: string;
};

/**
 * The unit of capacity in CKB is Shannon, 1CKB = 10^8 Shannon
 * See https://docs.nervos.org/docs/basics/glossary#shannon
 */
export enum CapacityUnit {
  Shannon = 1,
  Byte = 100000000,
}
