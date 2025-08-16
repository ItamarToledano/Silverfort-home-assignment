"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const material_1 = require("@mui/material");
const styled_1 = require("./styled");
const GameOverModal = ({ isOpen, score, onClose, onSaveScore, }) => {
    const [nickname, setNickname] = (0, react_1.useState)("");
    const handleSave = (0, react_1.useCallback)(() => {
        if (nickname.trim()) {
            onSaveScore(nickname.trim());
            onClose();
        }
    }, [nickname, onSaveScore, onClose]);
    const handleKeyPress = (0, react_1.useCallback)((event) => {
        if (event.key === "Enter") {
            handleSave();
        }
    }, [handleSave]);
    const handleNicknameChange = (0, react_1.useCallback)((e) => {
        setNickname(e.target.value);
    }, []);
    const modalContent = (0, react_1.useMemo)(() => ((0, jsx_runtime_1.jsxs)(styled_1.ModalContent, { children: [(0, jsx_runtime_1.jsxs)(material_1.Typography, { variant: "h6", gutterBottom: true, children: ["Your final score: ", (0, jsx_runtime_1.jsx)("strong", { children: score })] }), (0, jsx_runtime_1.jsx)(material_1.Typography, { variant: "body1", sx: { mb: 3 }, children: "Enter your nickname to save your score to the leaderboard:" }), (0, jsx_runtime_1.jsx)(material_1.TextField, { fullWidth: true, label: "Nickname", variant: "outlined", value: nickname, onChange: handleNicknameChange, onKeyPress: handleKeyPress, inputProps: { maxLength: 20 }, autoFocus: true, sx: { mb: 2 } })] })), [score, nickname, handleKeyPress, handleNicknameChange]);
    const modalActions = (0, react_1.useMemo)(() => ((0, jsx_runtime_1.jsxs)(material_1.DialogActions, { sx: { justifyContent: "center", pb: 3 }, children: [(0, jsx_runtime_1.jsx)(styled_1.GameOverStyledButton, { variant: "contained", color: "primary", onClick: handleSave, disabled: !nickname.trim(), children: "Save Score" }), (0, jsx_runtime_1.jsx)(styled_1.GameOverStyledButton, { variant: "outlined", color: "secondary", onClick: onClose, children: "Close" })] })), [handleSave, onClose, nickname]);
    return ((0, jsx_runtime_1.jsxs)(styled_1.GameOverStyledDialog, { open: isOpen, onClose: onClose, maxWidth: "sm", fullWidth: true, children: [(0, jsx_runtime_1.jsx)(styled_1.GameOverStyledDialogTitle, { children: "Game Over!" }), (0, jsx_runtime_1.jsx)(material_1.DialogContent, { children: modalContent }), modalActions] }));
};
exports.default = GameOverModal;
//# sourceMappingURL=GameOverModal.js.map