const Button = ({ children, onClick }) => {
  return (
    <button
      className="bg-white text-black font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-400 hover:shadow-lg transition-all duration-300 ease-in-out"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
