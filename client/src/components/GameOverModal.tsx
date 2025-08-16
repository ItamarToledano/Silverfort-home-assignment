import React, { useState, useMemo, useCallback } from "react";
import {
  DialogContent,
  DialogActions,
  TextField,
  Typography,
} from "@mui/material";
import {
  GameOverStyledDialog,
  GameOverStyledDialogTitle,
  ModalContent,
  GameOverStyledButton,
} from "./styled";

interface GameOverModalProps {
  isOpen: boolean;
  score: number;
  onClose: () => void;
  onSaveScore: (nickname: string) => void;
  failedMove?: { shape: string; color: string } | null;
  scoreAlreadySaved?: boolean;
}

const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  score,
  onClose,
  onSaveScore,
  failedMove,
  scoreAlreadySaved,
}) => {
  const [nickname, setNickname] = useState("");

  const handleSave = useCallback(() => {
    if (nickname.trim()) {
      onSaveScore(nickname.trim());
      onClose();
    }
  }, [nickname, onSaveScore, onClose]);

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter") {
        handleSave();
      }
    },
    [handleSave]
  );

  const handleNicknameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNickname(e.target.value);
    },
    []
  );

  const modalContent = useMemo(
    () => (
      <ModalContent>
        <Typography variant="h6" gutterBottom>
          Your final score: <strong>{score}</strong>
        </Typography>

        {failedMove && (
          <Typography variant="body1" sx={{ mb: 2, color: "error.main", fontStyle: "italic" }}>
            You really wish it wasn't a {failedMove.color} {failedMove.shape}, don't you? 😅
          </Typography>
        )}

        {scoreAlreadySaved ? (
          <Typography variant="body1" sx={{ mb: 3, color: "info.main" }}>
            Someone else already saved their score to the leaderboard!
          </Typography>
        ) : (
          <>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Enter your nickname to save your score to the leaderboard:
            </Typography>
            <TextField
              fullWidth
              label="Nickname"
              variant="outlined"
              value={nickname}
              onChange={handleNicknameChange}
              onKeyPress={handleKeyPress}
              inputProps={{ maxLength: 20 }}
              autoFocus
              sx={{ mb: 2 }}
            />
          </>
        )}
      </ModalContent>
    ),
    [
      score,
      nickname,
      handleKeyPress,
      handleNicknameChange,
      failedMove,
      scoreAlreadySaved,
    ]
  );

  const modalActions = useMemo(
    () => (
      <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
        {!scoreAlreadySaved && (
          <GameOverStyledButton
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={!nickname.trim()}
          >
            Save Score
          </GameOverStyledButton>
        )}
        <GameOverStyledButton
          variant="outlined"
          color="secondary"
          onClick={onClose}
        >
          Close
        </GameOverStyledButton>
      </DialogActions>
    ),
    [handleSave, onClose, nickname, scoreAlreadySaved]
  );

  return (
    <GameOverStyledDialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <GameOverStyledDialogTitle>Game Over!</GameOverStyledDialogTitle>
      <DialogContent>{modalContent}</DialogContent>
      {modalActions}
    </GameOverStyledDialog>
  );
};

export default GameOverModal;
