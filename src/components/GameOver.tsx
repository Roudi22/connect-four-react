// src/components/GameOverModal.tsx
import React from 'react';

interface GameOverModalProps {
    winner: string | null;
    onRestartSamePlayers: () => void;
    onRestartNewGame: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ winner, onRestartSamePlayers, onRestartNewGame }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{winner ? `${winner} wins!` : "It's a draw!"}</h2>
                <button onClick={onRestartSamePlayers}>Play Again with Same Players</button>
                <button onClick={onRestartNewGame}>Start New Game</button>
            </div>
        </div>
    );
};

export default GameOverModal;
