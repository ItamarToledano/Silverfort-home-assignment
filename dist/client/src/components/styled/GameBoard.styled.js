"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameBoardStyledRow = exports.GameBoardStyledContainer = void 0;
const styles_1 = require("@mui/material/styles");
exports.GameBoardStyledContainer = (0, styles_1.styled)("div")({
    display: "flex",
    flexDirection: "column",
    gap: 20,
    marginBottom: 32,
});
exports.GameBoardStyledRow = (0, styles_1.styled)("div")({
    display: "flex",
    justifyContent: "center",
    gap: 20,
});
//# sourceMappingURL=GameBoard.styled.js.map