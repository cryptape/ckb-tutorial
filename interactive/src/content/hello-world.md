# Tutorial: Inscribe Messages on CKB in 3 Easy Steps

With this tutorial, you'll be able to write "`Hello Common Knowledge Base!`" (or any message) into a [cell](https://docs.nervos.org/docs/reference/cell/) on CKB testnet using [Lumos](https://github.com/ckb-js/lumos), a versatile JavaScript/TypeScript library developed specifically for Nervos CKB. Additionally, you'll learn how to verify your transaction on the [CKB explorer](https://explorer.nervos.org/).

## Prerequisites
Before we start, make sure your browser support [in-browser coding](https://webcontainers.io/) and it's helpful if you have a basic understanding of:

- Nervos CKB
- TypeScript

However, if you're new to these concepts, don't fret! This tutorial is designed to guide you through each step. 

## 1. Installation

To get started, you'll need to install dependencies, including @ckb-lumos. Enter the following command in your terminal:

```bash
npm install
```
## 2. Execute
We've simplified some complexities created all the functions for you. The program you will execute writes "Hello Common Knowledge Base!" (or any message) into a cell on the CKB testnet in three steps. Here's a shallow dive of the methods working *magic*:

Step 1 (这些step有办法连着code editor 的位置or行数吗）

Define the message that will be written on-chain in a index.ts file:

```typescript
const onChainMemo: string = "Hello Common Knowledge Base!";
```
Step 2

Construct the transaction:

```typescript
let txSkeleton = await constructHelloWorldTx(onChainMemo);
```
Step 3

Sign and send the transaction:

```typescript
const txHash = await signAndSendTx(txSkeleton, testPrivKey);
console.log(`Transaction ${txHash} sent.\n`);
console.log(`Verify it on CKB Testnet Explorer: ${CKB_TESTNET_EXPLORER}/transaction/${txHash}`);
```
The full code is available [here](https://github.com/Flouse/ckb-tthw/blob/42bf1b5a3566e2d8adf6ef79aad8580de0d79281/js/index.ts#L125-L136). You can also access it through the code editor in the top right of your screen.

### Talk is cheap. Run the code.
Now to execute the program. Enter the following command in your terminal:

```bash
npm run start
```
Output should provide a URL for where your transaction can be verifed on the explorer.
## 3. Verify
For example:
```
# Result
# Transaction 0x39d6d7b6129b7e418c9ea6a353a5d85eb69f9ee5b4c7c43223fe0fad2b0e6200 sent.
# See https://pudge.explorer.nervos.org/transaction/0x39d6d7b6129b7e418c9ea6a353a5d85eb69f9ee5b4c7c43223fe0fad2b0e6200
```

Verify your message on the CKB Explorer by 
1. Going to your output URL
2. Click on `Cell Info` of `Output#0`, go to `Data`
3. Copy the number string after `0x`
4. Paste in [CypherChef's magic tool](https://gchq.github.io/CyberChef/#recipe=From_Hex('None')&input=NjE2ZTZlNjk2NTZl) to decode.

Voilà! Congrats, you did it!

<!-- TODO: add result image -->
Try changing the `onChainMemo` string to any message and run it again!!

## Want a deep dive into the code?

Let's take a closer look at two functions that constitute the majority of our code: `constructHelloWorldTx` and `signAndSendTx`.

### Function `constructHelloWorldTx`
Creates a new transaction that includes a cell with the specified on-chain message. Here's the sequence of actions it performs:

1. Creates a transaction skeleton, which acts as a blueprint for the final transaction.
2. Defines the output cell, including its capacity and lock script, and adds it to the transaction skeleton.
3. Modifies the transaction skeleton to cover the output cell's necessary capacity by injecting sufficient input cells.
4. Pays the transaction fee with the `payFeeByFeeRate` function by Lumos.
Function signAndSendTx

### Function `signAndSendTx`
Performs two main actions:
1. Signs the transaction skeleton using a test private key.
2. Sends the signed transaction to the CKB testnet.

## Wrap-up
Congratulations! You've learned how to inscribe a message into a cell on the CKB testnet using Lumos and how to verify your transaction on the CKB explorer. Lumos offers a suite of helper functions that simplify interactions with the CKB blockchain, making it easy to create, sign, and send transactions. What message will you send next?

## References
- [CKB basic theoretical knowledge](https://ckbacademy.vercel.app/courses/basic-theory)
- [CKB basic practical operation](https://ckbacademy.vercel.app/courses/basic-operation)
- [Lumos Examples](https://github.com/ckb-js/lumos/blob/develop/examples)
  - Preview and interact with `simple transfer` code online through [codesandbox](https://codesandbox.io).
    https://codesandbox.io/s/github/ckb-js/lumos/tree/develop/examples/secp256k1-transfer?file=/lib.ts
  - etc.
