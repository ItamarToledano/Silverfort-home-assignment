import React, { useMemo } from "react";
import { Cell } from "../types";
import ShapeRenderer from "./ShapeRenderer";
import { StyledGameCell, CooldownChip } from "./styled";

interface GameCellProps {
  cell: Cell;
  onClick: (row: number, col: number) => void;
}

const GameCell: React.FC<GameCellProps> = ({ cell, onClick }) => {
  const handleClick = useMemo(() => () => {
    if (cell.isClickable && cell.cooldown === 0) {
      onClick(cell.row, cell.col);
    }
  }, [cell.isClickable, cell.cooldown, cell.row, cell.col, onClick]);

  return (
    <StyledGameCell 
      isClickable={cell.isClickable} 
      cooldown={cell.cooldown}
      onClick={handleClick}
    >
      <ShapeRenderer shape={cell.shape} color={cell.color} />
      {cell.cooldown > 0 && <CooldownChip label={cell.cooldown} size="small" />}
    </StyledGameCell>
  );
};

export default GameCell;
