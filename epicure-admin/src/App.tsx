import { BrowserRouter , Routes, Route } from "react-router-dom";
import Dashboard from "./shared/components/Dashboard";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard/" element={<Dashboard />} />
        <Route path="/dashboard/:collection" element={<Dashboard />} />
      </Routes>
      </BrowserRouter>
  );
};

export default App;
