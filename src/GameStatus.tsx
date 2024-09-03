import React from 'react';

interface GameStatusProps {
    message: string;
}

const GameStatus: React.FC<GameStatusProps> = ({ message }) => {
    return <div className="game-status">{message}</div>;
};

export default GameStatus;
