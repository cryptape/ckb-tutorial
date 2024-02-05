import { describe, expect, test } from "@jest/globals";
import { capacityOf, collectInputCells } from "../helper";
import { Script } from "@ckb-lumos/lumos";

const lockScript: Script = {
  codeHash:
    "0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8",
  hashType: "type",
  args: "0x6cd8ae51f91bacd7910126f880138b30ac5d3015",
};

describe("Test helper functions", () => {
  test("capacityOf", async () => {
    const shannonBalance = await capacityOf(lockScript);
    expect(shannonBalance.toBigInt()).toBeGreaterThan(20000000000n);
  });

  test("collectInputCells", async () => {
    const cells = await collectInputCells(lockScript, 100000000n * 200n);
    expect(cells.length).toBeGreaterThan(0);
  });
});
