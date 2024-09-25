import { useState } from "react";
import Box from "../components/Box";
import Button from "../components/Button";
import Wrapper from "../components/Wrapper";
import ContainerList from "../components/ContainerList";
import { useEffect } from "react";

const Home = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = "http://localhost:3030/api/list";
  async function getListOfContainer() {
    try {
      setLoading(true);
      const response = await fetch(url, {});
      const data = await response.json();
      setList(data.data.listContainer);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  useEffect(() => {
    getListOfContainer();
  }, []);

  async function createNewContainer() {
    try {
      const url = "http://localhost:3030/api/create";

      const response = await fetch(url);
      const data = response.json();

      console.log(data);
      await getListOfContainer();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Wrapper>
      <h1 className="text-4xl font-bold text-center mb-8 mt-8">
        Mujhe bhi nhi pata kya likhu
      </h1>
      <Box>
        <h2 className="text-xl font-semibold  text-center">Code-Space</h2>
        <div className="flex flex-col gap-4 items-center">
          <Button onClick={createNewContainer}>
            Create a new Node.js Container
          </Button>
        </div>
      </Box>
      {loading && <div>Loading .......</div>}
      {!loading && (
        <ContainerList containers={list} refresh={getListOfContainer} />
      )}
    </Wrapper>
  );
};

export default Home;
