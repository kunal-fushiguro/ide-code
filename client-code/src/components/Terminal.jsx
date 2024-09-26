import { useRef, useEffect, useState } from "react";
import { Terminal as xterm } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";

const Terminal = ({ input, output }) => {
  const terminalRef = useRef(null);
  const term = useRef(false);

  useEffect(() => {
    if (!term) {
      term.current = new xterm({
        cursorBlink: true,
        rows: 30,
        cols: 100,
        theme: {
          foreground: "#ffffff",
          background: "#1e1e1e",
          cursor: "#00ff00",
          selection: "rgba(255,255,255,0.3)",
        },
      });

      term.current.open(terminalRef.current);

      // term.current.onData((data) => {
      //   console.log(data);

      //   input(data);
      // });

      // const writeData = (data) => {
      //   console.log(data);

      //   term.current.write(data);
      // };

      // output(writeData);

      const fitTerminal = () => {
        const container = terminalRef.current;
        const { clientWidth, clientHeight } = container;
        term.current.resize(
          Math.floor(clientWidth / 8),
          Math.floor(clientHeight / 18)
        );
      };

      fitTerminal();

      window.addEventListener("resize", fitTerminal);

      return () => {
        window.removeEventListener("resize", fitTerminal);
        term.current.dispose();
      };
    }
  }, []);

  if (term.current.onData) {
    term.current.onData((data) => {
      console.log(data);

      input(data);
    });
  }
  if (term) {
    const writeData = (data) => {
      console.log(data);

      term.current?.write(data);
    };

    output(writeData);
  }

  return (
    <div
      ref={terminalRef}
      style={{
        width: "100%",
        height: "50%",
        backgroundColor: "#1e1e1e",
        paddingTop: "5px",
      }}
    ></div>
  );
};

export default Terminal;
