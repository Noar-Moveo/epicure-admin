import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./shared/components/Dashboard";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard/" element={<Dashboard />} />
        <Route path="/dashboard/:collection" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
