import { useState } from "react";
import "./App.css";
import { Board } from "./components/Board";
import { ClearModal } from "./components/ClearModal";
import { DifficultySelector } from "./components/DifficultySelector";
import { HintPanel } from "./components/HintPanel";
import { Stats } from "./components/Stats";
import { useHanoi } from "./hooks/useHanoi";
import { calculateMinMoves } from "./utils/calculateMinMoves";

function App() {
  const [diskCount, setDiskCount] = useState(3);
  const { rods, moveCount, moveDisk, isWon, reset } = useHanoi(diskCount);
  const minMoves = calculateMinMoves(diskCount);

  const handleDifficultyChange = (value: number) => {
    setDiskCount(value);
    reset(value);
  };

  const handleReset = () => {
    reset(diskCount);
  };

  return (
    <main className="app">
      <div className="app-container">
        <h1>ハノイの塔 - 小学生向け</h1>
        <p className="subtitle">ディスクを移動させてパズルをクリアしよう!</p>

        <DifficultySelector
          selectedDiskCount={diskCount}
          onDifficultyChange={handleDifficultyChange}
        />

        <div className="game-area">
          <Board rods={rods} onDiskMove={moveDisk} />
          <aside className="sidebar">
            <Stats moveCount={moveCount} diskCount={diskCount} />
            <HintPanel diskCount={diskCount} />
            <button
              type="button"
              className="reset-button"
              onClick={handleReset}
            >
              もう一度やる
            </button>
          </aside>
        </div>

        <section className="rules">
          <h2>ルール</h2>
          <ul>
            <li>3本の棒がある</li>
            <li>大きいディスクは小さいディスクの下にしか置けない</li>
            <li>すべてのディスクを右の棒に移動させたらクリア!</li>
          </ul>
        </section>
      </div>

      <ClearModal
        isWon={isWon()}
        moveCount={moveCount}
        minMoves={minMoves}
        onReset={handleReset}
      />
    </main>
  );
}

export default App;
