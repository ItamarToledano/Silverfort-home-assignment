import React from "react";
import { DialogContent, List, ListItemText } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { LeaderboardEntry } from "@silverfort/shared-types";
import {
  LeaderboardStyledDialog,
  LeaderboardStyledDialogTitle,
  StyledIconButton,
  NoScoresContainer,
  StyledListItem,
  RankChip,
  ScoreTypography,
} from "./styled";

interface LeaderboardModalProps {
  isOpen: boolean;
  leaderboard: LeaderboardEntry[];
  onClose: () => void;
}

const formatDate = (date: Date) => {
  return (
    new Date(date).toLocaleDateString() +
    " " +
    new Date(date).toLocaleTimeString()
  );
};

const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  leaderboard,
  onClose,
}) => {
  const noScoresLabel = (
    <NoScoresContainer>
      <p style={{ textAlign: "center", color: "#666", fontSize: "1.1rem" }}>
        No scores yet. Be the first to play!
      </p>
    </NoScoresContainer>
  );

  const leaderboardList = (
    <List>
      {leaderboard.map((entry, index) => (
        <StyledListItem key={index}>
          <RankChip label={`#${index + 1}`} rank={index} />
          <ListItemText
            primary={entry.nickname}
            secondary={formatDate(entry.timestamp)}
            sx={{ flex: 1 }}
          />
          <ScoreTypography variant="h6">{entry.score}</ScoreTypography>
        </StyledListItem>
      ))}
    </List>
  );

  return (
    <LeaderboardStyledDialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <LeaderboardStyledDialogTitle>
        Leaderboard
        <StyledIconButton onClick={onClose}>
          <CloseIcon />
        </StyledIconButton>
      </LeaderboardStyledDialogTitle>
      <DialogContent>
        {!!leaderboard.length ? leaderboardList : noScoresLabel}
      </DialogContent>
    </LeaderboardStyledDialog>
  );
};

export default LeaderboardModal;
