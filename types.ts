export interface Card {
    suit: string;
    rank: string;
}

export interface HandResult {
    category: string;
    chosen5: string[];
}

export interface CompareResult {
    winners: number[];
}