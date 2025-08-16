"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppStyledButton = exports.ControlsContainer = exports.AppGameBoardContainer = exports.ScoreContainer = exports.GameTitle = exports.GameHeader = exports.AppContainer = void 0;
const styles_1 = require("@mui/material/styles");
const material_1 = require("@mui/material");
exports.AppContainer = (0, styles_1.styled)("div")({
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    paddingTop: 32,
    paddingBottom: 32,
});
exports.GameHeader = (0, styles_1.styled)("div")({
    textAlign: "center",
    marginBottom: 32,
});
exports.GameTitle = (0, styles_1.styled)("h1")({
    color: "white",
    marginBottom: 16,
    fontWeight: 700,
    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
});
exports.ScoreContainer = (0, styles_1.styled)("div")({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    marginBottom: 16,
});
exports.AppGameBoardContainer = (0, styles_1.styled)(material_1.Paper)({
    padding: 32,
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: 24,
    marginBottom: 32,
});
exports.ControlsContainer = (0, styles_1.styled)("div")({
    display: "flex",
    justifyContent: "center",
    gap: 24,
    marginBottom: 32,
});
exports.AppStyledButton = (0, styles_1.styled)(material_1.Button)({
    minWidth: 160,
});
//# sourceMappingURL=App.styled.js.map