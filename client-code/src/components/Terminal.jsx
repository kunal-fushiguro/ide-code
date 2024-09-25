import React from "react";
import Button from "./Button";

const Terminal = ({ fn }) => {
  return (
    <>
      <Button
        onClick={() => {
          fn();
        }}
      ></Button>
    </>
  );
};

export default Terminal;
