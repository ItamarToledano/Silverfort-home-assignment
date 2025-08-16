"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CooldownChip = exports.StyledGameCell = void 0;
const styles_1 = require("@mui/material/styles");
const material_1 = require("@mui/material");
exports.StyledGameCell = (0, styles_1.styled)("div")(({ isClickable, cooldown }) => ({
    width: 80,
    height: 80,
    border: "3px solid #fff",
    borderRadius: 10,
    cursor: isClickable && cooldown === 0 ? "pointer" : "not-allowed",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    background: isClickable && cooldown === 0
        ? "rgba(255, 255, 255, 0.2)"
        : "rgba(255, 255, 255, 0.05)",
    opacity: cooldown > 0 ? 0.5 : 1,
    "&:hover": isClickable && cooldown === 0
        ? {
            transform: "scale(1.05)",
            boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
        }
        : {},
}));
exports.CooldownChip = (0, styles_1.styled)(material_1.Chip)({
    position: "absolute",
    top: -10,
    right: -10,
    background: "#ff4757",
    color: "white",
    fontWeight: "bold",
    minWidth: 25,
    height: 25,
});
//# sourceMappingURL=GameCell.styled.js.map