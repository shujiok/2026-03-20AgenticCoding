import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { Disk as DiskType } from "../hooks/useHanoi";
import { Rod } from "./Rod";

describe("Rod コンポーネント", () => {
  const mockDisks: DiskType[] = [
    { id: "disk-3", size: 3 },
    { id: "disk-2", size: 2 },
    { id: "disk-1", size: 1 },
  ];

  it("棒を表示する", () => {
    const { container } = render(
      <Rod
        rodId={0}
        disks={[]}
        onDropDisk={vi.fn()}
        onDiskDragStart={vi.fn()}
      />,
    );
    const rod = container.querySelector(".rod");
    expect(rod).toBeInTheDocument();
  });

  it("ディスクを積み重ねて表示する", () => {
    const { container } = render(
      <Rod
        rodId={0}
        disks={mockDisks}
        onDropDisk={vi.fn()}
        onDiskDragStart={vi.fn()}
      />,
    );
    const diskElements = container.querySelectorAll(".disk");
    expect(diskElements).toHaveLength(3);
  });

  it("data-rod-id 属性を正しく設定する", () => {
    const { container } = render(
      <Rod
        rodId={2}
        disks={[]}
        onDropDisk={vi.fn()}
        onDiskDragStart={vi.fn()}
      />,
    );
    const rod = container.querySelector(".rod");
    expect(rod).toHaveAttribute("data-rod-id", "2");
  });

  it("空の棒を表示する", () => {
    const { container } = render(
      <Rod
        rodId={1}
        disks={[]}
        onDropDisk={vi.fn()}
        onDiskDragStart={vi.fn()}
      />,
    );
    const diskElements = container.querySelectorAll(".disk");
    expect(diskElements).toHaveLength(0);
  });

  it("棒のポール（軸）を表示する", () => {
    const { container } = render(
      <Rod
        rodId={0}
        disks={[]}
        onDropDisk={vi.fn()}
        onDiskDragStart={vi.fn()}
      />,
    );
    const pole = container.querySelector(".rod-pole");
    expect(pole).toBeInTheDocument();
  });
});
