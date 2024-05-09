import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./shared/components/Dashboard";
import { ROUTES } from "./shared/constants/ROUTES.dashboard";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.dashboard} element={<Dashboard />} />
        <Route path={ROUTES.collection} element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
