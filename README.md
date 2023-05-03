# Tutorial Target
The target of this tutorial is very simple: use [Lumos](https://github.com/ckb-js/lumos) to write "Common Knowledge: Hello world!" into a cell on CKB testnet and check it on CKB explorer.

TODO: In this tutorial, a browser-based runtime called [WebContainers](https://webcontainers.io/) is leveraged to create a minimal development environment only in the browser to acheive interactive tutorial experiences. Let's use the latest web capabilities to deliver a nice browser-based development experience for a new generation of interactive courses.

## Prerequisites
1. Node.js

2. Lumos
Lumos provides a high-level API for interacting with CKB, which makes it easier to develop dApps.
You can install Lumos by running the following command:

```bash
npm @ckb-lumos/lumos
```

## Pseudo Code
After installing Lumos, you can use it to send a transaction to CKB testnet, write a simple `Common Knowledge`: "Hello World" into a [cell](https://docs.nervos.org/docs/reference/cell/) on CKB.
Here's an example of how you can do that:

```js
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
  const targetCellCapacity = BigInt(32 + 20 + 1 + onChainMemo.length) * 100000000n;

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
```

## TODO
- [ ] implement interactive tutorial experiences

    similar to
    
    <img width="699" alt="image" src="https://user-images.githubusercontent.com/1297478/235818547-88aaf6a2-f50b-49a6-824b-b4f897bc1734.png">
    
    or https://learn.svelte.dev/tutorial/auto-subscriptions

## Reference
- [Lumos Examples](https://github.com/ckb-js/lumos/blob/develop/examples)
  - Preview and interact with `simple transfer` code online through [codesandbox](https://codesandbox.io).
    https://codesandbox.io/s/github/ckb-js/lumos/tree/develop/examples/secp256k1-transfer?file=/lib.ts
  - etc.

- [Lumos docs site](https://cryptape.github.io/lumos-doc/)
  - [Hello Lumos](https://cryptape.github.io/lumos-doc/docs/preparation/hellolumos)
  - DApps on CKB Workshop
    - https://cryptape.github.io/lumos-doc/docs/guides/integratenft
    - etc.


