import { BeeModel } from "../models/BeeModel";

export type BeeType = "Queen" | "Worker" | "Drone";

interface BeeAttributes {
  health: number;
  damage: number;
}

const BeeStats = {
  Queen: { health: 100, damage: 8 },
  Worker: { health: 75, damage: 10 },
  Drone: { health: 50, damage: 12 },
};

const createBees = (
  type: BeeType,
  count: number,
  stats: BeeAttributes
): BeeModel[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `${type.toLowerCase()}-${i}`,
    type,
    health: stats.health,
    damage: stats.damage,
    isAlive: true,
  }));

const initialBees = (): BeeModel[] => [
  ...createBees("Queen", 1, BeeStats.Queen),
  ...createBees("Worker", 5, BeeStats.Worker),
  ...createBees("Drone", 8, BeeStats.Drone),
];

export default initialBees;
