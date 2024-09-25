import React from "react";

const Wrapper = ({ children }) => {
  return (
    <div className="bg-black w-screen h-full min-h-screen font-normal text-white flex justify-center items-center flex-col gap-4 overflow-hidden no-scrollbar">
      {children}
    </div>
  );
};

export default Wrapper;
