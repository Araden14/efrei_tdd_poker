import { describe, it, expect } from "vitest";
import { evaluateHand } from "./handEvaluator";

describe("evaluateHand", () => {
  it("should detect a high card hand", () => {
    const board = ["Ac", "8d", "5h", "3s", "2d"];
    const hole = ["Kh", "10s"];

    const result = evaluateHand(board, hole);

    expect(result.category).toBe("High card");
    expect(result.chosen5).toEqual(["Ac", "Kh", "10s", "8d", "5h"]);
  });

  it("should detect a one pair hand", () => {
    const board = ["Ac", "8d", "5h", "3s", "2d"];
    const hole = ["Ah", "10s"];

    const result = evaluateHand(board, hole);

    expect(result.category).toBe("One pair");
    expect(result.chosen5).toEqual(["Ac", "Ah", "10s", "8d", "5h"]);
  });

  it("should detect a two pair hand", () => {
    const board = ["Ac", "8d", "5h", "3s", "2d"];
    const hole = ["Ah", "8s"];

    const result = evaluateHand(board, hole);

    expect(result.category).toBe("Two pair");
    expect(result.chosen5).toEqual(["Ac", "Ah", "8d", "8s", "5h"]);
  });

  it("should detect a three of a kind hand", () => {
    const board = ["Ac", "Ad", "5h", "3s", "2d"];
    const hole = ["Ah", "10s"];

    const result = evaluateHand(board, hole);

    expect(result.category).toBe("Three of a kind");
    expect(result.chosen5).toEqual(["Ac", "Ad", "Ah", "10s", "5h"]);
  });
  it("should detect straight (ace-high)", () => {
    const board = ["10c", "Jd", "Qh", "Ks", "2d"];
    const hole = ["Ac", "3d"];

    const result = evaluateHand(board, hole);

    expect(result.category).toBe("Straight");
    expect(result.chosen5).toEqual(["Ac", "Ks", "Qh", "Jd", "10c"]);
  });
});

it("should detect a straight hand (ace-low)", () => {
  const board = ["Ac", "2d", "3h", "4s", "9d"];
  const hole = ["5c", "Kd"];

  const result = evaluateHand(board, hole);

  expect(result.category).toBe("Straight");
  expect(result.chosen5).toEqual(["5c", "4s", "3h", "2d", "Ac"]);
});

it("should detect a flush hand", () => {
  const board = ["Ah", "Jh", "9h", "4h", "2c"];
  const hole = ["6h", "Kd"];

  const result = evaluateHand(board, hole);

  expect(result.category).toBe("Flush");
  expect(result.chosen5).toEqual(["Ah", "Jh", "9h", "6h", "4h"]);
});

it("should detect a full house hand", () => {
  const board = ["Ac", "Ad", "5h", "5s", "2d"];
  const hole = ["Ah", "10s"];

  const result = evaluateHand(board, hole);

  expect(result.category).toBe("Full house");
  expect(result.chosen5).toEqual(["Ac", "Ad", "Ah", "5h", "5s"]);
});

it("should detect a four of a kind hand", () => {
  const board = ["7c", "7d", "7h", "7s", "2d"];
  const hole = ["Ac", "Kc"];

  const result = evaluateHand(board, hole);

  expect(result.category).toBe("Four of a kind");
  expect(result.chosen5).toEqual(["7c", "7d", "7h", "7s", "Ac"]);
});

it("should detect a straight flush hand", () => {
  const board = ["5h", "6h", "7h", "8h", "2c"];
  const hole = ["9h", "Kd"];

  const result = evaluateHand(board, hole);

  expect(result.category).toBe("Straight flush");
  expect(result.chosen5).toEqual(["9h", "8h", "7h", "6h", "5h"]);
});

it("should pick best 5 from 6 suited cards (best-of-7 flush)", () => {
  const board = ["Ah", "Jh", "9h", "4h", "3h"];
  const hole = ["6h", "Kd"];

  const result = evaluateHand(board, hole);

  expect(result.category).toBe("Flush");
  expect(result.chosen5).toEqual(["Ah", "Jh", "9h", "6h", "4h"]);
});
