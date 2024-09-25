import { useState } from "react";
import Box from "../components/Box";
import Button from "../components/Button";

const ContainerList = ({ containers, refresh }) => {
  async function startContainer(id) {
    console.log("start", id);
    const url = `http://localhost:3030/api/start/${id}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    await refresh();
  }

  async function stopContainer(id) {
    const url = `http://localhost:3030/api/stop/${id}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    await refresh();
  }

  async function removeContainer(id) {
    console.log("remove", id);
    const url = `http://localhost:3030/api/remove/${id}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    await refresh();
  }

  async function visitContainer(id) {
    console.log("visited", id);
    const url = `http://localhost:3030/api/info/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    const port = "3000/tcp";
    console.log(data.data.NetworkSettings.Ports[port][0].HostPort);
  }

  return (
    <>
      <div className="flex justify-center items-center flex-col no-scrollbar overflow-hidden">
        <h1 className="text-4xl font-bold text-center">Container List</h1>
        {containers.map((container) => (
          <Box key={container.Id}>
            <h2 className="text-xl font-semibold text-center">
              {container.Names[0]}
            </h2>
            <p className="text-center text-gray-500">{container.Status}</p>
            <div className="flex gap-4 items-center justify-center">
              <Button
                onClick={() => {
                  startContainer(container.Id);
                }}
                disable={container.State === "exited" ? false : true}
              >
                {container.State === "exited" ? "started" : "start"}
              </Button>

              <Button
                onClick={() => {
                  stopContainer(container.Id);
                }}
                disable={container.State === "running" ? false : true}
              >
                {container.State === "running" ? "stop" : "stoped"}
              </Button>

              <Button
                onClick={() => {
                  removeContainer(container.Id);
                }}
                disable={container.State === "running" ? true : false}
              >
                Remove
              </Button>

              <Button
                onClick={() => {
                  visitContainer(container.Id);
                }}
                disable={container.State === "running" ? false : true}
              >
                Visit
              </Button>
            </div>
          </Box>
        ))}
      </div>
    </>
  );
};

export default ContainerList;
