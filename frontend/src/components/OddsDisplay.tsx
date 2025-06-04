import { useState, useEffect } from 'react';
import { Game } from '../types/api';
import { getOdds, getApiUsage } from '../services/oddsService';
import './OddsDisplay.css';

const SPORTS = [
    { key: 'basketball_nba', name: 'NBA' },
    { key: 'americanfootball_nfl', name: 'NFL' },
    { key: 'baseball_mlb', name: 'MLB' },
    { key: 'icehockey_nhl', name: 'NHL' }
];

export const OddsDisplay = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [selectedSport, setSelectedSport] = useState('basketball_nba');
    const [loading, setLoading] = useState(false);
    const [remainingCalls, setRemainingCalls] = useState<number | null>(null);

    const loadOdds = async () => {
        setLoading(true);
        try {
            const [oddsData, usageData] = await Promise.all([
                getOdds(selectedSport),
                getApiUsage()
            ]);
            setGames(oddsData);
            setRemainingCalls(usageData.remainingCalls);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOdds();
    }, [selectedSport]);

    const formatOdds = (price: number) => {
        return price >= 0 ? `+${price}` : price.toString();
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <div className="odds-container">
            <div className="header">
                <h1>Sports Odds</h1>
                {remainingCalls !== null && (
                    <div className="api-usage">
                        API Calls Remaining: {remainingCalls}
                    </div>
                )}
                <div className="sport-selector">
                    <select 
                        value={selectedSport}
                        onChange={(e) => setSelectedSport(e.target.value)}
                    >
                        {SPORTS.map(sport => (
                            <option key={sport.key} value={sport.key}>
                                {sport.name}
                            </option>
                        ))}
                    </select>
                    <button onClick={loadOdds} disabled={loading}>
                        {loading ? 'Loading...' : 'Refresh'}
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="loading">Loading odds...</div>
            ) : (
                <div className="games-grid">
                    {games.map(game => (
                        <div key={game.id} className="game-card">
                            <div className="game-header">
                                <h3>{game.sportTitle}</h3>
                                <div className="game-time">
                                    {formatDate(game.commenceTime)}
                                </div>
                            </div>
                            <div className="teams">
                                <div className="team">{game.homeTeam} (Home)</div>
                                <div className="team">{game.awayTeam} (Away)</div>
                            </div>
                            <div className="bookmakers">
                                {game.bookmakers.map(bookmaker => (
                                    <div key={bookmaker.key} className="bookmaker">
                                        <h4>{bookmaker.title}</h4>
                                        {bookmaker.markets.map(market => (
                                            <div key={market.key} className="market">
                                                <h5>{market.key.toUpperCase()}</h5>
                                                <div className="outcomes">
                                                    {market.outcomes.map(outcome => (
                                                        <div key={outcome.name} className="outcome">
                                                            <span>{outcome.name}</span>
                                                            <span className="odds">
                                                                {formatOdds(outcome.price)}
                                                                {outcome.point && ` (${outcome.point})`}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}; 