import { Game } from '../types/api';

const API_BASE_URL = 'http://localhost:3621/api';

export const getOdds = async (sport: string): Promise<Game[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/odds/${sport}`);
        if (!response.ok) {
            throw new Error('Failed to fetch odds');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching odds:', error);
        return [];
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