import React from "react";
import { LeaderboardEntry } from "../types";
interface LeaderboardModalProps {
    isOpen: boolean;
    leaderboard: LeaderboardEntry[];
    onClose: () => void;
}
declare const LeaderboardModal: React.FC<LeaderboardModalProps>;
export default LeaderboardModal;
