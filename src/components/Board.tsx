import type { Disk as DiskType } from "../hooks/useHanoi";
import { Rod } from "./Rod";
import "./Board.css";

interface BoardProps {
  rods: DiskType[][];
  onDiskMove: (fromRodId: number, toRodId: number) => void;
}

export const Board = ({ rods, onDiskMove }: BoardProps) => {
  const handleDiskDragStart = (diskId: string, fromRodId: number) => {
    // ディスク情報をセッションストレージに保存（簡易的なアプローチ）
    sessionStorage.setItem("draggedDiskId", diskId);
    sessionStorage.setItem("draggedFromRodId", String(fromRodId));
  };

  const handleRodDrop = (fromRodId: number, toRodId: number) => {
    onDiskMove(fromRodId, toRodId);
  };

  return (
    <div className="board">
      <div className="board-rods">
        {rods.map((rodsData, index) => (
          <Rod
            key={
              ["rod-left", "rod-middle", "rod-right"][index] || String(index)
            }
            rodId={index}
            disks={rodsData}
            onDropDisk={handleRodDrop}
            onDiskDragStart={handleDiskDragStart}
          />
        ))}
      </div>
    </div>
  );
};
