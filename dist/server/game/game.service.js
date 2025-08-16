"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
const common_1 = require("@nestjs/common");
const game_types_1 = require("./game.types");
let GameService = class GameService {
    constructor() {
        this.leaderboard = [];
        this.initializeGame();
    }
    initializeGame() {
        this.gameState = {
            board: this.generateValidBoard(),
            score: 0,
            gameOver: false,
            turn: 0,
        };
    }
    generateValidBoard() {
        const board = [];
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
    findValidCombination(board, row, col) {
        const adjacentShapes = this.getAdjacentShapes(board, row, col);
        const adjacentColors = this.getAdjacentColors(board, row, col);
        const availableShapes = Object.values(game_types_1.Shape).filter((shape) => !adjacentShapes.has(shape));
        const availableColors = Object.values(game_types_1.Color).filter((color) => !adjacentColors.has(color));
        if (availableShapes.length === 0 || availableColors.length === 0) {
            return {
                shape: availableShapes.length > 0
                    ? availableShapes[0]
                    : Object.values(game_types_1.Shape)[0],
                color: availableColors.length > 0
                    ? availableColors[0]
                    : Object.values(game_types_1.Color)[0],
            };
        }
        return {
            shape: availableShapes[Math.floor(Math.random() * availableShapes.length)],
            color: availableColors[Math.floor(Math.random() * availableColors.length)],
        };
    }
    getAdjacentShapes(board, row, col) {
        const shapes = new Set();
        if (row > 0)
            shapes.add(board[row - 1][col].shape);
        if (row < 2)
            shapes.add(board[row + 1][col].shape);
        if (col > 0)
            shapes.add(board[row][col - 1].shape);
        if (col < 5)
            shapes.add(board[row][col + 1].shape);
        return shapes;
    }
    getAdjacentColors(board, row, col) {
        const colors = new Set();
        if (row > 0)
            colors.add(board[row - 1][col].color);
        if (row < 2)
            colors.add(board[row + 1][col].color);
        if (col > 0)
            colors.add(board[row][col - 1].color);
        if (col < 5)
            colors.add(board[row][col + 1].color);
        return colors;
    }
    getGameState() {
        return { ...this.gameState };
    }
    makeMove(row, col) {
        if (this.gameState.gameOver) {
            return { success: false };
        }
        const cell = this.gameState.board[row][col];
        if (!cell.isClickable || cell.cooldown > 0) {
            return { success: false };
        }
        const validCombination = this.findValidCombination(this.gameState.board, row, col);
        const adjacentShapes = this.getAdjacentShapes(this.gameState.board, row, col);
        const adjacentColors = this.getAdjacentColors(this.gameState.board, row, col);
        if (adjacentShapes.has(validCombination.shape) ||
            adjacentColors.has(validCombination.color)) {
            this.gameState.gameOver = true;
            return { success: false, gameOver: true };
        }
        this.gameState.board[row][col].shape = validCombination.shape;
        this.gameState.board[row][col].color = validCombination.color;
        this.gameState.board[row][col].cooldown = 3;
        this.gameState.board[row][col].isClickable = false;
        this.gameState.score++;
        this.gameState.turn++;
        this.updateCooldowns();
        return { success: true, newState: { ...this.gameState } };
    }
    updateCooldowns() {
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
    resetGame() {
        this.initializeGame();
        return { ...this.gameState };
    }
    addToLeaderboard(nickname, score) {
        this.leaderboard.push({
            nickname,
            score,
            timestamp: new Date(),
        });
        this.leaderboard.sort((a, b) => b.score - a.score);
        this.leaderboard = this.leaderboard.slice(0, 10);
    }
    getLeaderboard() {
        return [...this.leaderboard];
    }
};
exports.GameService = GameService;
exports.GameService = GameService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GameService);
//# sourceMappingURL=game.service.js.map