import "./App.css";
import { GridContainer } from "./components/GridContainer.tsx";

function App() {
  return (
    <div className="container">
      <GridContainer rows={5} cols={5} />
    </div>
  );
}

export default App;
