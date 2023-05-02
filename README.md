# Tutorial Target
The target of this tutorial is very simple: use [Lumos](https://github.com/ckb-js/lumos) to write "Common Knowledge: Hello world!" into a cell on CKB testnet and check it on CKB explorer.

TODO: In this tutorial, a browser-based runtime called [WebContainers](https://webcontainers.io/) is leveraged to create a minimal development environment only in the browser to acheive interactive tutorial experiences. Let's use the latest web capabilities to deliver a nice browser-based development experience for a new generation of interactive courses.

## Prerequisites
1. Node.js
   ....

2. Lomos
Lumos provides a high-level API for interacting with CKB, which makes it easier to develop dApps.
You can install Lumos by running the following command:

```bash
npm install @ckb-lumos/base @ckb-lumos/indexer @ckb-lumos/common @ckb-lumos/hd-indexer @ckb-lumos/transaction @ckb-lumos/wallet
```

## Pseudo Code
After installing Lumos, you can use it to send a transaction to CKB testnet, write a simple `Common Knowledge`: "Hello World" into a [cell](https://docs.nervos.org/docs/reference/cell/) on CKB.
Here's an example of how you can do that:

```js
const { RPC } = require("@ckb-lumos/rpc");
const { Reader } = require("ckb-js-toolkit");
const { CellCollector } = require("@ckb-lumos/indexer");
const { generateAddress, key } = require("@ckb-lumos/hd-wallet");
const { sealTransaction } = require("@ckb-lumos/helpers");
const { Script } = require("@ckb-lumos/base");

// create a new RPC instance pointing to a CKB node
const rpc = new RPC("https://testnet.ckb.dev/rpc");

// create a new key
const privateKey = key.generatePrivateKey();
const publicKey = key.publicKeyFromPrivate(privateKey);

// generate an address from the public key
const address = generateAddress(publicKey);

// define the lock script for the cell
const lockScript = new Script({
  code_hash: "0x0000000000000000000000000000000000000000000000000000000000000000",
  hash_type: "type",
  args: address,
});

// define the type script for the cell
const typeScript = new Script({
  code_hash: "0x0000000000000000000000000000000000000000000000000000000000000000",
  hash_type: "type",
  args: new Reader("0x"),
});

// create a new transaction that adds a cell with the message "Common Knowledge: Hello world!"
const tx = {
  version: "0x0",
  cell_deps: [],
  header_deps: [],
  inputs: [],
  outputs: [
    {
      capacity: "0x" + BigInt(10000000000).toString(16),
      lock: lockScript,
      type: typeScript,
    },
  ],
  witnesses: [],
  outputs_data: [new Reader("0x" + Buffer.from("Common Knowledge: Hello world!").toString("hex")).serializeJson()],
};

// sign the transaction with the private key
const signedTx = sealTransaction(tx, [privateKey]);

// send the transaction to the CKB node
const txHash = await rpc.sendTransaction(signedTx);

console.log(`Transaction sent with hash: \${txHash}`);
```

## TODO
- [ ] interactive tutorial experiences
