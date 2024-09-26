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

  function inputDataOnTerminal(data) {
    if (connected.current) {
      connected.current.emit("terminal:input", data);
      // connected.current.on("terminal:output", (data) => {
      //   console.log(data);
      // });
    }
  }

  function outputDataOnTerminal(cb) {
    console.log("hello");
    if (connected.current) {
      connected.current.on("terminal:output", cb);
    }
  }

  useEffect(() => {
    connected.current = io(serverUrl);
    connected.current.on("connect", () => {
      getFileStructure();
    });

    return () => {
      if (connected.current) {
        connected.current.disconnect();
      }
    };
  }, [serverUrl]);

  return (
    <Wrapper>
      hello : {port}
      <Button
        onClick={() => {
          if (connected.current) {
            connected.current.emit("listen", { data: "demo" });
          }
        }}
        disable={false}
      >
        click
      </Button>
      <Terminal input={inputDataOnTerminal} output={outputDataOnTerminal} />
    </Wrapper>
  );
};

export default Ide;