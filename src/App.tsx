import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Layout from "./components/layout";
import Signup from "./pages/signup";
import Home from "./pages/home";

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
