import { rankValue } from './handEvaluator';

const CATEGORY_RANK: string[] = [
    'High card',
    'One pair',
    'Two pair',
    'Three of a kind',
    'Straight',
    'Flush',
    'Full house',
    'Four of a kind',
    'Straight flush',
];

function categoryValue(category: string): number {
    return CATEGORY_RANK.indexOf(category);
}

function extractRank(card: string): string {
    return card.slice(0, -1);
}

function compareChosen5(a: string[], b: string[]): number {
    for (let i = 0; i < 5; i++) {
        const diff = rankValue(extractRank(a[i])) - rankValue(extractRank(b[i]));
        if (diff !== 0) return diff;
    }
    return 0;
}

export function compareHands(hands: HandResult[]): CompareResult {
    let bestIndices = [0];

    for (let i = 1; i < hands.length; i++) {
        const catDiff = categoryValue(hands[i].category) - categoryValue(hands[bestIndices[0]].category);

        if (catDiff > 0) {
            bestIndices = [i];
        } else if (catDiff === 0) {
            const cardDiff = compareChosen5(hands[i].chosen5, hands[bestIndices[0]].chosen5);
            if (cardDiff > 0) {
                bestIndices = [i];
            } else if (cardDiff === 0) {
                bestIndices.push(i);
            }
        }
    }

    return { winners: bestIndices };
}
