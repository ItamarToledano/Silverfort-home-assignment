import { GameState, LeaderboardEntry } from "./game.types";
export declare class GameService {
    private gameState;
    private leaderboard;
    constructor();
    private initializeGame;
    private generateValidBoard;
    private findValidCombination;
    private getAdjacentShapes;
    private getAdjacentColors;
    getGameState(): GameState;
    makeMove(row: number, col: number): {
        success: boolean;
        newState?: GameState;
        gameOver?: boolean;
    };
    private updateCooldowns;
    resetGame(): GameState;
    addToLeaderboard(nickname: string, score: number): void;
    getLeaderboard(): LeaderboardEntry[];
}
