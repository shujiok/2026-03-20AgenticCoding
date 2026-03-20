import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ClearModal } from "./ClearModal";

describe("ClearModal コンポーネント", () => {
  it("isWon が true の時に表示される", () => {
    const { container } = render(
      <ClearModal isWon={true} moveCount={7} minMoves={7} onReset={vi.fn()} />,
    );
    const modal = container.querySelector(".clear-modal");
    expect(modal).toBeInTheDocument();
  });

  it("isWon が false の時は表示されない", () => {
    const { container } = render(
      <ClearModal isWon={false} moveCount={5} minMoves={7} onReset={vi.fn()} />,
    );
    const modal = container.querySelector(".clear-modal");
    expect(modal).not.toBeInTheDocument();
  });

  it("クリアメッセージを表示する", () => {
    render(
      <ClearModal isWon={true} moveCount={7} minMoves={7} onReset={vi.fn()} />,
    );
    expect(screen.getByText("クリア!")).toBeInTheDocument();
    expect(screen.getByText("完璧な手順です! 👏")).toBeInTheDocument();
  });

  it("移動回数を表示する", () => {
    render(
      <ClearModal isWon={true} moveCount={9} minMoves={7} onReset={vi.fn()} />,
    );
    expect(screen.getByText(/9回/)).toBeInTheDocument();
  });

  it("完璧ではない場合、別のメッセージを表示", () => {
    render(
      <ClearModal isWon={true} moveCount={10} minMoves={7} onReset={vi.fn()} />,
    );
    expect(screen.getByText(/よくできました!/)).toBeInTheDocument();
  });

  it("リセットボタンクリックでコールバック呼び出し", () => {
    const mockOnReset = vi.fn();
    render(
      <ClearModal
        isWon={true}
        moveCount={7}
        minMoves={7}
        onReset={mockOnReset}
      />,
    );
    const resetButton = screen.getByText("もう一度やる");
    resetButton.click();
    expect(mockOnReset).toHaveBeenCalled();
  });

  it("モーダルレイヤーを表示する", () => {
    const { container } = render(
      <ClearModal isWon={true} moveCount={7} minMoves={7} onReset={vi.fn()} />,
    );
    const overlay = container.querySelector(".clear-modal-overlay");
    expect(overlay).toBeInTheDocument();
  });
});
