import React from "react";
import { Cell } from "../types";
interface GameCellProps {
    cell: Cell;
    onClick: (row: number, col: number) => void;
}
declare const GameCell: React.FC<GameCellProps>;
export default GameCell;
