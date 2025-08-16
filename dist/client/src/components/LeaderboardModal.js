"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const material_1 = require("@mui/material");
const icons_material_1 = require("@mui/icons-material");
const styled_1 = require("./styled");
const LeaderboardModal = ({ isOpen, leaderboard, onClose, }) => {
    const formatDate = (0, react_1.useCallback)((date) => {
        return (new Date(date).toLocaleDateString() +
            " " +
            new Date(date).toLocaleTimeString());
    }, []);
    const emptyState = (0, react_1.useMemo)(() => ((0, jsx_runtime_1.jsx)(styled_1.EmptyStateContainer, { children: (0, jsx_runtime_1.jsx)("p", { style: { textAlign: "center", color: "#666", fontSize: "1.1rem" }, children: "No scores yet. Be the first to play!" }) })), []);
    const leaderboardList = (0, react_1.useMemo)(() => ((0, jsx_runtime_1.jsx)(material_1.List, { children: leaderboard.map((entry, index) => ((0, jsx_runtime_1.jsxs)(styled_1.StyledListItem, { isLast: index === leaderboard.length - 1, children: [(0, jsx_runtime_1.jsx)(styled_1.RankChip, { label: `#${index + 1}`, rank: index }), (0, jsx_runtime_1.jsx)(material_1.ListItemText, { primary: entry.nickname, secondary: formatDate(entry.timestamp), sx: { flex: 1 } }), (0, jsx_runtime_1.jsx)(styled_1.ScoreTypography, { variant: "h6", children: entry.score })] }, index))) })), [leaderboard, formatDate]);
    return ((0, jsx_runtime_1.jsxs)(styled_1.LeaderboardStyledDialog, { open: isOpen, onClose: onClose, maxWidth: "md", fullWidth: true, children: [(0, jsx_runtime_1.jsxs)(styled_1.LeaderboardStyledDialogTitle, { children: ["Leaderboard", (0, jsx_runtime_1.jsx)(styled_1.StyledIconButton, { onClick: onClose, children: (0, jsx_runtime_1.jsx)(icons_material_1.Close, {}) })] }), (0, jsx_runtime_1.jsx)(material_1.DialogContent, { children: leaderboard.length === 0 ? emptyState : leaderboardList })] }));
};
exports.default = LeaderboardModal;
//# sourceMappingURL=LeaderboardModal.js.map