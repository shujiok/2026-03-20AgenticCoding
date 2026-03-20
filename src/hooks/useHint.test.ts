import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useHint } from "./useHint";

describe('useHint', () => {
  describe('初期化', () => {
    it('初期状態では hintLevel が 0 であること', () => {
      const { result } = renderHook(() => useHint(3));
      expect(result.current.hintLevel).toBe(0);
    });

    it('初期状態では hint メッセージが空文字列であること', () => {
      const { result } = renderHook(() => useHint(3));
      expect(result.current.hint).toBe('');
    });

    it('diskCount が正しく設定されること', () => {
      const { result } = renderHook(() => useHint(5));
      expect(result.current.diskCount).toBe(5);
    });
  });

  describe('ヒント段階の進行', () => {
    it('nextHintLevel() を順次呼び出して Level 1～4 に進むこと', () => {
      const { result } = renderHook(() => useHint(3));

      act(() => result.current.nextHintLevel()); // Level 1
      expect(result.current.hintLevel).toBe(1);
      expect(result.current.hint).toContain('ロッド');
      expect(result.current.usageCount).toBe(1);

      act(() => result.current.nextHintLevel()); // Level 2
      expect(result.current.hintLevel).toBe(2);
      expect(result.current.hint).toContain('ディスク');
      expect(result.current.usageCount).toBe(2);

      act(() => result.current.nextHintLevel()); // Level 3
      expect(result.current.hintLevel).toBe(3);
      expect(result.current.hint).toContain('移動先');
      expect(result.current.usageCount).toBe(3);

      act(() => result.current.nextHintLevel()); // Level 4
      expect(result.current.hintLevel).toBe(4);
      expect(result.current.hint).toContain('診断');
      expect(result.current.usageCount).toBe(4);
    });

    it('Level 4 を超えてインクリメントされないこと', () => {
      const { result } = renderHook(() => useHint(3));

      act(() => {
        result.current.nextHintLevel(); // 1
        result.current.nextHintLevel(); // 2
        result.current.nextHintLevel(); // 3
        result.current.nextHintLevel(); // 4
        result.current.nextHintLevel(); // 4 (上限チェック用)
      });
      expect(result.current.hintLevel).toBe(4);
    });
  });

  describe('ヒントリセット', () => {
    it('resetHint() で hintLevel と hint がリセットされること', () => {
      const { result } = renderHook(() => useHint(3));

      act(() => result.current.nextHintLevel());
      act(() => result.current.nextHintLevel());
      expect(result.current.hintLevel).toBe(2);

      act(() => result.current.resetHint());
      expect(result.current.hintLevel).toBe(0);
      expect(result.current.hint).toBe('');
    });

    it('resetHint() 後も usageCount は保持されること', () => {
      const { result } = renderHook(() => useHint(3));

      act(() =>result.current.nextHintLevel());
      act(() => result.current.nextHintLevel());
      expect(result.current.usageCount).toBe(2);

      act(() => result.current.resetHint());
      expect(result.current.usageCount).toBe(2);
    });
  });

  describe('複数ラウンド追跡', () => {
    it('resetHint() で logsPerDifficulty に使用回数が記録されること', () => {
      const { result } = renderHook(() => useHint(3));

      act(() => result.current.nextHintLevel());
      act(() => result.current.nextHintLevel());
      
      act(() => result.current.resetHint());
      expect(result.current.logsPerDifficulty[3]).toBe(2);
    });
  });
});
      act(() => {
        result.current.nextHintLevel();
      });
      act(() => {
        result.current.nextHintLevel();
      });
      expect(result.current.usageCount).toBe(2);

      // 難易度を 4 に変更（新ラウンド開始）
      rerender({ diskCount: 4 });
      expect(result.current.usageCount).toBe(0);
      expect(result.current.logsPerDifficulty[3]).toBe(2);
      expect(result.current.logsPerDifficulty[4]).toBe(0);
    });
  });
});
