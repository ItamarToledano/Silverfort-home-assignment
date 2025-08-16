import React, { useMemo } from "react";
import { Cell } from "@silverfort/shared-types";
import GameCell from "./GameCell";
import { GameBoardStyledContainer, GameBoardStyledRow } from "./styled";

interface GameBoardProps {
  board: Cell[][];
  onCellClick: (row: number, col: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ board, onCellClick }) => {
  const memoizedBoard = useMemo(
    () => (
      <GameBoardStyledContainer>
        {board.map((row, rowIndex) => (
          <GameBoardStyledRow key={rowIndex}>
            {row.map((cell) => (
              <GameCell key={cell.id} cell={cell} onClick={onCellClick} />
            ))}
          </GameBoardStyledRow>
        ))}
      </GameBoardStyledContainer>
    ),
    [board, onCellClick]
  );

  return memoizedBoard;
};

export default GameBoard;
