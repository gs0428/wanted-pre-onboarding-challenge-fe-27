import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/layout";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" />} />
      <Route path="/" element={<Layout />}>
        <Route path="auth" element={<Login />} />
        <Route path="auth/signup" element={<Signup />} />
        <Route path="todos" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
