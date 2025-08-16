import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { GameService } from "./game.service";
export declare class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly gameService;
    server: Server;
    constructor(gameService: GameService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleGetGameState(client: Socket): void;
    handleMakeMove(client: Socket, payload: {
        row: number;
        col: number;
    }): {
        success: boolean;
        gameOver: boolean;
    };
    handleResetGame(client: Socket): {
        success: boolean;
    };
    handleGetLeaderboard(client: Socket): void;
    handleAddToLeaderboard(client: Socket, payload: {
        nickname: string;
        score: number;
    }): {
        success: boolean;
    };
}
