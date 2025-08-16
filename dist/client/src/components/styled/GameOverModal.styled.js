"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameOverStyledButton = exports.ModalContent = exports.GameOverStyledDialogTitle = exports.GameOverStyledDialog = void 0;
const styles_1 = require("@mui/material/styles");
const material_1 = require("@mui/material");
exports.GameOverStyledDialog = (0, styles_1.styled)(material_1.Dialog)({
    "& .MuiDialog-paper": {
        borderRadius: 24,
        padding: 8,
    },
});
exports.GameOverStyledDialogTitle = (0, styles_1.styled)(material_1.DialogTitle)({
    textAlign: "center",
    color: "#ff4757",
});
exports.ModalContent = (0, styles_1.styled)("div")({
    textAlign: "center",
    paddingTop: 16,
    paddingBottom: 16,
});
exports.GameOverStyledButton = (0, styles_1.styled)(material_1.Button)({
    minWidth: 120,
});
//# sourceMappingURL=GameOverModal.styled.js.map