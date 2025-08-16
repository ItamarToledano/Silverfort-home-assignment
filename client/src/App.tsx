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
  const [failedMove, setFailedMove] = useState<{
    shape: string;
    color: string;
  } | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [scoreAlreadySaved, setScoreAlreadySaved] = useState(false);

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

  const handleGameOver = useCallback(
    (data: {
      score: number;
      failedMove?: { shape: string; color: string };
    }) => {
      setShowGameOver(true);
      setFailedMove(data.failedMove || null);
      // Reset the flag so this client can potentially save
      setScoreAlreadySaved(false);
    },
    []
  );

  const handleScoreSaved = useCallback(
    (data: { nickname: string; score: number }) => {
      setScoreAlreadySaved(true);
      setShowGameOver(false); // Close modal for all clients when someone saves
    },
    []
  );

  const handleLeaderboard = useCallback((data: LeaderboardEntry[]) => {
    console.log("Received leaderboard data:", data);
    setLeaderboard(data);
    // Don't auto-close leaderboard modal - let user close it manually
  }, []);

  const handleShowLeaderboard = useCallback(() => {
    console.log(
      "Leaderboard button clicked, socket:",
      socket,
      "showLeaderboard:",
      showLeaderboard
    );
    if (socket) {
      socket.emit("getLeaderboard");
      setShowLeaderboard(true);
      console.log("Set showLeaderboard to true");
    }
  }, [socket]);

  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    newSocket.on("connect", handleConnect);
    newSocket.on("disconnect", handleDisconnect);
    newSocket.on("gameState", handleGameState);
    newSocket.on("gameOver", handleGameOver);
    newSocket.on("leaderboard", handleLeaderboard);
    newSocket.on("scoreSaved", handleScoreSaved);

    return () => {
      newSocket.off("connect", handleConnect);
      newSocket.off("disconnect", handleDisconnect);
      newSocket.off("gameState", handleGameState);
      newSocket.off("gameOver", handleGameOver);
      newSocket.off("leaderboard", handleLeaderboard);
      newSocket.off("scoreSaved", handleScoreSaved);
      newSocket.close();
    };
  }, [
    handleConnect,
    handleDisconnect,
    handleGameState,
    handleGameOver,
    handleLeaderboard,
    handleScoreSaved,
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
      setScoreAlreadySaved(false); // Reset the flag for new game
    }
  }, [socket]);

  const handleSaveScore = useCallback(
    (nickname: string) => {
      if (socket && gameState) {
        socket.emit("addToLeaderboard", { nickname, score: gameState.score });
        // Set the flag locally so this client can't save again
        setScoreAlreadySaved(true);
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
            <GameTitle>Silverfort Multisession Game</GameTitle>
            <ScoreContainer>
              <Chip
                label={`Score: ${gameState.score}`}
                color="primary"
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
              variant="contained"
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
          failedMove={failedMove}
          scoreAlreadySaved={scoreAlreadySaved}
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
