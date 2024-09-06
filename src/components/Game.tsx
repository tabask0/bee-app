import React, { useState, useEffect } from "react";
import { BeeModel } from "../models/BeeModel";
import { saveGameState, loadGameState, clearGameState } from "../utils/storage";
import BeeList from "./BeeList";
import HitButton from "./HitButton";
import HitLog from "./HitLog";
import initialBees from "../utils/initialBees";

interface LogEntry {
  id: string;
  type: string;
  number: number;
  damage: number;
}

const Game: React.FC = () => {
  const savedState = loadGameState();
  const [bees, setBees] = useState<BeeModel[]>(
    savedState?.bees.length ? savedState.bees : initialBees()
  );
  const [gameOver, setGameOver] = useState<boolean>(savedState?.gameOver);
  const [lastHitBeeId, setLastHitBeeId] = useState<string | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>(savedState?.logs);

  useEffect(() => {
    saveGameState({ bees, gameOver, logs });
  }, [bees, gameOver, logs]);

  const hitRandomBee = () => {
    if (gameOver) return;

    const aliveBees = bees.filter((bee) => bee.isAlive);
    if (aliveBees.length === 0) {
      setGameOver(true);
      return;
    }

    const randomBee = aliveBees[Math.floor(Math.random() * aliveBees.length)];
    setLastHitBeeId(randomBee.id);

    const updatedBees = bees.map((bee) =>
      bee.id === randomBee.id
        ? {
            ...bee,
            health: bee.health - randomBee.damage,
            isAlive: bee.health - randomBee.damage > 0,
          }
        : bee
    );

    const beeNumber = parseInt(randomBee.id.split("-")[1] || "0", 10);
    setLogs([
      ...logs,
      {
        id: randomBee.id,
        type: randomBee.type,
        number: beeNumber,
        damage: randomBee.damage,
      },
    ]);

    if (randomBee.type === "Queen" && randomBee.health <= randomBee.damage) {
      setBees(
        updatedBees.map((bee) => ({ ...bee, isAlive: false, health: 0 }))
      );
      setGameOver(true);
    } else {
      setBees(updatedBees);
    }
  };

  const resetGame = () => {
    setBees(initialBees());
    setGameOver(false);
    setLastHitBeeId(null);
    setLogs([]);
    clearGameState();
  };

  return (
    <div className="app">
      <HitButton onHit={hitRandomBee} disabled={gameOver} />
      <button className="reset-button" onClick={resetGame} disabled={gameOver}>
        reset game
      </button>
      <div className="game-container">
        <h1>The Bee Game</h1>
        <BeeList bees={bees} lastHitBeeId={lastHitBeeId} />
        {gameOver && (
          <div className="game-over">
            Game Over! <button onClick={resetGame}>Restart</button>
          </div>
        )}
      </div>
      <HitLog logs={logs} />
    </div>
  );
};

export default Game;
