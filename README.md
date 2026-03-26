# Poker Hand Evaluator – TDD Project

## Project description
This project evaluates Texas Hold'em poker hands.
It selects the best 5-card hand from 7 cards and compares players.

## How to run
npm install
npm test

## Card representation
Each card is represented as:
{ rank: number, suit: 'H' | 'D' | 'C' | 'S' }

Ranks:
2–10 = number
11 = Jack
12 = Queen
13 = King
14 = Ace

## Hand categories
STRAIGHT_FLUSH
FOUR_OF_A_KIND
FULL_HOUSE
FLUSH
STRAIGHT
THREE_OF_A_KIND
TWO_PAIR
ONE_PAIR
HIGH_CARD

## Tie-break rules
Hands are compared by category first, then by tie-break array.

## Special cases
- Ace can be low in A-2-3-4-5 straight.
- Best 5 cards are selected from 7 cards.
- Board can play.
- Split pot is supported.

## TDD approach
Tests were written before implementation for each hand category,
then refactoring was performed with green tests.