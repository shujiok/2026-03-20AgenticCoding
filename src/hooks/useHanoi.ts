import { useState } from "react";

export interface Disk {
  id: string;
  size: number;
}

export interface HanoiState {
  rods: Disk[][];
  moveCount: number;
}

export interface HanoiHookReturn {
  rods: Disk[][];
  moveCount: number;
  moveDisk: (fromRod: number, toRod: number) => boolean;
  isWon: () => boolean;
  reset: (diskCount: number) => void;
}

export const useHanoi = (initialDiskCount: number): HanoiHookReturn => {
  const [state, setState] = useState<HanoiState>(() => ({
    rods: [
      Array.from({ length: initialDiskCount }, (_, i) => ({
        id: `disk-${initialDiskCount - i}`,
        size: initialDiskCount - i,
      })),
      [],
      [],
    ],
    moveCount: 0,
  }));

  const moveDisk = (fromRod: number, toRod: number): boolean => {
    // バリデーション
    if (
      fromRod < 0 ||
      fromRod > 2 ||
      toRod < 0 ||
      toRod > 2 ||
      fromRod === toRod
    ) {
      return false;
    }

    // 移動元が空か確認
    if (state.rods[fromRod]!.length === 0) {
      return false;
    }

    // 移動元の先端（最後）のディスクを取得
    const diskToMove = state.rods[fromRod]![state.rods[fromRod]!.length - 1]!;

    // 移動先が空でない場合、移動先の先端よりも大きくないか確認
    if (state.rods[toRod]!.length > 0) {
      const topDiskAtDestination =
        state.rods[toRod]![state.rods[toRod]!.length - 1]!;
      if (diskToMove.size > topDiskAtDestination.size) {
        return false;
      }
    }

    // 移動を実行
    setState((prevState) => {
      const newRods = prevState.rods.map((rod) => [...rod]);
      const disk = newRods[fromRod]!.pop();
      if (disk) {
        newRods[toRod]!.push(disk);
      }

      return {
        rods: newRods,
        moveCount: prevState.moveCount + 1,
      };
    });

    return true;
  };

  const isWon = (): boolean => {
    return (
      state.rods[0]!.length === 0 &&
      state.rods[1]!.length === 0 &&
      state.rods[2]!.length > 0
    );
  };

  const reset = (diskCount: number): void => {
    setState({
      rods: [
        Array.from({ length: diskCount }, (_, i) => ({
          id: `disk-${diskCount - i}`,
          size: diskCount - i,
        })),
        [],
        [],
      ],
      moveCount: 0,
    });
  };

  return {
    rods: state.rods,
    moveCount: state.moveCount,
    moveDisk,
    isWon,
    reset,
  };
};
