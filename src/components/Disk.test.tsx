import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Disk } from "./Disk";

describe("Disk コンポーネント", () => {
  it("ディスクを表示する", () => {
    const { container } = render(
      <Disk diskId="disk-1" size={1} onDragStart={vi.fn()} />,
    );
    const disk = container.querySelector('[draggable="true"]');
    expect(disk).toBeInTheDocument();
  });

  it("size prop に基づいて style を設定する", () => {
    const { container } = render(
      <Disk diskId="disk-3" size={3} onDragStart={vi.fn()} />,
    );
    const disk = container.firstChild as HTMLElement;
    expect(disk.style.width).toBeDefined();
    expect(disk.style.backgroundColor).toBeDefined();
  });

  it("draggable 属性が true に設定されている", () => {
    const { container } = render(
      <Disk diskId="disk-2" size={2} onDragStart={vi.fn()} />,
    );
    const disk = container.querySelector("[draggable]");
    expect(disk).toHaveAttribute("draggable", "true");
  });

  it("ディスク番号をラベルとして表示する", () => {
    const { getByText } = render(
      <Disk diskId="disk-1" size={1} onDragStart={vi.fn()} />,
    );
    expect(getByText("1")).toBeInTheDocument();
  });

  it("diskId を data-disk-id 属性として持つ", () => {
    const { container } = render(
      <Disk diskId="disk-5" size={5} onDragStart={vi.fn()} />,
    );
    const disk = container.firstChild as HTMLElement;
    expect(disk).toHaveAttribute("data-disk-id", "disk-5");
  });
});
