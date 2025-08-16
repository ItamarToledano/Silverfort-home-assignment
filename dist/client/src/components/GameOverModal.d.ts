import React from "react";
interface GameOverModalProps {
    isOpen: boolean;
    score: number;
    onClose: () => void;
    onSaveScore: (nickname: string) => void;
}
declare const GameOverModal: React.FC<GameOverModalProps>;
export default GameOverModal;
