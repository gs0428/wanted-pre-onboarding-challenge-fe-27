import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "@components/layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
