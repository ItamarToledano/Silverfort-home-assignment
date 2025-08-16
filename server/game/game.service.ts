import { Injectable } from "@nestjs/common";
import { Shape, Color, Cell, GameState, LeaderboardEntry } from "./game.types";

@Injectable()
export class GameService {
  private gameState: GameState;
  private leaderboard: LeaderboardEntry[] = [];

  constructor() {
    this.initializeGame();
  }

  private initializeGame(): void {
    this.gameState = {
      board: this.generateValidBoard(),
      score: 0,
      gameOver: false,
    };
  }

  private generateValidBoard(): Cell[][] {
    const board: Cell[][] = [];

    for (let row = 0; row < 3; row++) {
      board[row] = [];
      for (let col = 0; col < 6; col++) {
        const validCombination = this.findValidCombination(board, row, col);
        board[row][col] = {
          id: `${row}-${col}`,
          row,
          col,
          shape: validCombination.shape,
          color: validCombination.color,
          cooldown: 0,
          isClickable: true,
        };
      }
    }

    return board;
  }

  private findValidCombination(
    board: Cell[][],
    row: number,
    col: number
  ): { shape: Shape; color: Color } {
    const adjacentShapes = this.getAdjacentShapes(board, row, col);
    const adjacentColors = this.getAdjacentColors(board, row, col);

    const availableShapes = Object.values(Shape).filter(
      (shape) => !adjacentShapes.has(shape)
    );
    const availableColors = Object.values(Color).filter(
      (color) => !adjacentColors.has(color)
    );

    if (availableShapes.length === 0 || availableColors.length === 0) {
      return {
        shape:
          availableShapes.length > 0
            ? availableShapes[0]
            : Object.values(Shape)[0],
        color:
          availableColors.length > 0
            ? availableColors[0]
            : Object.values(Color)[0],
      };
    }

    return {
      shape:
        availableShapes[Math.floor(Math.random() * availableShapes.length)],
      color:
        availableColors[Math.floor(Math.random() * availableColors.length)],
    };
  }

  private getAdjacentShapes(
    board: Cell[][],
    row: number,
    col: number
  ): Set<Shape> {
    const shapes = new Set<Shape>();

    // Check adjacent cells (not diagonal) - only if they exist
    if (row > 0 && board[row - 1] && board[row - 1][col]) {
      shapes.add(board[row - 1][col].shape);
    }
    if (row < 2 && board[row + 1] && board[row + 1][col]) {
      shapes.add(board[row + 1][col].shape);
    }
    if (col > 0 && board[row] && board[row][col - 1]) {
      shapes.add(board[row][col - 1].shape);
    }
    if (col < 5 && board[row] && board[row][col + 1]) {
      shapes.add(board[row][col + 1].shape);
    }

    return shapes;
  }

  private getAdjacentColors(
    board: Cell[][],
    row: number,
    col: number
  ): Set<Color> {
    const colors = new Set<Color>();

    // Check adjacent cells (not diagonal) - only if they exist
    if (row > 0 && board[row - 1] && board[row - 1][col]) {
      colors.add(board[row - 1][col].color);
    }
    if (row < 2 && board[row + 1] && board[row + 1][col]) {
      colors.add(board[row + 1][col].color);
    }
    if (col > 0 && board[row] && board[row][col - 1]) {
      colors.add(board[row][col - 1].color);
    }
    if (col < 5 && board[row] && board[row][col + 1]) {
      colors.add(board[row][col + 1].color);
    }

    return colors;
  }

  public getGameState(): GameState {
    return { ...this.gameState };
  }

  public makeMove(
    row: number,
    col: number
  ): { success: boolean; newState?: GameState; gameOver?: boolean } {
    if (this.gameState.gameOver) {
      return { success: false };
    }

    const cell = this.gameState.board[row][col];

    if (!cell.isClickable || cell.cooldown > 0) {
      return { success: false };
    }

    const validCombination = this.findValidCombination(
      this.gameState.board,
      row,
      col
    );

    // Check if the move is valid
    const adjacentShapes = this.getAdjacentShapes(
      this.gameState.board,
      row,
      col
    );
    const adjacentColors = this.getAdjacentColors(
      this.gameState.board,
      row,
      col
    );

    if (
      adjacentShapes.has(validCombination.shape) ||
      adjacentColors.has(validCombination.color)
    ) {
      // No valid move possible - game over
      this.gameState.gameOver = true;
      return { success: false, gameOver: true };
    }

    // Apply the move
    this.gameState.board[row][col].shape = validCombination.shape;
    this.gameState.board[row][col].color = validCombination.color;
    this.gameState.board[row][col].cooldown = 3;
    this.gameState.board[row][col].isClickable = false;
    this.gameState.score++;

    // Update cooldowns for all cells
    this.updateCooldowns();

    return { success: true, newState: { ...this.gameState } };
  }

  private updateCooldowns(): void {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 6; col++) {
        if (this.gameState.board[row][col].cooldown > 0) {
          this.gameState.board[row][col].cooldown--;
          if (this.gameState.board[row][col].cooldown === 0) {
            this.gameState.board[row][col].isClickable = true;
          }
        }
      }
    }
  }

  public resetGame(): GameState {
    this.initializeGame();
    return { ...this.gameState };
  }

  public addToLeaderboard(nickname: string, score: number): void {
    this.leaderboard.push({
      nickname,
      score,
      timestamp: new Date(),
    });

    // Sort by score (descending) and keep only top 10
    this.leaderboard.sort((a, b) => b.score - a.score);
    this.leaderboard = this.leaderboard.slice(0, 10);
  }

  public getLeaderboard(): LeaderboardEntry[] {
    return [...this.leaderboard];
  }
}
