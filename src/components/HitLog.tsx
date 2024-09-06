import React, { useEffect, useRef } from "react";

interface LogEntry {
  id: string;
  type: string;
  number: number;
  damage: number;
}

interface HitLogProps {
  logs: LogEntry[];
}

const HitLog: React.FC<HitLogProps> = ({ logs }) => {
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="hit-log" ref={logRef}>
      <h3>Hit Logs</h3>
      <ul>
        {logs?.map((log, index) => (
          <li key={index}>
            {log.type} {log.number + 1} - {log.damage} damage
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HitLog;
