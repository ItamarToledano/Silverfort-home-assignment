"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.theme = void 0;
const styles_1 = require("@mui/material/styles");
exports.theme = (0, styles_1.createTheme)({
    palette: {
        mode: "dark",
        primary: {
            main: "#667eea",
        },
        secondary: {
            main: "#764ba2",
        },
        background: {
            default: "#0a0a0a",
            paper: "#1a1a1a",
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
        },
        h4: {
            fontWeight: 600,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 25,
                    textTransform: "none",
                    fontWeight: 600,
                    padding: "12px 24px",
                },
            },
        },
    },
});
//# sourceMappingURL=theme.js.map