# Time to `Hello World` on CKB

The target of this tutorial is very simple: use CKB SDKs in various languages to write "Common Knowledge: Hello world!" into a cell on CKB testnet and check it on CKB explorer.

## Sample Code
After installing Lumos, you can use it to send a transaction to CKB testnet, write a simple `Common Knowledge`: "Hello World" into a [cell](https://docs.nervos.org/docs/reference/cell/) on CKB.
Here's an example of how you can do that:

https://github.com/Flouse/ckb-tthw/blob/dfdc7218838e29ef01507f9e368853b1ab3c6933/js/index.ts#L86-L94

## Tutorials in different languages
- [JavaScript/TypeScript](./js/)
- [ ] Golang
- [ ] Rust
- [ ] Java
- etc.

## TODO
- [ ] implement interactive tutorial experiences
  In this tutorial, a browser-based runtime called [WebContainers](https://webcontainers.io/) is leveraged to create a minimal development environment only in the browser to acheive interactive tutorial experiences. Let's use the latest web capabilities to deliver a nice browser-based development experience for a new generation of interactive courses.

    similar to
    
    <img width="699" alt="image" src="https://user-images.githubusercontent.com/1297478/235818547-88aaf6a2-f50b-49a6-824b-b4f897bc1734.png">
    
    or https://learn.svelte.dev/tutorial/auto-subscriptions

## Reference
- [Lumos Examples](https://github.com/ckb-js/lumos/blob/develop/examples)
  - Preview and interact with `simple transfer` code online through [codesandbox](https://codesandbox.io).
    https://codesandbox.io/s/github/ckb-js/lumos/tree/develop/examples/secp256k1-transfer?file=/lib.ts
  - etc.
