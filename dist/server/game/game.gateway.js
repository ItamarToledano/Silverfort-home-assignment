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
exports.GameGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const game_service_1 = require("./game.service");
let GameGateway = class GameGateway {
    constructor(gameService) {
        this.gameService = gameService;
    }
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
        const gameState = this.gameService.getGameState();
        client.emit("gameState", gameState);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
    handleGetGameState(client) {
        const gameState = this.gameService.getGameState();
        client.emit("gameState", gameState);
    }
    handleMakeMove(client, payload) {
        const result = this.gameService.makeMove(payload.row, payload.col);
        if (result.success) {
            this.server.emit("gameState", result.newState);
        }
        else if (result.gameOver) {
            this.server.emit("gameOver", {
                score: this.gameService.getGameState().score,
            });
        }
        return { success: result.success, gameOver: result.gameOver };
    }
    handleResetGame(client) {
        const newGameState = this.gameService.resetGame();
        this.server.emit("gameState", newGameState);
        return { success: true };
    }
    handleGetLeaderboard(client) {
        const leaderboard = this.gameService.getLeaderboard();
        client.emit("leaderboard", leaderboard);
    }
    handleAddToLeaderboard(client, payload) {
        this.gameService.addToLeaderboard(payload.nickname, payload.score);
        const leaderboard = this.gameService.getLeaderboard();
        this.server.emit("leaderboard", leaderboard);
        return { success: true };
    }
};
exports.GameGateway = GameGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], GameGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("getGameState"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleGetGameState", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("makeMove"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleMakeMove", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("resetGame"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleResetGame", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("getLeaderboard"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleGetLeaderboard", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("addToLeaderboard"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleAddToLeaderboard", null);
exports.GameGateway = GameGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    }),
    __metadata("design:paramtypes", [game_service_1.GameService])
], GameGateway);
//# sourceMappingURL=game.gateway.js.map