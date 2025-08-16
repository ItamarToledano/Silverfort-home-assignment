import React, { useMemo, useCallback } from "react";
import {
  DialogContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { LeaderboardEntry } from "../types";
import {
  LeaderboardStyledDialog,
  LeaderboardStyledDialogTitle,
  StyledIconButton,
  EmptyStateContainer,
  StyledListItem,
  RankChip,
  ScoreTypography,
} from "./styled";

interface LeaderboardModalProps {
  isOpen: boolean;
  leaderboard: LeaderboardEntry[];
  onClose: () => void;
}

const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  leaderboard,
  onClose,
}) => {
  const formatDate = useCallback((date: Date) => {
    return (
      new Date(date).toLocaleDateString() +
      " " +
      new Date(date).toLocaleTimeString()
    );
  }, []);

  const emptyState = useMemo(() => (
    <EmptyStateContainer>
      <p style={{ textAlign: "center", color: "#666", fontSize: "1.1rem" }}>
        No scores yet. Be the first to play!
      </p>
    </EmptyStateContainer>
  ), []);

  const leaderboardList = useMemo(() => (
    <List>
      {leaderboard.map((entry, index) => (
        <StyledListItem
          key={index}
          isLast={index === leaderboard.length - 1}
        >
          <RankChip
            label={`#${index + 1}`}
            rank={index}
          />
          <ListItemText
            primary={entry.nickname}
            secondary={formatDate(entry.timestamp)}
            sx={{ flex: 1 }}
          />
          <ScoreTypography variant="h6">
            {entry.score}
          </ScoreTypography>
        </StyledListItem>
      ))}
    </List>
  ), [leaderboard, formatDate]);

  return (
    <LeaderboardStyledDialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <LeaderboardStyledDialogTitle>
        Leaderboard
        <StyledIconButton onClick={onClose}>
          <CloseIcon />
        </StyledIconButton>
      </LeaderboardStyledDialogTitle>
      <DialogContent>
        {leaderboard.length === 0 ? emptyState : leaderboardList}
      </DialogContent>
    </LeaderboardStyledDialog>
  );
};

export default LeaderboardModal;
