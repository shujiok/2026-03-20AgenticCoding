import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DifficultySelector } from "./DifficultySelector";

describe("DifficultySelector コンポーネント", () => {
  it("難易度選択UI を表示する", () => {
    const { container } = render(
      <DifficultySelector selectedDiskCount={3} onDifficultyChange={vi.fn()} />,
    );
    const selector = container.querySelector(".difficulty-selector");
    expect(selector).toBeInTheDocument();
  });

  it("3～8 枚のボタンを表示する", () => {
    render(
      <DifficultySelector selectedDiskCount={3} onDifficultyChange={vi.fn()} />,
    );
    expect(screen.getByText("かんたん")).toBeInTheDocument();
    expect(screen.getByText("ふつう")).toBeInTheDocument();
    expect(screen.getByText("ち難しい")).toBeInTheDocument();
    expect(screen.getByText("とても難しい")).toBeInTheDocument();
    expect(screen.getByText("超難しい")).toBeInTheDocument();
    expect(screen.getByText("究極")).toBeInTheDocument();
  });

  it("ボタンクリックで難易度変更コールバック呼ぶ", () => {
    const mockOnChange = vi.fn();
    render(
      <DifficultySelector
        selectedDiskCount={3}
        onDifficultyChange={mockOnChange}
      />,
    );
    const button = screen.getByText("ふつう");
    fireEvent.click(button);
    expect(mockOnChange).toHaveBeenCalledWith(4);
  });

  it("現在選択されている難易度をハイライトする", () => {
    const { container } = render(
      <DifficultySelector selectedDiskCount={5} onDifficultyChange={vi.fn()} />,
    );
    const buttons = container.querySelectorAll(".difficulty-button");
    const selectedButton = Array.from(buttons).find((btn) =>
      btn.classList.contains("active"),
    );
    expect(selectedButton?.textContent).toContain("ち難しい");
  });

  it("各ボタンが正しいディスク数を持つ", () => {
    const mockOnChange = vi.fn();
    render(
      <DifficultySelector
        selectedDiskCount={3}
        onDifficultyChange={mockOnChange}
      />,
    );
    screen.getByText("究極");
    fireEvent.click(screen.getByText("究極"));
    expect(mockOnChange).toHaveBeenCalledWith(8);
  });
});
