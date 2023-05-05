# Tutorial: Inscribe "Common Knowledge: Hello World!" to CKB Testnet

In this tutorial, you will learn how to write "`Common Knowledge: Hello World!`" into a cell on CKB testnet using [Lumos](https://github.com/ckb-js/lumos), a JavaScript/TypeScript library for Nervos CKB. You will also learn how to check the transaction on CKB explorer.

## Prerequisites
Before we begin, it is better that you have some basic knowledge of [Nervos CKB](https://ckbacademy.vercel.app/courses/basic-theory).
But if you don't, there's no need to worry, just follow this tutorial step by step.


## Only 3 Steps

Although some of the complexity is wrapped up, intuitively writing "Common Knowledge: Hello World!" into a cell on CKB testnet is really just `three steps`:

https://github.com/Flouse/ckb-tthw/blob/dfdc7218838e29ef01507f9e368853b1ab3c6933/js/index.ts#L86-L94

### Talk is cheap. Run the code.

```bash
git clone https://github.com/Flouse/ckb-tthw.git
cd ckb-tthw/js

# Install dependences such as @ckb-lumos, etc.
npm install

# Let's run it.
npm run start
# Result
# Transaction 0xad66eb1d076cfef73a98a8b76e6bc6c21b2c564011c30e0436de2f5f89579c84 sent.
# See https://pudge.explorer.nervos.org/transaction/0x57ff3a724b41808d1bae9a7d611956145542cd70cd2e1c6c43dab34ab28b9ea7
```
<!-- TODO: add result image -->
Would you like to change `onChainMemo` string and re-run it again?

## Show me the code
Let's dive into two functions that take up most of the code space. The [code and comments](./index.ts) are quite self-explained.

### Function `constructHelloWorldTx`
This function creates a new transaction that adds a cell with the proposed on-chain message.

1. Create a transaction skeleton that serves as a blueprint for the final transaction.
Define the output cell, which includes the capacity and lock script, and add it to the transaction skeleton, which is a mutable data structure used to construct a CKB transaction incrementally.
2. Modify the transaction skeleton to include the necessary capacity to cover the output cell by injecting enough input cells.
3. Pay the transaction fee by `payFeeByFeeRate` function, again, provided by Lumos.

### Function `signAndSendTx`
This function is self-explanatory:
1. Sign the transaction skeleton using a test private key.
2. Send the signed transaction to CKB testnet.

### Check the message on CKB explorer
![Check the message on CKB explorer](https://user-images.githubusercontent.com/1297478/236415697-c3a49e0d-eb8f-473e-a0c1-a587c20e5a42.png)
The cell data is the hex format of "Common Knowledge: Hello world!".


## Conclusion
In this tutorial, you learned how to write a message into a cell on CKB testnet using Lumos. You also learned how to check the transaction on CKB explorer. Lumos provides a set of helper functions that make it easy to interact with the CKB blockchain. With Lumos, you can easily create, sign, and send transactions to the CKB blockchain.

## References
- [CKB basic theoretical knowledge](https://ckbacademy.vercel.app/courses/basic-theory)
- [CKB basic practical operation](https://ckbacademy.vercel.app/courses/basic-operation)
- [Lumos Examples](https://github.com/ckb-js/lumos/blob/develop/examples)
  - Preview and interact with `simple transfer` code online through [codesandbox](https://codesandbox.io).
    https://codesandbox.io/s/github/ckb-js/lumos/tree/develop/examples/secp256k1-transfer?file=/lib.ts
  - etc.
