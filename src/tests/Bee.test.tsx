import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Bee from "../components/Bee";
import { BeeModel } from "../models/BeeModel";

describe("Bee Component", () => {
  const bee: BeeModel = {
    id: "queen",
    type: "Queen",
    health: 100,
    damage: 8,
    isAlive: true,
  };

  test("renders the Bee component with correct image and health", () => {
    render(<Bee bee={bee} lastHitBeeId={null} />);

    const image = screen.getByAltText(/Queen/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://png.pngtree.com/png-vector/20230808/ourmid/pngtree-queen-bee-vector-png-image_6901979.png"
    );
    expect(screen.getByText(/100 HP/i)).toBeInTheDocument();
  });

  test("shows damage when the bee is hit", async () => {
    render(<Bee bee={bee} lastHitBeeId="queen" />);

    const damageText = screen.getByText(/-8/i);
    expect(damageText).toBeInTheDocument();

    await waitFor(
      () => {
        expect(damageText).not.toBeInTheDocument();
      },
      { timeout: 1200 }
    );
  });

  test("does not show damage when the bee is not hit", () => {
    render(<Bee bee={bee} lastHitBeeId={null} />);

    expect(screen.queryByText(/-8/i)).not.toBeInTheDocument();
  });
});
