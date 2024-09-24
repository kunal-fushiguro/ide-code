import { ApiResponse } from "../utils/ApiResponseHandler.js";
import Docker from "dockerode";
import { randomPort } from "../utils/randomPort.js";

const docker = new Docker();
const runnigPorts = {};
const minPort = 7500;
const maxPort = 8000;

async function startContainer(_, res) {
  try {
    const newPORT = randomPort(runnigPorts, minPort, maxPort);
    console.log("Route hit, attempting to start container...");
    const container = await docker.createContainer({
      Image: "docker-container-code",
      name: `newContainer${Math.floor(Math.random() * 1000)}`,
      Cmd: ["npm", "run", "start"],
      ExposedPorts: { "3000/tcp": {} },
      HostConfig: {
        PortBindings: { "3000/tcp": [{ HostPort: `${newPORT}` }] },
      },
    });

    await container.start();
    console.log("Container started successfully");

    const { Id, Config } = await container.inspect();
    new ApiResponse("Container Started", 201, {
      Id,
      Config,
    }).handleResponse(res);
  } catch (error) {
    console.error("Error occurred:", error);
    new ApiResponse(
      error.message || "Server Side Error",
      error.statusCode || 500,
      { ...error }
    ).handleResponse(res);
  }
}

async function stopContaiiner(req, res) {
  try {
    console.log(req.params.containerId);

    const container = await docker.getContainer(req.params.containerId);

    await container.stop();

    new ApiResponse("Container Stoped", 200, { sucess: "true" }).handleResponse(
      res
    );
  } catch (error) {
    console.error("Error occurred:", error);
    new ApiResponse(
      error.message || "Server Side Error",
      error.statusCode || 500,
      { ...error }
    ).handleResponse(res);
  }
}

async function removeContaiiner(req, res) {
  try {
    console.log(req.params.containerId);

    const container = await docker.getContainer(req.params.containerId);

    await container.stop();
    await container.remove();

    new ApiResponse("Container Stoped", 200, { sucess: "true" }).handleResponse(
      res
    );
  } catch (error) {
    console.error("Error occurred:", error);
    new ApiResponse(
      error.message || "Server Side Error",
      error.statusCode || 500,
      { ...error }
    ).handleResponse(res);
  }
}

async function listContainer(_, res) {
  try {
    const listContainer = await docker.listContainers({ all: true });
    new ApiResponse("Container Stoped", 200, {
      sucess: "true",
      listContainer,
    }).handleResponse(res);
  } catch (error) {
    console.error("Error occurred:", error);
    new ApiResponse(
      error.message || "Server Side Error",
      error.statusCode || 500,
      { ...error }
    ).handleResponse(res);
  }
}

export { startContainer, stopContaiiner, removeContaiiner, listContainer };
