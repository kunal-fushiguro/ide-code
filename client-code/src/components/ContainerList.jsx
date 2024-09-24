import Box from "../components/Box";
import Button from "../components/Button";

const ContainerList = ({ containers }) => {
  async function startContainer() {
    console.log("start");
  }

  async function stopConatiner() {
    console.log("stop");
  }

  async function removeContainer() {
    console.log("remove");
  }

  async function visitContainer() {
    console.log("visited");
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-center">Container List</h1>
      {containers.map((container) => (
        <Box key={container.Id}>
          <h2 className="text-xl font-semibold text-center">
            {container.Names[0]}
          </h2>
          <p className="text-center text-gray-500">{container.Status}</p>
          <div className="flex gap-4 items-center justify-center">
            <Button onClick={startContainer}>Start</Button>
            <Button onClick={stopConatiner}>Stop</Button>
            <Button onClick={removeContainer}>Remove</Button>
            <Button onClick={visitContainer}>Visit</Button>
          </div>
        </Box>
      ))}
    </>
  );
};

export default ContainerList;
