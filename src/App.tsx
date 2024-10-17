import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/layout";
import Signup from "./pages/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" />} />
      <Route path="/" element={<Layout />}>
        <Route path="auth" element={<Home />} />
        <Route path="auth/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}

export default App;
