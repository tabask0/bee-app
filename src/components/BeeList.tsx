import React from "react";
import Bee from "./Bee";
import { BeeModel } from "../models/BeeModel";

interface BeeListProps {
  bees: BeeModel[];
  lastHitBeeId: string | null;
}

const BeeList: React.FC<BeeListProps> = ({ bees, lastHitBeeId }) => {
  const queen = bees.find((bee) => bee.type === "Queen");
  const workers = bees.filter((bee) => bee.type === "Worker");
  const drones = bees.filter((bee) => bee.type === "Drone");
  console.log(lastHitBeeId);

  return (
    <div className="bee-container">
      <div className="queen-section">
        {queen && <Bee bee={queen} lastHitBeeId={lastHitBeeId} />}
      </div>
      <div className="worker-drone-section">
        <div className="worker-row">
          {workers.map((worker) => (
            <Bee key={worker.id} bee={worker} lastHitBeeId={lastHitBeeId} />
          ))}
        </div>
        <div className="drone-row">
          {drones.map((drone) => (
            <Bee key={drone.id} bee={drone} lastHitBeeId={lastHitBeeId} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BeeList;
