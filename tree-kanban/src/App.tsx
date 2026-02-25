import { Routes, Route, NavLink } from "react-router-dom";
import "./index.css";  
import TreeView from "./components/Tree/TreeView";
import KanbanBoard from "./components/Kanban/KanbanBoard";


function App() {
  return (
    <div className="app-cover">
      <div className="tabs">
        <NavLink
          to="/tree"
          className={({ isActive }) => (isActive ? "tab active" : "tab")}
        >
          Tree View
        </NavLink>

        <NavLink
          to="/kanban"
          className={({ isActive }) => (isActive ? "tab active" : "tab")}
        >
          Kanban Board
        </NavLink>
      </div>

      <Routes>
        <Route path="/tree" element={<TreeView />} />
        <Route path="/kanban" element={<KanbanBoard />} />
      </Routes>
    </div>
  );
}

export default App;