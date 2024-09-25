import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Ide from "./pages/Ide";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/ide/:port" Component={Ide} />
      </Routes>
    </>
  );
};

export default App;
