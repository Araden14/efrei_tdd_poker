interface Card {
    suit: string;
    rank: string;
}

interface HandResult {
    category: string;
    chosen5: string[];
}

interface CompareResult {
    winners: number[];
}