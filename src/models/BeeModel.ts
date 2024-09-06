import { BeeType } from "../utils/initialBees";

export interface BeeModel {
  id: string;
  type: BeeType;
  health: number;
  damage: number;
  isAlive: boolean;
}
