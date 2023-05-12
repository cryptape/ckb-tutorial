# Mission: Inscribing "Hello Common Knowledge Base!" on CKB

Welcome, brave coder! Your mission, should you choose to accept it, involves inscribing the message `"Hello Common Knowledge Base!"` into a [cell](https://docs.nervos.org/docs/reference/cell/) on the CKB testnet using the mighty [Lumos](https://github.com/ckb-js/lumos), a powerful JavaScript/TypeScript library crafted specifically for Nervos CKB. Once you've accomplished your mission, you'll uncover and verify the message on the [CKB explorer](https://explorer.nervos.org/).

## Pre-mission Training

Before embarking on your mission, it's beneficial to familiarize yourself with:

- [Nervos CKB](https://ckbacademy.vercel.app/courses/basic-theory)
- [TypeScript](https://www.typescriptlang.org/)

However, if you're a rookie, fear not! This mission is designed to equip you with the necessary skills, step by step. Note that your browser should support [Web Containers](https://webcontainers.io/) for an optimal experience.


## Preparation

First, gear up! Install your mission-critical dependencies, including [ckb-lumos](https://github.com/ckb-js/lumos), with this command in your terminal:

```bash
npm install
```
## The Action

We've prepared a guide to help you navigate the complex magic involved. The script you'll use inscribes messages into a cell on the CKB testnet in three key stages. Here's a quick overview:

**Stage 1: Preparing the Message**

In your sacred index.ts scroll, craft the message that will be inscribed on-chain:

```typescript
const onChainMemo: string = "Hello Common Knowledge Base!";
```
**Stage 2: Weaving the Spell**
Construct the transaction:

```typescript
let txSkeleton = await constructHelloWorldTx(onChainMemo);
```
**Stage 3: Casting the Spell**

Sign the transaction and unleash it onto the network:

```typescript
const txHash = await signAndSendTx(txSkeleton, testPrivKey);
console.log(`Transaction ${txHash} sent.\n`);
console.log(`Verify it on CKB Testnet Explorer: ${CKB_TESTNET_EXPLORER}/transaction/${txHash}`);
```
The full spellbook can be found [here](https://github.com/Flouse/ckb-tthw/blob/42bf1b5a3566e2d8adf6ef79aad8580de0d79281/js/index.ts#L125-L136). You can also access it through the magical portal (code editor) in the top right of your screen.

### Time to put your magic to the test. 
To execute the program, enter the following command in your terminal:

```bash
npm run start
```
Your output should provide a URL for where your spell's effects (transaction) can be verifed on the explorer.

## Verification
Example output:
```
# Result
# Transaction 0x39d6d7b6129b7e418c9ea6a353a5d85eb69f9ee5b4c7c43223fe0fad2b0e6200 sent.
# See https://pudge.explorer.nervos.org/transaction/0x39d6d7b6129b7e418c9ea6a353a5d85eb69f9ee5b4c7c43223fe0fad2b0e6200
```

Uncover your message on the CKB Explorer by 
1. Going to your output URL
2. Click on `Cell Info` of `Output#0`, then go to the `Data` tab
3. Copy the number string after `0x`
4. Paste it into [CypherChef's magic tool](https://gchq.github.io/CyberChef/#recipe=From_Hex('None')&input=NjE2ZTZlNjk2NTZl) to decode.

Congrats! You've done it!! 
What message will you send next?
Try changing the `onChainMemo` string to any message and run the mission again!!

## Mission Debriefing

After successfully completing the mission, it's time for a debrief. We'll take a closer look at the key elements of your mission tools: `constructHelloWorldTx` and `signAndSendTx`.

`constructHelloWorldTx` creates a new transaction that includes a cell carrying the mission message. It follows these steps:

1. Sets up a transaction structure, the blueprint of the final transaction.
2. Defines the output cell and includes it in the transaction structure.
3. Adjusts the transaction structure to cover the output cell's capacity requirements.
4. Pays the transaction fee using Lumos' `payFeeByFeeRate` function.


`signAndSendTx` has two main functions:

1. Signs the transaction skeleton with a test private key.
2. Sends the signed transaction to the CKB testnet.

## Mission Accomplished!

Well done! You've successfully completed your mission, leaving your mark on the CKB testnet using Lumos. With the Lumos toolkit, you've been able to create, sign, and send a transaction to the CKB blockchain with ease.

Ready for your next mission?

Keep coding, keep exploring, and keep making a difference. See you on the blockchain!


## References
- [CKB basic theoretical knowledge](https://ckbacademy.vercel.app/courses/basic-theory)
- [CKB basic practical operation](https://ckbacademy.vercel.app/courses/basic-operation)
- [Lumos Examples](https://github.com/ckb-js/lumos/blob/develop/examples)
  - Preview and interact with `simple transfer` code online through [codesandbox](https://codesandbox.io).
    https://codesandbox.io/s/github/ckb-js/lumos/tree/develop/examples/secp256k1-transfer?file=/lib.ts
  - etc.
