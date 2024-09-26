import { useParams } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Button from "../components/Button";
import Terminal from "../components/Terminal";
import FileExplorer from "../components/FileExplorer";

const Ide = () => {
  const [connectedSocket, setConnectedSocket] = useState(null); // use state to track the socket
  const { port } = useParams();
  const serverUrl = `http://localhost:${port}`;
  const [files, setFiles] = useState();
  const [loading, setLoading] = useState(true);

  async function getFileStructure() {
    try {
      const response = await fetch(serverUrl + "/getfiles");
      const data = await response.json();
      setFiles(data.data.tree);
      console.log(files, data.data.tree);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  function inputDataOnTerminal(data) {
    if (connectedSocket) {
      connectedSocket.emit("terminal:input", data);
    }
  }

  if (connectedSocket?.on) {
    connectedSocket.on("file:changes", (data) => {
      if (data) {
        getFileStructure();
      }
    });
  }

  function outputDataOnTerminal(cb) {
    if (connectedSocket) {
      connectedSocket.on("terminal:output", (data) => {
        console.log(data);
        cb(data);
      });
    }
  }

  useEffect(() => {
    if (connectedSocket) {
      return;
    }
    const socket = io(serverUrl);
    setConnectedSocket(socket);
    socket.on("connect", () => {
      getFileStructure();
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [serverUrl]);

  return (
    <>
      <Wrapper>
        {!loading && <FileExplorer structure={files} key={1} />}

        <Terminal input={inputDataOnTerminal} output={outputDataOnTerminal} />
      </Wrapper>
    </>
  );
};

export default Ide;
