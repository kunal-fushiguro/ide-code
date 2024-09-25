import { useParams } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Button from "../components/Button";
import Terminal from "../components/Terminal";

const Ide = () => {
  const connected = useRef(null);
  const { port } = useParams();
  const serverUrl = `http://localhost:${port}`;
  async function getFileStructure() {
    try {
      const response = await fetch(serverUrl + "/getfiles");
      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  function writeData(data) {
    connected.current.on("terminal:output", (data) => {
      console.log(data);
    });
    connected.current.emit(
      "terminal:input",
      `ls
`
    );
  }
  useEffect(() => {
    connected.current = io(serverUrl);
    getFileStructure();
  }, []);

  return (
    <>
      <Wrapper>
        hello : {port}
        <Button
          onClick={() => {
            connected.current.emit("listen", { data: "demo" });
          }}
          disable={false}
        >
          click
        </Button>
        <Terminal fn={writeData} />
      </Wrapper>
    </>
  );
};

export default Ide;
