import { ApiResponse } from "../utils/ApiResponseHandler.js";
import Docker from "dockerode";

const docker = new Docker();

async function startContainer(req, res) {
  try {
    console.log("Route hit, attempting to start container...");

    console.log(await docker.version());

    // Check if the image exists
    const images = await docker.listImages();
    console.log("Available Images:", images);

    const container = await docker.createContainer({
      Image: "docker-container-code", // Ensure this image exists locally
      name: `newContainer${Math.floor(Math.random() * 10)}`,
      Cmd: ["npm", "run", "start"], // Ensure your image has a script called 'start'
      ExposedPorts: { "3000/tcp": {} }, // If needed
      HostConfig: {
        PortBindings: { "3000/tcp": [{ HostPort: "3001" }] }, // If needed
      },
    });

    await container.start();
    console.log("Container started successfully");

    const containerDetails = await container.inspect();
    new ApiResponse("Container Started", 201, {
      containerDetails,
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

export { startContainer };
