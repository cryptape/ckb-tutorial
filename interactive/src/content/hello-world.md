## Inscribe "Hello Common Knowledge Base!" to CKB Testnet

In this tutorial, you will learn how to write "`Hello Common Knowledge Base!`" into a cell on CKB testnet using [Lumos](https://github.com/ckb-js/lumos), a JavaScript/TypeScript library for Nervos CKB. You will also learn how to check the transaction on CKB explorer.

## Prerequisites
Before we begin, it is better that you have some basic knowledge of
- [Nervos CKB](https://ckbacademy.vercel.app/courses/basic-theory).
- [Typescript](https://www.typescriptlang.org/)
  But if you don't, there's no need to worry, just follow this tutorial step by step.
- This tutorial supports running code in the browser, but your browser needs to support [Web Containers](https://webcontainers.io/)


## Installation

``` bash
# Install dependences such as @ckb-lumos, etc.
# Enter the command in the Terminal at the bottom right of the screen
npm install
```

## Only 3 Steps

Although some of the complexity is wrapped up, intuitively writing "Hello Common Knowledge Base!" into a cell on CKB testnet is really just `three steps`, If you're confused about the methods used, don't worry, we'll explain in detail what each method does later on.

### step 1
``` typescript
//index.ts
// Step 1: this is the message that will be written on chain
const onChainMemo: string = "Hello Common Knowledge Base!";
```

### step 2
``` typescript
//index.ts
// Step 2: construct the transaction
let txSkeleton = await constructHelloWorldTx(onChainMemo);
```

### step 3
``` typescript
//index.ts
// Step 3: sign and send the transaction
const txHash = await signAndSendTx(txSkeleton, testPrivKey);
console.log(`Transaction ${txHash} sent.\n`);

// Done, let's see the transaction in CKB Testnet Explorer
console.log(`See ${CKB_TESTNET_EXPLORER}/transaction/${txHash}`);
```

> You could find the full code [here](https://github.com/Flouse/ckb-tthw/blob/42bf1b5a3566e2d8adf6ef79aad8580de0d79281/js/index.ts#L125-L136), or view the current code through the code editor at the top right of the screen.


### Talk is cheap. Run the code.

``` bash
# Let's run it.
# Enter the command in the Terminal at the bottom right of the screen
npm run start
# Result
# Transaction 0xad66eb1d076cfef73a98a8b76e6bc6c21b2c564011c30e0436de2f5f89579c84 sent.
# See https://pudge.explorer.nervos.org/transaction/0x57ff3a724b41808d1bae9a7d611956145542cd70cd2e1c6c43dab34ab28b9ea7
```

Would you like to change `onChainMemo` string and re-run it again?

## Show me the code
Let's dive into two functions that take up most of the code space. The [code and comments](./index.ts) are quite self-explained.

### Function `constructHelloWorldTx`
This function creates a new transaction that adds a cell with the proposed on-chain message.

1. Create a transaction skeleton that serves as a blueprint for the final transaction.
2. Define the output cell, which includes the capacity and lock script, and add it to the transaction skeleton, which is a mutable data structure used to construct a CKB transaction incrementally.
3. Modify the transaction skeleton to include the necessary capacity to cover the output cell by injecting enough input cells.
4. Pay the transaction fee by `payFeeByFeeRate` function, again, provided by Lumos.

### Function `signAndSendTx`
This function is self-explanatory:
1. Sign the transaction skeleton using a test private key.
2. Send the signed transaction to CKB testnet.

### Check the message on CKB explorer
![Check the message on CKB explorer](https://user-images.githubusercontent.com/1297478/236855817-af2158b4-22f9-4321-b9c6-7b00b474bda9.png)
The cell data is the hexadecimal format of "Hello Common Knowledge Base!".

You might want to query https://www.ascii-code.com to check for the on-chain message.


## Conclusion
In this tutorial, you learned how to write a message into a cell on CKB testnet using Lumos. You also learned how to check the transaction on CKB explorer. Lumos provides a set of helper functions that make it easy to interact with the CKB blockchain. With Lumos, you can easily create, sign, and send transactions to the CKB blockchain.

## References
- [CKB basic theoretical knowledge](https://ckbacademy.vercel.app/courses/basic-theory)
- [CKB basic practical operation](https://ckbacademy.vercel.app/courses/basic-operation)
- [Lumos Examples](https://github.com/ckb-js/lumos/blob/develop/examples)
    - Preview and interact with `simple transfer` code online through [codesandbox](https://codesandbox.io).
      https://codesandbox.io/s/github/ckb-js/lumos/tree/develop/examples/secp256k1-transfer?file=/lib.ts
    - etc.