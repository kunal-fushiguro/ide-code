import { useRef, useEffect } from "react";
import { Terminal as xterm } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";

const Terminal = ({ input, output }) => {
  const terminalRef = useRef(null);
  const term = useRef(null);

  useEffect(() => {
    if (!term.current) {
      term.current = new xterm({
        cursorBlink: true,
        rows: 40, // More rows
        cols: 150, // Increased columns for larger terminal width
        theme: {
          foreground: "#ffffff",
          background: "#1e1e1e",
          cursor: "#00ff00",
          selection: "rgba(255,255,255,0.3)",
        },
      });

      term.current.open(terminalRef.current);

      term.current.writeln("");
      term.current.onData((data) => {
        input(data);
        console.log(data);
      });

      const writeData = (data) => {
        term.current.write(data);
        console.log(data);
      };

      output(writeData);

      const fitTerminal = () => {
        const container = terminalRef.current;
        const { clientWidth, clientHeight } = container;
        term.current.resize(
          Math.floor(clientWidth / 8), // More precise width calculation
          Math.floor(clientHeight / 18) // More precise height calculation
        );
      };

      fitTerminal();

      window.addEventListener("resize", fitTerminal);

      return () => {
        window.removeEventListener("resize", fitTerminal);
        term.current.dispose();
      };
    }
  }, [input, output]);

  return (
    <div
      ref={terminalRef}
      style={{ width: "100%", height: "100%", backgroundColor: "#1e1e1e" }}
    ></div>
  );
};

export default Terminal;
