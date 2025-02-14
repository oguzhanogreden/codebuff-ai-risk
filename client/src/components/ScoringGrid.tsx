import { useState } from "react";

interface ScoringGridProps {
  rows: number;
  cols: number;
}

export function ScoringGrid({ rows, cols }: ScoringGridProps) {
  const initialGrid = Array(rows).fill(null).map(() => Array(cols).fill(0));
  const [grid, setGrid] = useState(initialGrid);
  const [bankStars, setBankStars] = useState(101);
  const [dragOverCell, setDragOverCell] = useState<string | null>(null);

  const handleGridDragStart = (e: React.DragEvent, row: number, col: number) => {
    if (grid[row][col] > 0) {
      e.dataTransfer.setData("text/plain", `grid-${row}-${col}`);
    }
  };

  const handleGridDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleGridDrop = (e: React.DragEvent, targetRow: number, targetCol: number) => {
    e.preventDefault();
    setDragOverCell(null);
    const data = e.dataTransfer.getData("text/plain");
    const newGrid = grid.map((row) => [...row]);
    if (data === "bank") {
      if (bankStars > 0) {
        newGrid[targetRow][targetCol]++;
        setBankStars(bankStars - 1);
      }
    } else if (data.startsWith("grid-")) {
      const parts = data.split("-");
      const sourceRow = parseInt(parts[1], 10);
      const sourceCol = parseInt(parts[2], 10);
      if (newGrid[sourceRow][sourceCol] > 0) {
        newGrid[sourceRow][sourceCol]--;
        newGrid[targetRow][targetCol]++;
      }
    }
    setGrid(newGrid);
  };

  const handleGridDragEnter = (row: number, col: number) => {
    setDragOverCell(`${row}-${col}`);
  };

  const handleGridDragLeave = () => {
    setDragOverCell(null);
  };

  const handleBankDragStart = (e: React.DragEvent) => {
    if (bankStars > 0) {
      e.dataTransfer.setData("text/plain", "bank");
    }
  };

  const handleBankDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    if (data.startsWith("grid-")) {
      const parts = data.split("-");
      const sourceRow = parseInt(parts[1], 10);
      const sourceCol = parseInt(parts[2], 10);
      const newGrid = grid.map((row) => [...row]);
      if (newGrid[sourceRow][sourceCol] > 0) {
        newGrid[sourceRow][sourceCol]--;
        setBankStars(bankStars + 1);
        setGrid(newGrid);
      }
    }
  };

  const handleBankDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const renderStars = (count: number) => "⭐".repeat(count);

  return (
    <div className="scoring-grid-container">
      <table className="grid-table">
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((count, colIndex) => {
                const cellKey = `${rowIndex}-${colIndex}`;
                return (
                  <td 
                    key={cellKey}
                    className={`cell ${dragOverCell === cellKey ? "drag-over" : ""}`}
                    draggable={count > 0}
                    onDragStart={(e) => handleGridDragStart(e, rowIndex, colIndex)}
                    onDragOver={handleGridDragOver}
                    onDrop={(e) => handleGridDrop(e, rowIndex, colIndex)}
                    onDragEnter={() => handleGridDragEnter(rowIndex, colIndex)}
                    onDragLeave={handleGridDragLeave}
                  >
                    {renderStars(count)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className="score-bank"
        onDragOver={handleBankDragOver}
        onDrop={handleBankDrop}
      >
        {Array.from({ length: bankStars }).map((_, i) => (
          <div
            key={i}
            className="score-icon"
            draggable
            onDragStart={handleBankDragStart}
          >
            ⭐
          </div>
        ))}
      </div>
    </div>
  );
}
