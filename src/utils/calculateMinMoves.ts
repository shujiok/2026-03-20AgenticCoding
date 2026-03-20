/**
 * ハノイの塔の最小移動回数を計算
 * 公式: 2^n - 1
 * @param diskCount ディスク枚数
 * @returns 最小移動回数
 */
export const calculateMinMoves = (diskCount: number): number => {
  if (diskCount <= 0) {
    return 0;
  }
  return 2 ** diskCount - 1;
};
