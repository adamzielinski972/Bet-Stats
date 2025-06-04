import { Game } from '../types/api';

const API_BASE_URL = 'http://localhost:3621/api';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface CachedData {
    timestamp: number;
    data: Game[];
}

const getCachedData = (sport: string): Game[] | null => {
    const cached = localStorage.getItem(`odds_${sport}`);
    if (!cached) return null;

    try {
        const parsedCache: CachedData = JSON.parse(cached);
        const now = Date.now();
        
        // Check if cache is still valid (less than 24 hours old)
        if (now - parsedCache.timestamp < CACHE_DURATION) {
            console.log('Using cached odds data');
            return parsedCache.data;
        } else {
            console.log('Cache expired, fetching fresh data');
            localStorage.removeItem(`odds_${sport}`);
            return null;
        }
    } catch (error) {
        console.error('Error parsing cached data:', error);
        localStorage.removeItem(`odds_${sport}`);
        return null;
    }
};

const setCachedData = (sport: string, data: Game[]) => {
    try {
        const cacheData: CachedData = {
            timestamp: Date.now(),
            data
        };
        localStorage.setItem(`odds_${sport}`, JSON.stringify(cacheData));
    } catch (error) {
        console.error('Error caching data:', error);
    }
};

export const getOdds = async (sport: string): Promise<Game[]> => {
    try {
        console.log(`Fetching odds for sport: ${sport}`);
        const response = await fetch(`${API_BASE_URL}/odds/${sport}`);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch odds: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Raw API Response:', {
            dataType: typeof data,
            isArray: Array.isArray(data),
            length: Array.isArray(data) ? data.length : 0,
            sampleData: Array.isArray(data) && data.length > 0 ? data[0] : null
        });

        if (!Array.isArray(data)) {
            console.error('Expected array response but got:', typeof data);
            return [];
        }

        if (data.length === 0) {
            console.log('No games returned from API');
            return [];
        }

        // Cache the data before returning
        setCachedData(sport, data);
        return data;
    } catch (error) {
        console.error('Error fetching odds:', error);
        throw error;
    }
};

export const getLastUpdate = async (sport: string): Promise<Date | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/odds/${sport}/lastUpdate`);
        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        return new Date(data.lastUpdated);
    } catch (error) {
        console.error('Error fetching last update time:', error);
        return null;
    }
};

export const getApiUsage = async (): Promise<{ remainingCalls: number }> => {
    try {
        const response = await fetch(`${API_BASE_URL}/odds/usage`);
        if (!response.ok) {
            throw new Error('Failed to fetch API usage');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching API usage:', error);
        return { remainingCalls: 0 };
    }
}; 