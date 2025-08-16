import React from "react";
import { Cell } from "../types";
interface GameBoardProps {
    board: Cell[][];
    onCellClick: (row: number, col: number) => void;
}
declare const GameBoard: React.FC<GameBoardProps>;
export default GameBoard;
