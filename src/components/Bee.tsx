import React, { useState, useEffect } from "react";
import { BeeModel } from "../models/BeeModel";

interface BeeProps {
  bee: BeeModel;
  lastHitBeeId: string | null;
}

const Bee: React.FC<BeeProps> = ({ bee, lastHitBeeId }) => {
  const [showDamage, setShowDamage] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (bee.id === lastHitBeeId) {
      setShowDamage(true);
      timeout = setTimeout(() => setShowDamage(false), 700);
    } else {
      setShowDamage(false);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [lastHitBeeId, bee.id]);

  const beeImages = {
    Queen:
      "https://png.pngtree.com/png-vector/20230808/ourmid/pngtree-queen-bee-vector-png-image_6901979.png",
    Worker:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU92CAfJLErsI4BSU3xmReoMXkiYgMas-C_g&s",
    Drone:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/201812_Drone_bee.svg/1024px-201812_Drone_bee.svg.png",
  };

  return (
    <div className={`bee ${bee.isAlive ? "alive" : "dead"}`}>
      {!bee.isAlive && (
        <div>
          <div className="line-1"></div>
          <div className="line-2"></div>
        </div>
      )}

      <img
        src={beeImages[bee.type]}
        alt={`${bee.type}`}
        className="bee-image"
        style={{ transform: !bee.isAlive ? "rotate(180deg)" : "" }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span style={{ width: "60px" }}>
          {bee.type}
          {bee.isAlive ? bee.health : "0"} HP
        </span>

        <p>{showDamage && <span className="damage"> -{bee.damage}</span>}</p>
      </div>
    </div>
  );
};

export default Bee;
