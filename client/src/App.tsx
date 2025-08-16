import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  Chip,
} from "@mui/material";
import { io, Socket } from "socket.io-client";
import PlayIcon from "@mui/icons-material/PlayArrow";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import {
  GameState,
  LeaderboardEntry,
  Shape,
  Color,
} from "@silverfort/shared-types";
import GameBoard from "./components/GameBoard";
import GameOverModal from "./components/GameOverModal";
import LeaderboardModal from "./components/LeaderboardModal";
import {
  AppContainer,
  GameHeader,
  GameTitle,
  ScoreContainer,
  AppGameBoardContainer,
  ControlsContainer,
  AppStyledButton,
} from "./components/styled";
import { theme } from "./theme";

const SERVER_URL = "http://localhost:3001";

const App: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [failedMove, setFailedMove] = useState<{
    shape: Shape;
    color: Color;
  } | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [scoreAlreadySaved, setScoreAlreadySaved] = useState(false);

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  const handleGameState = (state: GameState) => {
    setGameState(state);
  };

  const handleGameOver = (data: {
    score: number;
    failedMove?: { shape: Shape; color: Color };
  }) => {
    setShowGameOver(true);
    setFailedMove(data.failedMove || null);
    setScoreAlreadySaved(false);
  };

  const handleScoreSaved = () => {
    setScoreAlreadySaved(true);
    setShowGameOver(false);
  };

  const handleLeaderboard = (data: LeaderboardEntry[]) => {
    setLeaderboard(data);
  };

  const handleShowLeaderboard = useCallback(() => {
    if (socket) {
      socket.emit("getLeaderboard");
      setShowLeaderboard(true);
    }
  }, [socket]);

  useEffect(() => {
    const newSocket = io(SERVER_URL);
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
  }, []);

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
      setScoreAlreadySaved(false);
    }
  }, [socket]);

  const handleSaveScore = useCallback(
    (nickname: string) => {
      if (socket && gameState) {
        socket.emit("addToLeaderboard", { nickname, score: gameState.score });
        setScoreAlreadySaved(true);
      }
    },
    [socket, gameState]
  );

  const handleCloseGameOver = () => {
    setShowGameOver(false);
  };

  const handleCloseLeaderboard = () => {
    setShowLeaderboard(false);
  };

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
