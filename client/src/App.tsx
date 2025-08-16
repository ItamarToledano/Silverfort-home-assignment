import React, { useState, useEffect, useMemo, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import {
  Container,
  Typography,
  Chip,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import {
  PlayArrow as PlayIcon,
  Leaderboard as LeaderboardIcon,
} from "@mui/icons-material";
import { GameState, LeaderboardEntry } from "./types";
import GameBoard from "./components/GameBoard";
import GameOverModal from "./components/GameOverModal";
import LeaderboardModal from "./components/LeaderboardModal";
import { theme } from "./theme";
import {
  AppContainer,
  GameHeader,
  GameTitle,
  ScoreContainer,
  AppGameBoardContainer,
  ControlsContainer,
  AppStyledButton,
} from "./components/styled";

const App: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Memoize socket event handlers to prevent unnecessary re-renders
  const handleConnect = useCallback(() => {
    console.log("Connected to server");
    setIsConnected(true);
  }, []);

  const handleDisconnect = useCallback(() => {
    console.log("Disconnected from server");
    setIsConnected(false);
  }, []);

  const handleGameState = useCallback((state: GameState) => {
    setGameState(state);
    if (state.gameOver) {
      setShowGameOver(true);
    }
  }, []);

  const handleGameOver = useCallback((data: { score: number }) => {
    setShowGameOver(true);
  }, []);

  const handleLeaderboard = useCallback((data: LeaderboardEntry[]) => {
    setLeaderboard(data);
  }, []);

  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    newSocket.on("connect", handleConnect);
    newSocket.on("disconnect", handleDisconnect);
    newSocket.on("gameState", handleGameState);
    newSocket.on("gameOver", handleGameOver);
    newSocket.on("leaderboard", handleLeaderboard);

    return () => {
      newSocket.off("connect", handleConnect);
      newSocket.off("disconnect", handleDisconnect);
      newSocket.off("gameState", handleGameState);
      newSocket.off("gameOver", handleGameOver);
      newSocket.off("leaderboard", handleLeaderboard);
      newSocket.close();
    };
  }, [
    handleConnect,
    handleDisconnect,
    handleGameState,
    handleGameOver,
    handleLeaderboard,
  ]);

  // Memoize handlers to prevent unnecessary re-renders
  const handleCellClick = useCallback(
    (row: number, col: number) => {
      if (socket && gameState && !gameState.gameOver) {
        socket.emit("makeMove", { row, col });
      }
    },
    [socket, gameState]
  );

  const handleResetGame = useCallback(() => {
    if (socket) {
      socket.emit("resetGame");
      setShowGameOver(false);
    }
  }, [socket]);

  const handleShowLeaderboard = useCallback(() => {
    if (socket) {
      socket.emit("getLeaderboard");
      setShowLeaderboard(true);
    }
  }, [socket]);

  const handleSaveScore = useCallback(
    (nickname: string) => {
      if (socket && gameState) {
        socket.emit("addToLeaderboard", { nickname, score: gameState.score });
      }
    },
    [socket, gameState]
  );

  const handleCloseGameOver = useCallback(() => {
    setShowGameOver(false);
  }, []);

  const handleCloseLeaderboard = useCallback(() => {
    setShowLeaderboard(false);
  }, []);

  // Memoize the loading state component
  const loadingComponent = useMemo(
    () => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <div style={{ textAlign: "center", marginTop: 64, color: "white" }}>
            <Typography variant="h1" gutterBottom>
              Loading Game...
            </Typography>
            <Typography variant="h6">Connecting to server...</Typography>
          </div>
        </Container>
      </ThemeProvider>
    ),
    []
  );

  if (!gameState) {
    return loadingComponent;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContainer>
        <Container maxWidth="lg">
          <GameHeader>
            <GameTitle>Multisession Game</GameTitle>
            <ScoreContainer>
              <Chip
                label={`Score: ${gameState.score}`}
                color="primary"
                variant="filled"
                sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
              />
              <Chip
                label={`Turn: ${gameState.turn}`}
                color="secondary"
                variant="filled"
                sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
              />
              {!isConnected && (
                <Chip
                  label="Disconnected"
                  color="error"
                  variant="filled"
                  sx={{ fontSize: "1rem" }}
                />
              )}
            </ScoreContainer>
          </GameHeader>

          <AppGameBoardContainer elevation={8}>
            <GameBoard board={gameState.board} onCellClick={handleCellClick} />
          </AppGameBoardContainer>

          <ControlsContainer>
            <AppStyledButton
              variant="contained"
              color="primary"
              size="large"
              onClick={handleResetGame}
              startIcon={<PlayIcon />}
            >
              New Game
            </AppStyledButton>
            <AppStyledButton
              variant="outlined"
              color="secondary"
              size="large"
              onClick={handleShowLeaderboard}
              startIcon={<LeaderboardIcon />}
            >
              Leaderboard
            </AppStyledButton>
          </ControlsContainer>
        </Container>

        <GameOverModal
          isOpen={showGameOver}
          score={gameState.score}
          onClose={handleCloseGameOver}
          onSaveScore={handleSaveScore}
        />

        <LeaderboardModal
          isOpen={showLeaderboard}
          leaderboard={leaderboard}
          onClose={handleCloseLeaderboard}
        />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
