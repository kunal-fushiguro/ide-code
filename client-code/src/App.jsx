import { Route, Routes } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
      </Routes>
    </>
  );
};

export default App;
