import { Injectable } from "@nestjs/common";
import { Shape, Color, Cell, GameState, LeaderboardEntry } from "./game.types";

@Injectable()
export class GameService {
  private gameState: GameState;
  private leaderboard: LeaderboardEntry[] = [];
  private scoreAlreadySaved: boolean = false;

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
        const validCombination = this.findValidCombinationForBoard(
          board,
          row,
          col
        );

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

  private findValidCombinationForBoard(
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

    if (availableShapes.length === 0) {
      availableShapes.push(...Object.values(Shape));
    }
    if (availableColors.length === 0) {
      availableColors.push(...Object.values(Color));
    }

    return {
      shape:
        availableShapes[Math.floor(Math.random() * availableShapes.length)],
      color:
        availableColors[Math.floor(Math.random() * availableColors.length)],
    };
  }

  private findValidCombination(
    board: Cell[][],
    row: number,
    col: number
  ): { shape: Shape; color: Color } {
    const randomShape =
      Object.values(Shape)[
        Math.floor(Math.random() * Object.values(Shape).length)
      ];
    const randomColor =
      Object.values(Color)[
        Math.floor(Math.random() * Object.values(Color).length)
      ];

    return {
      shape: randomShape,
      color: randomColor,
    };
  }

  private getAdjacentShapes(
    board: Cell[][],
    row: number,
    col: number
  ): Set<Shape> {
    const shapes = new Set<Shape>();

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
    this.updateCooldowns();
    return { ...this.gameState };
  }

  public markGameOverModalShown(): void {}

  public isGameOverModalShown(): boolean {
    return false;
  }

  public hasAnyClientSeenGameOver(): boolean {
    return false;
  }

  public makeMove(
    row: number,
    col: number
  ): {
    success: boolean;
    newState?: GameState;
    gameOver?: boolean;
    failedMove?: { shape: Shape; color: Color };
  } {
    if (this.gameState.gameOver) {
      return { success: false };
    }

    const cell = this.gameState.board[row][col];

    if (!cell.isClickable || cell.cooldown > 0) {
      return { success: false };
    }

    const combination = this.findValidCombination(
      this.gameState.board,
      row,
      col
    );

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
      adjacentShapes.has(combination.shape) ||
      adjacentColors.has(combination.color)
    ) {
      this.gameState.gameOver = true;
      return {
        success: false,
        gameOver: true,
        failedMove: { shape: combination.shape, color: combination.color },
      };
    }

    this.gameState.board[row][col].shape = combination.shape;
    this.gameState.board[row][col].color = combination.color;
    this.gameState.board[row][col].cooldown = 3;
    this.gameState.board[row][col].isClickable = false;
    this.gameState.score++;

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
    this.scoreAlreadySaved = false;
    this.initializeGame();
    return { ...this.gameState };
  }

  public addToLeaderboard(
    nickname: string,
    score: number
  ): { success: boolean; alreadySaved: boolean } {
    if (this.scoreAlreadySaved) {
      return { success: false, alreadySaved: true };
    }

    this.leaderboard.push({
      nickname,
      score,
      timestamp: new Date(),
    });

    this.leaderboard.sort((a, b) => b.score - a.score);
    this.leaderboard = this.leaderboard.slice(0, 10);

    this.scoreAlreadySaved = true;

    return { success: true, alreadySaved: false };
  }

  public getLeaderboard(): LeaderboardEntry[] {
    return [...this.leaderboard];
  }
}
