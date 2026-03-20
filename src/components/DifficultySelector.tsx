import "./DifficultySelector.css";

interface DifficultyOption {
  label: string;
  diskCount: number;
}

interface DifficultySelectorProps {
  selectedDiskCount: number;
  onDifficultyChange: (diskCount: number) => void;
}

const DIFFICULTY_OPTIONS: DifficultyOption[] = [
  { label: "かんたん", diskCount: 3 },
  { label: "ふつう", diskCount: 4 },
  { label: "ち難しい", diskCount: 5 },
  { label: "とても難しい", diskCount: 6 },
  { label: "超難しい", diskCount: 7 },
  { label: "究極", diskCount: 8 },
];

export const DifficultySelector = ({
  selectedDiskCount,
  onDifficultyChange,
}: DifficultySelectorProps) => {
  return (
    <div className="difficulty-selector">
      <h3>難易度を選ぶ</h3>
      <div className="difficulty-buttons">
        {DIFFICULTY_OPTIONS.map((option) => (
          <button
            key={option.diskCount}
            type="button"
            className={`difficulty-button ${
              selectedDiskCount === option.diskCount ? "active" : ""
            }`}
            onClick={() => onDifficultyChange(option.diskCount)}
          >
            {option.label}
            <span className="disk-count">({option.diskCount}枚)</span>
          </button>
        ))}
      </div>
    </div>
  );
};
