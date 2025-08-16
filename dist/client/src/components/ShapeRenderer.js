"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const types_1 = require("../types");
const styled_1 = require("./styled");
const ShapeRenderer = ({ shape, color, size = 60, }) => {
    const getShapePath = () => {
        switch (shape) {
            case types_1.Shape.TRIANGLE:
                return `M ${size / 2} 10 L ${size - 10} ${size - 10} L 10 ${size - 10} Z`;
            case types_1.Shape.SQUARE:
                return `M 10 10 L ${size - 10} 10 L ${size - 10} ${size - 10} L 10 ${size - 10} Z`;
            case types_1.Shape.DIAMOND:
                return `M ${size / 2} 10 L ${size - 10} ${size / 2} L ${size / 2} ${size - 10} L 10 ${size / 2} Z`;
            case types_1.Shape.CIRCLE:
                return `M ${size / 2} 10 A ${size / 2 - 10} ${size / 2 - 10} 0 0 1 ${size / 2} ${size - 10} A ${size / 2 - 10} ${size / 2 - 10} 0 0 1 ${size / 2} 10`;
            default:
                return "";
        }
    };
    const getColorValue = () => {
        switch (color) {
            case types_1.Color.RED:
                return "#ff4757";
            case types_1.Color.GREEN:
                return "#2ed573";
            case types_1.Color.BLUE:
                return "#3742fa";
            case types_1.Color.YELLOW:
                return "#ffa502";
            default:
                return "#000";
        }
    };
    return ((0, jsx_runtime_1.jsx)(styled_1.ShapeContainer, { children: (0, jsx_runtime_1.jsx)("svg", { width: size, height: size, viewBox: `0 0 ${size} ${size}`, children: (0, jsx_runtime_1.jsx)("path", { d: getShapePath(), fill: getColorValue(), stroke: "#fff", strokeWidth: "2", strokeLinejoin: "round", strokeLinecap: "round" }) }) }));
};
exports.default = ShapeRenderer;
//# sourceMappingURL=ShapeRenderer.js.map