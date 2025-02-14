import { useState } from "react";
import "./App.css";

function App() {
  // Create a 5x4 grid data structure
  const initialGrid = Array(4).fill(null).map(() => Array(5).fill(null));
  const [grid] = useState(initialGrid);
      
  return (
    <div className="container">
      <table className="grid-table">
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((_, colIndex) => (
                <td key={`${rowIndex}-${colIndex}`}>
                  {/* Cell content will go here later */}
                  {`${rowIndex},${colIndex}`}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
