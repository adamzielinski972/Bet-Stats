export interface Game {
    id: string;
    sportKey: string;
    sportTitle: string;
    commenceTime: string;
    homeTeam: string;
    awayTeam: string;
    bookmakers: Bookmaker[];
}

export interface Bookmaker {
    key: string;
    title: string;
    lastUpdate: string;
    markets: Market[];
}

export interface Market {
    key: string;
    lastUpdate: string;
    outcomes: Outcome[];
}

export interface Outcome {
    name: string;
    price: number;
    point?: number;
} 