import { describe, expect, it } from "vitest";
import { calculateMinMoves } from "./calculateMinMoves";

describe("calculateMinMoves", () => {
  it("1枚のディスクの場合、最小移動回数は 1", () => {
    expect(calculateMinMoves(1)).toBe(1);
  });

  it("2枚のディスクの場合、最小移動回数は 3 (2^2 - 1)", () => {
    expect(calculateMinMoves(2)).toBe(3);
  });

  it("3枚のディスクの場合、最小移動回数は 7 (2^3 - 1)", () => {
    expect(calculateMinMoves(3)).toBe(7);
  });

  it("4枚のディスクの場合、最小移動回数は 15 (2^4 - 1)", () => {
    expect(calculateMinMoves(4)).toBe(15);
  });

  it("5枚のディスクの場合、最小移動回数は 31 (2^5 - 1)", () => {
    expect(calculateMinMoves(5)).toBe(31);
  });

  it("6枚のディスクの場合、最小移動回数は 63 (2^6 - 1)", () => {
    expect(calculateMinMoves(6)).toBe(63);
  });

  it("7枚のディスクの場合、最小移動回数は 127 (2^7 - 1)", () => {
    expect(calculateMinMoves(7)).toBe(127);
  });

  it("8枚のディスクの場合、最小移動回数は 255 (2^8 - 1)", () => {
    expect(calculateMinMoves(8)).toBe(255);
  });

  it("0 以下の数値の場合、0 を返す", () => {
    expect(calculateMinMoves(0)).toBe(0);
    expect(calculateMinMoves(-1)).toBe(0);
  });
});
