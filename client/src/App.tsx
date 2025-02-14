import { useState } from "react";
import "./App.css";

function App() {
  // Create a 5x4 grid with initial count of 1 star per cell
  const initialGrid = Array(4)
    .fill(null)
    .map(() => Array(5).fill(1));
  const [grid, setGrid] = useState(initialGrid);
  const [dragOverCell, setDragOverCell] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, row: number, col: number) => {
    if (grid[row][col] > 0) {
      e.dataTransfer.setData("text/plain", `${row}-${col}`);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetRow: number, targetCol: number) => {
    e.preventDefault();
    setDragOverCell(null);

    const sourceData = e.dataTransfer.getData("text/plain");
    const [sourceRowStr, sourceColStr] = sourceData.split("-");
    const sourceRow = parseInt(sourceRowStr, 10);
    const sourceCol = parseInt(sourceColStr, 10);

    // Create a copy of the grid
    const newGrid = grid.map((row) => [...row]);

    // Subtract from source, add to target
    newGrid[sourceRow][sourceCol]--;
    newGrid[targetRow][targetCol]++;

    setGrid(newGrid);
  };

  const handleDragEnter = (row: number, col: number) => {
    setDragOverCell(`${row}-${col}`);
  };

  const handleDragLeave = () => {
    setDragOverCell(null);
  };

  const renderStars = (count: number) => {
    return "⭐".repeat(count);
  };

  return (
    <div className="container">
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
                    onDragStart={(e) => handleDragStart(e, rowIndex, colIndex)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, rowIndex, colIndex)}
                    onDragEnter={() => handleDragEnter(rowIndex, colIndex)}
                    onDragLeave={handleDragLeave}
                  >
                    {renderStars(count)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
