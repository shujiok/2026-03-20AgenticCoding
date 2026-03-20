import "./Disk.css";

interface DiskProps {
  diskId: string;
  size: number;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
}

export const Disk = ({ diskId, size, onDragStart }: DiskProps) => {
  const sizePercentage = (size / 8) * 100; // 最大8枚を想定した幅計算
  const colors = [
    "#FF6B6B", // size 1 - red
    "#FF9F1C", // size 2 - orange
    "#FFBE0B", // size 3 - yellow
    "#4ECDC4", // size 4 - teal
    "#45B7D1", // size 5 - blue
    "#96CEB4", // size 6 - sage
    "#FFEAA7", // size 7 - light yellow
    "#DDA15E", // size 8 - brown
  ];

  const color = colors[size - 1] || colors[0];

  return (
    <div
      className="disk"
      data-disk-id={diskId}
      draggable
      onDragStart={onDragStart}
      style={{
        width: `${sizePercentage}%`,
        backgroundColor: color,
      }}
    >
      <span className="disk-label">{size}</span>
    </div>
  );
};
