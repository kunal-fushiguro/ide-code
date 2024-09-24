import { Router } from "express";
import { ApiResponse } from "../utils/ApiResponseHandler.js";
import {
  startContainer,
  stopContaiiner,
  listContainer,
  removeContaiiner,
  startSingleConatiner,
} from "../controllers/docker.js";

const routes = Router();

routes.get("/", (_, res) => {
  new ApiResponse("OK", 200, { success: true }).handleResponse(res);
});

routes.route("/create").get(startContainer);
routes.route("/stop/:containerId").get(stopContaiiner);
routes.route("/list").get(listContainer);
routes.route("/remove/:containerId").get(removeContaiiner);
routes.route("/start/:containerId").get(startSingleConatiner);

export { routes };
