# Texas Hold'em Poker Hand Evaluator

A Texas Hold'em hand evaluator and comparer built with TDD using TypeScript and Vitest.

## How it works

Given 5 community cards (the board) and 2 hole cards per player, the program:

1. Determines each player's best 5-card poker hand from their 7 available cards.
2. Compares all players and returns the winner(s), supporting ties/split pots.
3. Returns the chosen best 5 cards and the recognized hand category for each player.

## Hand categories (highest to lowest)

1. Straight flush (includes royal flush)
2. Four of a kind
3. Full house
4. Flush
5. Straight
6. Three of a kind
7. Two pair
8. One pair
9. High card

## Chosen5 ordering convention

The 5 cards returned are ordered by importance for the category, matching tie-break logic:

| Category        | Ordering                                         |
|-----------------|--------------------------------------------------|
| Straight flush  | Highest to lowest in straight order (wheel: 5,4,3,2,A) |
| Four of a kind  | Four quad cards first, then kicker               |
| Full house      | Three-of-a-kind cards first, then pair           |
| Flush           | Descending rank                                  |
| Straight        | Highest to lowest in straight order (wheel: 5,4,3,2,A) |
| Three of a kind | Trip cards first, then 2 kickers descending      |
| Two pair        | Higher pair, lower pair, then kicker             |
| One pair        | Pair cards first, then 3 kickers descending      |
| High card       | Descending rank                                  |

## Input validity assumptions

This implementation assumes valid input with no duplicate cards. No validation is performed on the input. The caller is responsible for ensuring:

- The board contains exactly 5 cards.
- Each player has exactly 2 hole cards.
- No card appears more than once across the board and all players' hole cards.

## Running
### Using NPM : 
```bash
npm install
npm run test
```

You can then use the main function in poker.ts file