import { Address, Script } from "@ckb-lumos/lumos";

export type Account = {
  lockScript: Script;
  address: Address;
  pubKey: string;
};
