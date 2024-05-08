import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./shared/components/Dashboard";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
