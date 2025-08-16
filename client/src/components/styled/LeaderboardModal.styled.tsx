import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogTitle,
  IconButton,
  Chip,
  Typography,
} from "@mui/material";

export const LeaderboardStyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    borderRadius: 24,
    padding: 8,
  },
});

export const LeaderboardStyledDialogTitle = styled(DialogTitle)({
  textAlign: "center",
  color: "white",
});

export const StyledIconButton = styled(IconButton)({
  position: "absolute",
  right: 8,
  top: 8,
});

export const NoScoresContainer = styled("div")({
  textAlign: "center",
  paddingTop: 32,
  paddingBottom: 32,
});

export const StyledListItem = styled("div")({
  borderBottom: "1px solid #eee",
  paddingTop: 16,
  paddingBottom: 16,
  display: "flex",
  alignItems: "center",

  "&:last-child": {
    borderBottom: "none",
  },
});

export const RankChip = styled(Chip)<{ rank: number }>(({ rank }) => ({
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

export const ScoreTypography = styled(Typography)({
  color: "#ff6b6b",
  fontWeight: "bold",
  minWidth: 60,
  textAlign: "right",
});
