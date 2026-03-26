import { evaluateHand } from './handEvaluator';
import { compareHands } from './handComparison';

export function main(board: string[], players: string[][]) {
    const hands = players.map(hole => evaluateHand(board, hole));
    const result = compareHands(hands);

    return {
        hands,
        winners: result.winners,
    };
}
