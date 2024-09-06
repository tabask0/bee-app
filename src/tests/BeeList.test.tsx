import React from "react";
import { render, screen } from "@testing-library/react";
import BeeList from "./../components/BeeList";
import { BeeModel } from "../models/BeeModel";

describe("BeeList Component", () => {
  const bees: BeeModel[] = [
    { id: "Queen", type: "Queen", health: 100, damage: 8, isAlive: true },
    { id: "Worker-1", type: "Worker", health: 75, damage: 10, isAlive: true },
    { id: "Drone-1", type: "Drone", health: 50, damage: 12, isAlive: true },
  ];

  it("should render a list of bees grouped by type", () => {
    render(<BeeList bees={bees} lastHitBeeId={null} />);
    expect(screen.getByText(/Queen/i)).toBeInTheDocument();
    expect(screen.getByText(/Worker/i)).toBeInTheDocument();
    expect(screen.getByText(/Drone/i)).toBeInTheDocument();
  });

  it("should render each bee with correct health and type", () => {
    render(<BeeList bees={bees} lastHitBeeId={null} />);
    bees.forEach((bee) => {
      expect(
        screen.getByText(`${bee.type} ${bee.health} - HP`)
      ).toBeInTheDocument();
    });
  });
});
