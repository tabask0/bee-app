import React, { useState, useEffect } from "react";
import { BeeModel } from "../models/BeeModel";

interface BeeProps {
  bee: BeeModel;
  lastHitBeeId: string | null;
}

const Bee: React.FC<BeeProps> = ({ bee, lastHitBeeId }) => {
  const [showDamage, setShowDamage] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (bee.id === lastHitBeeId) {
      // Reset showDamage to handle consecutive hits correctly
      setShowDamage(false);
      setTimeout(() => setShowDamage(true), 0); // Delay to re-trigger the effect

      // Hide damage after 500ms
      timeout = setTimeout(() => setShowDamage(false), 500);
    } else {
      setShowDamage(false);
    }

    // Cleanup timeout on component unmount or effect rerun
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
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
      {showDamage && (
        <img
          style={{ position: "absolute", display: "block", zIndex: 1 }}
          alt="hit-damage"
          width={50}
          height={50}
          src="https://static.vecteezy.com/system/resources/previews/024/801/325/non_2x/punch-comic-explosion-with-red-and-yellow-colors-fighting-text-comic-blast-with-clouds-and-stars-text-bubbles-for-cartoons-free-png.png"
        />
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
        <div style={{ width: "60px" }}>
          {bee.type}
          <div>{bee.isAlive ? bee.health : "0"} HP</div>
        </div>

        {showDamage && <span className="damage">-{bee.damage}</span>}
      </div>
    </div>
  );
};

export default Bee;
