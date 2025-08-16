"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const GameCell_1 = require("./GameCell");
const styled_1 = require("./styled");
const GameBoard = ({ board, onCellClick }) => {
    const memoizedBoard = (0, react_1.useMemo)(() => ((0, jsx_runtime_1.jsx)(styled_1.GameBoardStyledContainer, { children: board.map((row, rowIndex) => ((0, jsx_runtime_1.jsx)(styled_1.GameBoardStyledRow, { children: row.map((cell) => ((0, jsx_runtime_1.jsx)(GameCell_1.default, { cell: cell, onClick: onCellClick }, cell.id))) }, rowIndex))) })), [board, onCellClick]);
    return memoizedBoard;
};
exports.default = GameBoard;
//# sourceMappingURL=GameBoard.js.map