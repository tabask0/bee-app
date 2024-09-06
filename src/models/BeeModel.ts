import { BeeType } from "../utils/initialBees";

export interface BeeModel {
  id: string;
  type: BeeType;
  health: number;
  damage: number;
  isAlive: boolean;
}

export const BeeStats: Record<BeeType, { health: number; damage: number }> = {
  Queen: { health: 100, damage: 8 },
  Worker: { health: 75, damage: 10 },
  Drone: { health: 50, damage: 12 },
};
