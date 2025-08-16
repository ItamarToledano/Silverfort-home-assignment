"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ShapeRenderer_1 = require("./ShapeRenderer");
const styled_1 = require("./styled");
const GameCell = ({ cell, onClick }) => {
    const handleClick = (0, react_1.useMemo)(() => () => {
        if (cell.isClickable && cell.cooldown === 0) {
            onClick(cell.row, cell.col);
        }
    }, [cell.isClickable, cell.cooldown, cell.row, cell.col, onClick]);
    return ((0, jsx_runtime_1.jsxs)(styled_1.StyledGameCell, { isClickable: cell.isClickable, cooldown: cell.cooldown, onClick: handleClick, children: [(0, jsx_runtime_1.jsx)(ShapeRenderer_1.default, { shape: cell.shape, color: cell.color }), cell.cooldown > 0 && (0, jsx_runtime_1.jsx)(styled_1.CooldownChip, { label: cell.cooldown, size: "small" })] }));
};
exports.default = GameCell;
//# sourceMappingURL=GameCell.js.map