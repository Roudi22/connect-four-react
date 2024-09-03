import "./App.css";
import React, { useState } from "react";
import { Game } from "./Classes/Game";
import { Player } from "./Classes/Player";
import BoardComponent from "./BoardComponent";
import GameStatus from "./GameStatus";
import Header from "./components/Header";
import Popup from "./components/Popup";
import GameOverModal from "./components/GameOver";

const App: React.FC = () => {
  const [isChoosingMode, setIsChoosingMode] = useState(true);
  const [isChoosingNames, setIsChoosingNames] = useState(false);
  const [isChoosingDifficulty, setIsChoosingDifficulty] = useState(false);

  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");
  const [aiDifficulty, setAiDifficulty] = useState<"easy" | "hard" | null>(null);

  const [lastPlayer1Name, setLastPlayer1Name] = useState("");
  const [lastPlayer2Name, setLastPlayer2Name] = useState("");

  const [game, setGame] = useState<Game | null>(null);
  const [grid, setGrid] = useState<string[][]>([]);
  const [message, setMessage] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  const handleModeSelection = (mode: "human" | "ai") => {
    setIsChoosingMode(false);
    if (mode === "human") {
      setIsChoosingNames(true);
    } else {
      setIsChoosingDifficulty(true);
      setPlayer2Name("AI");
    }
  };

  const handleHumanNamesSubmit = () => {
    const player1 = new Player(player1Name || "Player 1", "X");
    const player2 = new Player(player2Name || "Player 2", "O");
    const newGame = new Game(player1, player2);
    setGame(newGame);
    setGrid(newGame.getBoard());
    setMessage(`${newGame.getCurrentPlayer().name}'s turn`);
    setIsChoosingNames(false);
    setLastPlayer1Name(player1Name || "Player 1");
    setLastPlayer2Name(player2Name || "Player 2");
  };

  const handleAISubmit = () => {
    const player1 = new Player(player1Name || "Player 1", "X");
    const player2 = new Player("AI", "O", true);
    const newGame = new Game(player1, player2);
    
    setGame(newGame);
    setGrid(newGame.getBoard());
    setMessage(`${newGame.getCurrentPlayer().name}'s turn`);
    setIsChoosingDifficulty(false);
    setLastPlayer1Name(player1Name || "Player 1");
    setLastPlayer2Name("AI");
  };

  const handleCellClick = (col: number) => {
    if (game && game.playTurn(col)) {
      setGrid([...game.getBoard()]);
      if (game.winner) {
        setIsGameOver(true);
      } else {
        setMessage(`${game.getCurrentPlayer().name}'s turn`);
      }
    }
  };

  const handleRestartSamePlayers = () => {
    const player1 = new Player(lastPlayer1Name, "X");
    const player2 = new Player(lastPlayer2Name, "O", lastPlayer2Name === "AI");
    const newGame = new Game(player1, player2);
    setGame(newGame);
    setGrid(newGame.getBoard());
    setMessage(`${newGame.getCurrentPlayer().name}'s turn`);
    setIsGameOver(false);
  };

  return (
    <div className="">
      <Header players={[player1Name || "Player 1", player2Name || "Player 2"]} />
      {isChoosingMode && (
        <Popup>
          <h2>Choose Game Mode</h2>
          <button onClick={() => handleModeSelection("human")}>Play with Human</button>
          <button onClick={() => handleModeSelection("ai")}>Play with AI</button>
        </Popup>
      )}
      {isChoosingNames && (
        <Popup>
          <h2>Enter Player Names</h2>
          <input
            type="text"
            placeholder="Player 1 Name"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
          />
          <input
            type="text"
            placeholder="Player 2 Name"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
          />
          <button onClick={handleHumanNamesSubmit}>Start Game</button>
        </Popup>
      )}
      {isChoosingDifficulty && (
        <Popup >
          <h2>Enter Player Name and Choose AI Difficulty</h2>
          <input
            type="text"
            placeholder="Player Name"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
          />
          <div>
            <label>
              <input
                type="radio"
                name="difficulty"
                value="easy"
                checked={aiDifficulty === "easy"}
                onChange={() => setAiDifficulty("easy")}
              />
              Easy
            </label>
            <label>
              <input
                type="radio"
                name="difficulty"
                value="hard"
                checked={aiDifficulty === "hard"}
                onChange={() => setAiDifficulty("hard")}
              />
              Hard
            </label>
          </div>
          <button onClick={handleAISubmit}>Start Game</button>
        </Popup>
      )}
      {game && (
        <>
          <BoardComponent grid={grid} onCellClick={handleCellClick} />
          <GameStatus message={message} />
          {game?.winner && (
            <Popup>
              {isGameOver && (
                <GameOverModal
                  winner={game?.winner ? game.winner.name : null}
                  onRestartSamePlayers={handleRestartSamePlayers}
                  onRestartNewGame={() => {
                    setGame(null);
                    setGrid([]);
                    setMessage("");
                    setIsGameOver(false);
                    setIsChoosingMode(true);
                  }}
                />
              )}
            </Popup>
          )}
        </>
      )}
    </div>
  );
};

export default App;