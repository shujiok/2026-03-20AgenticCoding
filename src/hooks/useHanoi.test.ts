import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useHanoi } from "./useHanoi";

describe("useHanoi", () => {
  describe("初期状態", () => {
    it("3枚のディスクで初期化される", () => {
      const { result } = renderHook(() => useHanoi(3));
      expect(result.current.rods[0]).toHaveLength(3);
      expect(result.current.rods[1]).toHaveLength(0);
      expect(result.current.rods[2]).toHaveLength(0);
    });

    it("大きい順（サイズ高い順）に第1棒に積み重ねられている", () => {
      const { result } = renderHook(() => useHanoi(3));
      const disks = result.current.rods[0]!;
      expect(disks[0]!.size).toBe(3); // 一番下（大きい）
      expect(disks[1]!.size).toBe(2);
      expect(disks[2]!.size).toBe(1); // 一番上（小さい）
    });

    it("移動回数は 0 で開始", () => {
      const { result } = renderHook(() => useHanoi(3));
      expect(result.current.moveCount).toBe(0);
    });

    it("各ディスクは一意な ID を持つ", () => {
      const { result } = renderHook(() => useHanoi(3));
      const allDisks = result.current.rods.flat();
      const ids = allDisks.map((d) => d.id);
      expect(new Set(ids).size).toBe(allDisks.length);
    });
  });

  describe("ディスク移動", () => {
    it("有効な移動が成功する", () => {
      const { result } = renderHook(() => useHanoi(3));
      act(() => {
        result.current.moveDisk(0, 1);
      });
      expect(result.current.rods[0]).toHaveLength(2);
      expect(result.current.rods[1]).toHaveLength(1);
      expect(result.current.rods[1]![0]!.size).toBe(1);
    });

    it("移動回数がインクリメントされる", () => {
      const { result } = renderHook(() => useHanoi(3));
      expect(result.current.moveCount).toBe(0);
      act(() => {
        result.current.moveDisk(0, 1);
      });
      expect(result.current.moveCount).toBe(1);
      act(() => {
        result.current.moveDisk(1, 2);
      });
      expect(result.current.moveCount).toBe(2);
    });

    it("より小さいディスクの上に大きいディスクは移動できない（失敗）", () => {
      const { result } = renderHook(() => useHanoi(3));
      // 最小の（サイズ1の）ディスクを第2棒に移動
      act(() => {
        result.current.moveDisk(0, 1);
      });
      // サイズ2のディスクを第1棒の先端から第2棒に移動しようとしたら失敗
      const initialRod0Length = result.current.rods[0]!.length;
      act(() => {
        const success = result.current.moveDisk(0, 1);
        expect(success).toBe(false);
      });
      expect(result.current.rods[0]).toHaveLength(initialRod0Length);
      expect(result.current.moveCount).toBe(1); // インクリメント されない
    });

    it("空の棒から移動することはできない", () => {
      const { result } = renderHook(() => useHanoi(3));
      const initialMoveCount = result.current.moveCount;
      act(() => {
        const success = result.current.moveDisk(1, 0);
        expect(success).toBe(false);
      });
      expect(result.current.moveCount).toBe(initialMoveCount);
    });
  });

  describe("勝利判定", () => {
    it("全ディスクが第3棒に移動したらゲーム完了", () => {
      const { result } = renderHook(() => useHanoi(3));
      // ハノイの塔の正解手順（3枚）- 各移動を別の act() で実行
      act(() => {
        result.current.moveDisk(0, 2); // disk1: 0 -> 2
      });
      act(() => {
        result.current.moveDisk(0, 1); // disk2: 0 -> 1
      });
      act(() => {
        result.current.moveDisk(2, 1); // disk1: 2 -> 1
      });
      act(() => {
        result.current.moveDisk(0, 2); // disk3: 0 -> 2
      });
      act(() => {
        result.current.moveDisk(1, 0); // disk1: 1 -> 0
      });
      act(() => {
        result.current.moveDisk(1, 2); // disk2: 1 -> 2
      });
      act(() => {
        result.current.moveDisk(0, 2); // disk1: 0 -> 2
      });
      // 最終状態を確認
      expect(result.current.rods[0]).toHaveLength(0);
      expect(result.current.rods[1]).toHaveLength(0);
      expect(result.current.rods[2]).toHaveLength(3);
      expect(result.current.isWon()).toBe(true);
    });

    it("ディスクがすべて第3棒にない場合は勝利ではない", () => {
      const { result } = renderHook(() => useHanoi(3));
      expect(result.current.isWon()).toBe(false);
      act(() => {
        result.current.moveDisk(0, 2);
      });
      expect(result.current.isWon()).toBe(false); // 1枚だけでは勝利ではない
    });
  });

  describe("リセット機能", () => {
    it("リセット後、ディスク数が変更される", () => {
      const { result } = renderHook(() => useHanoi(3));
      act(() => {
        result.current.reset(4);
      });
      const totalDisks = result.current.rods.reduce(
        (sum, rod) => sum + rod.length,
        0,
      );
      expect(totalDisks).toBe(4);
    });

    it("リセット後、移動回数が 0 にリセットされる", () => {
      const { result } = renderHook(() => useHanoi(3));
      act(() => {
        result.current.moveDisk(0, 1);
      });
      expect(result.current.moveCount).toBe(1);
      act(() => {
        result.current.reset(3);
      });
      expect(result.current.moveCount).toBe(0);
    });

    it("リセット後、すべてのディスクが第1棒に積み重ねられる", () => {
      const { result } = renderHook(() => useHanoi(3));
      act(() => {
        result.current.reset(5);
      });
      expect(result.current.rods[0]).toHaveLength(5);
      expect(result.current.rods[1]).toHaveLength(0);
      expect(result.current.rods[2]).toHaveLength(0);
    });
  });
});
