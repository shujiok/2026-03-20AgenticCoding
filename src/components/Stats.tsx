import { calculateMinMoves } from "../utils/calculateMinMoves";
import "./Stats.css";

interface StatsProps {
  moveCount: number;
  diskCount: number;
}

export const Stats = ({ moveCount, diskCount }: StatsProps) => {
  const minMoves = calculateMinMoves(diskCount);
  const efficiency =
    moveCount > 0
      ? parseFloat(((minMoves / moveCount) * 100).toFixed(1))
      : 0;

  return (
    <div className="stats">
      <h2>統計情報</h2>
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-label">ディスク枚数:</span>
          <span className="stat-value">{diskCount}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">現在の移動数:</span>
          <span className="stat-value">{moveCount}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">最小移動数:</span>
          <span className="stat-value">{minMoves}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">効率率:</span>
          <span className={`stat-value ${efficiency === 100 ? "perfect" : ""}`}>
            {efficiency}%
          </span>
        </div>
      </div>
      {moveCount === minMoves && moveCount > 0 && (
        <p className="perfect-message">完璧な手順です! 👏</p>
      )}
    </div>
  );
};
