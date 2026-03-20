import { useHint } from '../hooks/useHint';
import './HintPanel.css';

interface HintPanelProps {
  diskCount: number;
}

export const HintPanel: React.FC<HintPanelProps> = ({ diskCount }) => {
  const { hintLevel, hint, usageCount, nextHintLevel, resetHint } = useHint(diskCount);

  return (
    <div className="hint-panel">
      <div className="hint-panel__header">
        <h3 className="hint-panel__title">💡 ヒント機能</h3>
        <span className="hint-panel__usage-count">
          使用回数: <strong>{usageCount}</strong>
        </span>
      </div>

      <div className="hint-panel__content">
        {hint && (
          <p className="hint-panel__message">{hint}</p>
        )}
        {!hint && (
          <p className="hint-panel__placeholder">困ったときはヒントボタンを押してね！</p>
        )}
      </div>

      <div className="hint-panel__controls">
        <button
          className="hint-panel__button hint-panel__button--next"
          onClick={nextHintLevel}
          disabled={hintLevel >= 4}
        >
          {hintLevel === 0 ? 'ヒントを表示' : `ヒント Level ${hintLevel + 1}`}
        </button>
        <button
          className="hint-panel__button hint-panel__button--reset"
          onClick={resetHint}
          disabled={hintLevel === 0}
        >
          リセット
        </button>
      </div>

      {hintLevel > 0 && (
        <div className="hint-panel__level-indicator">
          <div className="hint-panel__level-bar">
            {[1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`hint-panel__level-dot ${hintLevel >= level ? 'hint-panel__level-dot--active' : ''}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
