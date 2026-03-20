import type { Disk as DiskType } from "../hooks/useHanoi";
import { Disk } from "./Disk";
import "./Rod.css";

interface RodProps {
  rodId: number;
  disks: DiskType[];
  onDropDisk: (fromRodId: number, toRodId: number) => void;
  onDiskDragStart: (diskId: string, fromRodId: number) => void;
}

export const Rod = ({
  rodId,
  disks,
  onDropDisk,
  onDiskDragStart,
}: RodProps) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // ドロップを許可するため必須
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const fromRodId = Number.parseInt(e.dataTransfer.getData("fromRodId"));
    onDropDisk(fromRodId, rodId);
  };

  const handleDiskDragStart = (diskId: string) => {
    return (e: React.DragEvent<HTMLDivElement>) => {
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("diskId", diskId);
      e.dataTransfer.setData("fromRodId", String(rodId));
      onDiskDragStart(diskId, rodId);
    };
  };

  return (
    <div
      className="rod"
      data-rod-id={rodId}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="rod-pole" />
      <div className="rod-disks">
        {[...disks].reverse().map((disk) => (
          <Disk
            key={disk.id}
            diskId={disk.id}
            size={disk.size}
            onDragStart={handleDiskDragStart(disk.id)}
          />
        ))}
      </div>
    </div>
  );
};
