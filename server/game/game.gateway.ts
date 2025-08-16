import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { GameService } from "./game.service";

@WebSocketGateway({
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly gameService: GameService) {}

  handleConnection(client: Socket) {
    const gameState = this.gameService.getGameState();
    client.emit("gameState", gameState);
  }

  handleDisconnect(client: Socket) {}

  @SubscribeMessage("getGameState")
  handleGetGameState(client: Socket) {
    const gameState = this.gameService.getGameState();
    client.emit("gameState", gameState);
  }

  @SubscribeMessage("makeMove")
  handleMakeMove(client: Socket, payload: { row: number; col: number }) {
    const result = this.gameService.makeMove(payload.row, payload.col);

    if (result.success) {
      this.server.emit("gameState", result.newState);
    } else if (result.gameOver) {
      this.server.emit("gameOver", {
        score: this.gameService.getGameState().score,
        failedMove: result.failedMove,
      });
    }

    return {
      success: result.success,
      gameOver: result.gameOver,
      failedMove: result.failedMove,
    };
  }

  @SubscribeMessage("resetGame")
  handleResetGame(client: Socket) {
    const newGameState = this.gameService.resetGame();
    this.server.emit("gameState", newGameState);
    return { success: true };
  }

  @SubscribeMessage("getLeaderboard")
  handleGetLeaderboard(client: Socket) {
    const leaderboard = this.gameService.getLeaderboard();
    client.emit("leaderboard", leaderboard);
  }

  @SubscribeMessage("addToLeaderboard")
  handleAddToLeaderboard(
    client: Socket,
    payload: { nickname: string; score: number }
  ) {
    const result = this.gameService.addToLeaderboard(
      payload.nickname,
      payload.score
    );

    if (result.success) {
      const leaderboard = this.gameService.getLeaderboard();
      this.server.emit("leaderboard", leaderboard);

      this.server.emit("scoreSaved", {
        nickname: payload.nickname,
        score: payload.score,
      });
    }

    return { success: result.success, alreadySaved: result.alreadySaved };
  }
}
