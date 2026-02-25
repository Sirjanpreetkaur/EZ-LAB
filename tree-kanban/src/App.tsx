import { Routes, Route, Link } from "react-router-dom";
import TreeView from "./components/Tree/TreeView";
import KanbanBoard from "./components/Kanban/Kanban";

function App() {
  return (
    <div className="app-cover">
      <Link to="/tree" style={{ marginRight: 20 }}>Tree View</Link>
      <Link to="/kanban">Kanban Board</Link>
      <Routes>
        <Route path="/tree" element={<TreeView />} />
        <Route path="/kanban" element={<KanbanBoard />} />
      </Routes>
    </div>
  );
}

export default App;