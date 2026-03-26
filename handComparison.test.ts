import { describe, it, expect } from 'vitest';
import { evaluateHand } from './handEvaluator';
import { compareHands } from './handComparison';

describe('compareHands', () => {

  it('higher category wins (flush beats straight)', () => {
    const board: string[] = ['9h', '8h', '7h', '6h', '2c'];
    const flush = evaluateHand(board, ['Ah', '3d']);    // flush (Ah 9h 8h 7h 6h)
    const straight = evaluateHand(board, ['10c', '5s']); // straight (10 9 8 7 6)
    const result = compareHands([flush, straight]);
    expect(result.winners).toEqual([0]);
  });

  // Tie-break: High card
  it('high card: higher first card wins', () => {
    const board: string[] = ['2c', '4d', '6h', '8s', '10c'];
    const hand1 = evaluateHand(board, ['Ac', '3d']);
    const hand2 = evaluateHand(board, ['Kh', '3s']);
    const result = compareHands([hand1, hand2]);
    expect(result.winners).toEqual([0]);
  });

  // Tie-break: One pair
  it('one pair: higher pair wins', () => {
    const board: string[] = ['2c', '4d', '7h', '9s', 'Jc'];
    const hand1 = evaluateHand(board, ['Jd', '3d']); // pair of J
    const hand2 = evaluateHand(board, ['9h', '3s']); // pair of 9
    const result = compareHands([hand1, hand2]);
    expect(result.winners).toEqual([0]);
  });

  // Tie-break: Two pair
  it('two pair: higher top pair wins', () => {
    const board: string[] = ['2c', '2d', '7h', '9s', 'Jc'];
    const hand1 = evaluateHand(board, ['Jd', '3d']); // J+2
    const hand2 = evaluateHand(board, ['9h', '3s']); // 9+2
    const result = compareHands([hand1, hand2]);
    expect(result.winners).toEqual([0]);
  });

  // Tie-break: Three of a kind
  it('three of a kind: higher trips wins', () => {
    const board: string[] = ['2c', '4d', '6h', 'Ks', '3c'];
    const hand1 = evaluateHand(board, ['Kd', 'Kh']); // trip K
    const hand2 = evaluateHand(board, ['4s', '4h']); // trip 4
    const result = compareHands([hand1, hand2]);
    expect(result.winners).toEqual([0]);
  });

  // Tie-break: Straight
  it('straight: higher top card wins', () => {
    const board: string[] = ['5c', '6d', '7h', '8s', '3c'];
    const hand1 = evaluateHand(board, ['9d', '2d']); // 5-9 straight
    const hand2 = evaluateHand(board, ['4s', '2s']); // 4-8 straight
    const result = compareHands([hand1, hand2]);
    expect(result.winners).toEqual([0]);
  });

  // Tie-break: Flush
  it('flush: higher cards win', () => {
    const board: string[] = ['2h', '5h', '8h', '3c', '4d'];
    const hand1 = evaluateHand(board, ['Ah', 'Jh']); // A-high flush
    const hand2 = evaluateHand(board, ['Kh', '9h']); // K-high flush
    const result = compareHands([hand1, hand2]);
    expect(result.winners).toEqual([0]);
  });

  // Tie-break: Full house
  it('full house: higher trips wins', () => {
    const board: string[] = ['2c', '2d', '5h', '5s', '9c'];
    const hand1 = evaluateHand(board, ['5d', '9d']); // 5-5-5 + 9-9
    const hand2 = evaluateHand(board, ['2h', '9s']); // 2-2-2 + 9-9
    const result = compareHands([hand1, hand2]);
    expect(result.winners).toEqual([0]);
  });

  // Tie-break: Four of a kind
  it('four of a kind: kicker decides', () => {
    const board: string[] = ['7c', '7d', '7h', '7s', '2d'];
    const hand1 = evaluateHand(board, ['Ac', 'Kc']); // quads + A kicker
    const hand2 = evaluateHand(board, ['Qc', 'Jc']); // quads + Q kicker
    const result = compareHands([hand1, hand2]);
    expect(result.winners).toEqual([0]);
  });

  // Tie-break: Straight flush
  it('straight flush: higher top card wins', () => {
    const board: string[] = ['5h', '6h', '7h', '8h', '2c'];
    const hand1 = evaluateHand(board, ['9h', '3d']); // 5-9 straight flush
    const hand2 = evaluateHand(board, ['4h', '3s']); // 4-8 straight flush
    const result = compareHands([hand1, hand2]);
    expect(result.winners).toEqual([0]);
  });

  // Split/tie: board plays — both players use the board's straight (Example D)
  it('split pot when both players have identical best hand', () => {
    const board: string[] = ['5c', '6d', '7h', '8s', '9d'];
    const hand1 = evaluateHand(board, ['Ac', 'Ad']); // best hand is board's straight
    const hand2 = evaluateHand(board, ['Kc', 'Qd']); // best hand is board's straight
    expect(hand1.category).toBe('Straight');
    expect(hand2.category).toBe('Straight');
    const result = compareHands([hand1, hand2]);
    expect(result.winners).toEqual([0, 1]);
  });
});
