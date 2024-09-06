import { BeeModel } from "../models/BeeModel";

interface GameState {
  bees: BeeModel[];
  gameOver: boolean;
  logs: any[];
}

export const saveGameState = (state: GameState) => {
  localStorage.setItem("gameState", JSON.stringify(state));
};

export const loadGameState = (): GameState => {
  const state = localStorage.getItem("gameState");
  if (state) {
    try {
      return JSON.parse(state);
    } catch (error) {
      console.error("Failed to parse game state from localStorage", error);
      return {
        bees: [],
        gameOver: false,
        logs: [],
      };
    }
  }
  return {
    bees: [],
    gameOver: false,
    logs: [],
  };
};

export const clearGameState = () => {
  localStorage.removeItem("gameState");
};
