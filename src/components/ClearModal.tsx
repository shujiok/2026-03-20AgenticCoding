import "./ClearModal.css";

interface ClearModalProps {
  isWon: boolean;
  moveCount: number;
  minMoves: number;
  onReset: () => void;
}

export const ClearModal = ({
  isWon,
  moveCount,
  minMoves,
  onReset,
}: ClearModalProps) => {
  if (!isWon) {
    return null;
  }

  const isPerfect = moveCount === minMoves;
  const message = isPerfect
    ? "完璧な手順です! 👏"
    : `よくできました! ${Math.round((minMoves / moveCount) * 100)}%の効率です!`;

  return (
    <div className="clear-modal-overlay">
      <div className="clear-modal">
        <h1 className="clear-title">クリア!</h1>
        <div className="clear-content">
          <p className="clear-message">{message}</p>
          <div className="clear-stats">
            <div className="stat-row">
              <span className="stat-label">移動回数:</span>
              <span className="stat-value">{moveCount}回</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">最小回数:</span>
              <span className="stat-value">{minMoves}回</span>
            </div>
          </div>
        </div>
        <button type="button" className="reset-button-modal" onClick={onReset}>
          もう一度やる
        </button>
      </div>
    </div>
  );
};
