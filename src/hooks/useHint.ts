import { useState } from "react";

export interface HintState {
  hintLevel: number;
  hint: string;
  usageCount: number;
  diskCount: number;
  logsPerDifficulty: Record<number, number>;
  nextHintLevel: () => void;
  resetHint: () => void;
}

const generateHint = (level: number, diskCount: number): string => {
  const hints = [
    "",
    "💡 ヒント Level 1: 移動元のロッド番号を考えてみましょう。(ロッド 0, 1, 2 のいずれか)",
    "💡 ヒント Level 2: 移動するディスクを選んでみましょう。",
    "💡 ヒント Level 3: 移動先のロッドはどこがいいか考えてみましょう。",
    `💡 診断: ゲーム状態を確認してください。現在のディスク枚数: ${diskCount} 枚。理論上の最小手数は ${2 ** diskCount - 1} 手です。`,
  ];
  return hints[level] || "";
};

export const useHint = (diskCount: number): HintState => {
  const [state, setState] = useState({
    hintLevel: 0,
    usageCount: 0,
    logsPerDifficulty: {} as Record<number, number>,
  });

  const nextHintLevel = () => {
    setState((prev) => ({
      hintLevel: Math.min(prev.hintLevel + 1, 4),
      usageCount: prev.usageCount + 1,
      logsPerDifficulty: prev.logsPerDifficulty,
    }));
  };

  const resetHint = () => {
    setState((prev) => ({
      hintLevel: 0,
      usageCount: prev.usageCount,
      logsPerDifficulty: {
        ...prev.logsPerDifficulty,
        [diskCount]: prev.usageCount,
      },
    }));
  };

  return {
    hintLevel: state.hintLevel,
    hint: generateHint(state.hintLevel, diskCount),
    usageCount: state.usageCount,
    diskCount,
    logsPerDifficulty: state.logsPerDifficulty,
    nextHintLevel,
    resetHint,
  };
};
