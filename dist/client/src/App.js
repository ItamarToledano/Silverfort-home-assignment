"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const socket_io_client_1 = require("socket.io-client");
const material_1 = require("@mui/material");
const icons_material_1 = require("@mui/icons-material");
const GameBoard_1 = require("./components/GameBoard");
const GameOverModal_1 = require("./components/GameOverModal");
const LeaderboardModal_1 = require("./components/LeaderboardModal");
const theme_1 = require("./theme");
const styled_1 = require("./components/styled");
const App = () => {
    const [socket, setSocket] = (0, react_1.useState)(null);
    const [gameState, setGameState] = (0, react_1.useState)(null);
    const [leaderboard, setLeaderboard] = (0, react_1.useState)([]);
    const [showGameOver, setShowGameOver] = (0, react_1.useState)(false);
    const [showLeaderboard, setShowLeaderboard] = (0, react_1.useState)(false);
    const [isConnected, setIsConnected] = (0, react_1.useState)(false);
    const handleConnect = (0, react_1.useCallback)(() => {
        console.log("Connected to server");
        setIsConnected(true);
    }, []);
    const handleDisconnect = (0, react_1.useCallback)(() => {
        console.log("Disconnected from server");
        setIsConnected(false);
    }, []);
    const handleGameState = (0, react_1.useCallback)((state) => {
        setGameState(state);
        if (state.gameOver) {
            setShowGameOver(true);
        }
    }, []);
    const handleGameOver = (0, react_1.useCallback)((data) => {
        setShowGameOver(true);
    }, []);
    const handleLeaderboard = (0, react_1.useCallback)((data) => {
        setLeaderboard(data);
    }, []);
    (0, react_1.useEffect)(() => {
        const newSocket = (0, socket_io_client_1.io)("http://localhost:3001");
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
    const handleCellClick = (0, react_1.useCallback)((row, col) => {
        if (socket && gameState && !gameState.gameOver) {
            socket.emit("makeMove", { row, col });
        }
    }, [socket, gameState]);
    const handleResetGame = (0, react_1.useCallback)(() => {
        if (socket) {
            socket.emit("resetGame");
            setShowGameOver(false);
        }
    }, [socket]);
    const handleShowLeaderboard = (0, react_1.useCallback)(() => {
        if (socket) {
            socket.emit("getLeaderboard");
            setShowLeaderboard(true);
        }
    }, [socket]);
    const handleSaveScore = (0, react_1.useCallback)((nickname) => {
        if (socket && gameState) {
            socket.emit("addToLeaderboard", { nickname, score: gameState.score });
        }
    }, [socket, gameState]);
    const handleCloseGameOver = (0, react_1.useCallback)(() => {
        setShowGameOver(false);
    }, []);
    const handleCloseLeaderboard = (0, react_1.useCallback)(() => {
        setShowLeaderboard(false);
    }, []);
    const loadingComponent = (0, react_1.useMemo)(() => ((0, jsx_runtime_1.jsxs)(material_1.ThemeProvider, { theme: theme_1.theme, children: [(0, jsx_runtime_1.jsx)(material_1.CssBaseline, {}), (0, jsx_runtime_1.jsx)(material_1.Container, { maxWidth: "lg", children: (0, jsx_runtime_1.jsxs)("div", { style: { textAlign: "center", marginTop: 64, color: "white" }, children: [(0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h1", gutterBottom: true, children: "Loading Game..." }), (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "h6", children: "Connecting to server..." })] }) })] })), []);
    if (!gameState) {
        return loadingComponent;
    }
    return ((0, jsx_runtime_1.jsxs)(material_1.ThemeProvider, { theme: theme_1.theme, children: [(0, jsx_runtime_1.jsx)(material_1.CssBaseline, {}), (0, jsx_runtime_1.jsxs)(styled_1.AppContainer, { children: [(0, jsx_runtime_1.jsxs)(material_1.Container, { maxWidth: "lg", children: [(0, jsx_runtime_1.jsxs)(styled_1.GameHeader, { children: [(0, jsx_runtime_1.jsx)(styled_1.GameTitle, { children: "Multisession Game" }), (0, jsx_runtime_1.jsxs)(styled_1.ScoreContainer, { children: [(0, jsx_runtime_1.jsx)(material_1.Chip, { label: `Score: ${gameState.score}`, color: "primary", variant: "filled", sx: { fontSize: "1.2rem", fontWeight: "bold" } }), (0, jsx_runtime_1.jsx)(material_1.Chip, { label: `Turn: ${gameState.turn}`, color: "secondary", variant: "filled", sx: { fontSize: "1.2rem", fontWeight: "bold" } }), !isConnected && ((0, jsx_runtime_1.jsx)(material_1.Chip, { label: "Disconnected", color: "error", variant: "filled", sx: { fontSize: "1rem" } }))] })] }), (0, jsx_runtime_1.jsx)(styled_1.AppGameBoardContainer, { elevation: 8, children: (0, jsx_runtime_1.jsx)(GameBoard_1.default, { board: gameState.board, onCellClick: handleCellClick }) }), (0, jsx_runtime_1.jsxs)(styled_1.ControlsContainer, { children: [(0, jsx_runtime_1.jsx)(styled_1.AppStyledButton, { variant: "contained", color: "primary", size: "large", onClick: handleResetGame, startIcon: (0, jsx_runtime_1.jsx)(icons_material_1.PlayArrow, {}), children: "New Game" }), (0, jsx_runtime_1.jsx)(styled_1.AppStyledButton, { variant: "outlined", color: "secondary", size: "large", onClick: handleShowLeaderboard, startIcon: (0, jsx_runtime_1.jsx)(icons_material_1.Leaderboard, {}), children: "Leaderboard" })] })] }), (0, jsx_runtime_1.jsx)(GameOverModal_1.default, { isOpen: showGameOver, score: gameState.score, onClose: handleCloseGameOver, onSaveScore: handleSaveScore }), (0, jsx_runtime_1.jsx)(LeaderboardModal_1.default, { isOpen: showLeaderboard, leaderboard: leaderboard, onClose: handleCloseLeaderboard })] })] }));
};
exports.default = App;
//# sourceMappingURL=App.js.map