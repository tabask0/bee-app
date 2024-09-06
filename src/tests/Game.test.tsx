import React from "react";
import { render, screen } from "@testing-library/react";
import Game from "../components/Game";
import { saveGameState, loadGameState } from "../utils/storage";

jest.mock("../utils/storage", () => ({
  saveGameState: jest.fn(),
  loadGameState: jest.fn(() => ({
    bees: [
      { id: "queen", type: "Queen", health: 100, damage: 8, isAlive: true },
      { id: "worker-0", type: "Worker", health: 75, damage: 10, isAlive: true },
      { id: "worker-1", type: "Worker", health: 75, damage: 10, isAlive: true },
      { id: "drone-0", type: "Drone", health: 50, damage: 12, isAlive: true },
      { id: "drone-1", type: "Drone", health: 50, damage: 12, isAlive: true },
    ],
    gameOver: false,
    logs: [],
  })),
  clearGameState: jest.fn(),
}));

describe("Game Component", () => {
  test("should render the game with initial state", () => {
    render(<Game />);

    expect(screen.getByAltText(/Queen/i)).toBeInTheDocument();

    expect(screen.getAllByText(/Worker/i)).toBeTruthy();

    expect(screen.getAllByText(/Drone/i)).toBeTruthy();

    expect(screen.getAllByText(/Hit/i)).toBeTruthy();
  });
});
