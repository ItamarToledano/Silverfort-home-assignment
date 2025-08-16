"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreTypography = exports.RankChip = exports.StyledListItem = exports.EmptyStateContainer = exports.StyledIconButton = exports.LeaderboardStyledDialogTitle = exports.LeaderboardStyledDialog = void 0;
const styles_1 = require("@mui/material/styles");
const material_1 = require("@mui/material");
exports.LeaderboardStyledDialog = (0, styles_1.styled)(material_1.Dialog)({
    "& .MuiDialog-paper": {
        borderRadius: 24,
        padding: 8,
    },
});
exports.LeaderboardStyledDialogTitle = (0, styles_1.styled)(material_1.DialogTitle)({
    textAlign: "center",
    color: "#4834d4",
});
exports.StyledIconButton = (0, styles_1.styled)(material_1.IconButton)({
    position: "absolute",
    right: 8,
    top: 8,
});
exports.EmptyStateContainer = (0, styles_1.styled)("div")({
    textAlign: "center",
    paddingTop: 32,
    paddingBottom: 32,
});
exports.StyledListItem = (0, styles_1.styled)("div")(({ isLast }) => ({
    borderBottom: isLast ? "none" : "1px solid #eee",
    paddingTop: 16,
    paddingBottom: 16,
    display: "flex",
    alignItems: "center",
}));
exports.RankChip = (0, styles_1.styled)(material_1.Chip)(({ rank }) => ({
    background: (() => {
        switch (rank) {
            case 0:
                return "#ffd700";
            case 1:
                return "#c0c0c0";
            case 2:
                return "#cd7f32";
            default:
                return "#4834d4";
        }
    })(),
    color: "white",
    fontWeight: "bold",
    minWidth: 50,
    marginRight: 16,
}));
exports.ScoreTypography = (0, styles_1.styled)(material_1.Typography)({
    color: "#ff6b6b",
    fontWeight: "bold",
    minWidth: 60,
    textAlign: "right",
});
//# sourceMappingURL=LeaderboardModal.styled.js.map