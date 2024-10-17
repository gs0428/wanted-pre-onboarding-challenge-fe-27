import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" />} />
      <Route path="/" element={<Layout />}>
        <Route path="auth" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
