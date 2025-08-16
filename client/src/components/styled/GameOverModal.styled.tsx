import { styled } from "@mui/material/styles";
import { Dialog, DialogTitle, Button } from "@mui/material";

export const GameOverStyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    borderRadius: 24,
    padding: 8,
  },
});

export const GameOverStyledDialogTitle = styled(DialogTitle)({
  textAlign: "center",
  color: "#ff4757",
});

export const ModalContent = styled("div")({
  textAlign: "center",
  paddingTop: 16,
  paddingBottom: 16,
});

export const GameOverStyledButton = styled(Button)({
  minWidth: 120,
});
