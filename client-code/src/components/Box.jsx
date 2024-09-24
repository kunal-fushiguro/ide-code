const Box = ({ children }) => {
  return (
    <div className="flex items-center justify-center bg-black border-[1px] border-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out gap-4">
      {children}
    </div>
  );
};

export default Box;
