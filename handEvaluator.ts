import { Card, HandResult } from './types';

const RANK_ORDER = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export function parseCard(card: string): Card {
    const suit = card[card.length - 1];
    const rank = card.slice(0, -1);
    return { rank, suit };
}

export function rankValue(rank: string): number {
    return RANK_ORDER.indexOf(rank);
}

export function cardToString(card: Card): string {
    return card.rank + card.suit;
}

function groupByRank(cards: Card[]): Map<string, Card[]> {
    const groups = new Map<string, Card[]>();
    for (const card of cards) {
        const group = groups.get(card.rank) || [];
        group.push(card);
        groups.set(card.rank, group);
    }
    return groups;
}

function findFlushCards(cards: Card[]): Card[] | null {
    const suitCounts = new Map<string, Card[]>();
    for (const card of cards) {
        const group = suitCounts.get(card.suit) || [];
        group.push(card);
        suitCounts.set(card.suit, group);
    }
    for (const [, group] of suitCounts) {
        if (group.length >= 5) {
            group.sort((a, b) => rankValue(b.rank) - rankValue(a.rank));
            return group
        }
    }
    return null;
}

function findStraight(cards: Card[]): Card[] | null {
    // Remove duplicate ranks, keep first card for each rank
    const uniqueByRank = new Map<string, Card>();
    for (const card of cards) {
        if (!uniqueByRank.has(card.rank)) {
            uniqueByRank.set(card.rank, card);
        }
    }
    const unique = Array.from(uniqueByRank.values());
    unique.sort((a, b) => rankValue(b.rank) - rankValue(a.rank));

    // Check for consecutive sequences of 5
    for (let i = 0; i <= unique.length - 5; i++) {
        const high = rankValue(unique[i].rank);
        const low = rankValue(unique[i + 4].rank);
        if (high - low === 4) {
            return unique.slice(i, i + 5);
        }
    }

    // Check for ace-low straight (A, 2, 3, 4, 5)
    const hasAce = unique.some(c => c.rank === 'A');
    if (hasAce) {
        const lowCards = ['5', '4', '3', '2'].map(r => unique.find(c => c.rank === r));
        if (lowCards.every(c => c !== undefined)) {
            const ace = unique.find(c => c.rank === 'A')!;
            return [...lowCards as Card[], ace];
        }
    }

    return null;
}

export function evaluate(cards: Card[]): HandResult {
    cards.sort((a, b) => rankValue(b.rank) - rankValue(a.rank));

    const groups = groupByRank(cards);
    const flushCards = findFlushCards(cards);
    const straightCards = findStraight(cards);

    // Get groups sorted by size (desc) then rank (desc)
    const sortedGroups = Array.from(groups.entries())
        .sort((a, b) => {
            if (b[1].length !== a[1].length) return b[1].length - a[1].length;
            return rankValue(b[0]) - rankValue(a[0]);
        });

    const groupSizes = sortedGroups.map(([, g]) => g.length);

    // Straight flush
    if (flushCards) {
        const flushStraight = findStraight(flushCards);
        if (flushStraight) {
            return {
                category: 'Straight flush',
                chosen5: flushStraight.map(cardToString),
            };
        }
    }

    // Four of a kind
    if (groupSizes[0] === 4) {
        const quads = sortedGroups[0][1];
        const kickers = cards.filter(c => c.rank !== quads[0].rank);
        return {
            category: 'Four of a kind',
            chosen5: [...quads, kickers[0]].map(cardToString),
        };
    }

    // Full house
    if (groupSizes[0] === 3 && groupSizes[1] >= 2) {
        const trips = sortedGroups[0][1];
        const pair = sortedGroups[1][1].slice(0, 2);
        return {
            category: 'Full house',
            chosen5: [...trips, ...pair].map(cardToString),
        };
    }

    // Flush
    if (flushCards) {
        return {
            category: 'Flush',
            chosen5: flushCards.slice(0, 5).map(cardToString),
        };
    }

    // Straight
    if (straightCards) {
        return {
            category: 'Straight',
            chosen5: straightCards.map(cardToString),
        };
    }

    // Three of a kind
    if (groupSizes[0] === 3) {
        const trips = sortedGroups[0][1];
        const kickers = cards.filter(c => c.rank !== trips[0].rank).slice(0, 2);
        return {
            category: 'Three of a kind',
            chosen5: [...trips, ...kickers].map(cardToString),
        };
    }

    // Two pair
    if (groupSizes[0] === 2 && groupSizes[1] === 2) {
        const highPair = sortedGroups[0][1];
        const lowPair = sortedGroups[1][1];
        const kickers = cards.filter(c => c.rank !== highPair[0].rank && c.rank !== lowPair[0].rank);
        return {
            category: 'Two pair',
            chosen5: [...highPair, ...lowPair, kickers[0]].map(cardToString),
        };
    }

    // One pair
    if (groupSizes[0] === 2) {
        const pair = sortedGroups[0][1];
        const kickers = cards.filter(c => c.rank !== pair[0].rank).slice(0, 3);
        return {
            category: 'One pair',
            chosen5: [...pair, ...kickers].map(cardToString),
        };
    }

    // High card
    return {
        category: 'High card',
        chosen5: cards.slice(0, 5).map(cardToString),
    };
}

export function evaluateHand(board: string[], hole: string[]): { category: string; chosen5: string[] } {
    const cards = [...board, ...hole].map(parseCard);
    return evaluate(cards);
}