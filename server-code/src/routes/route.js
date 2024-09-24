import { Router } from "express";
import { ApiResponse } from "../utils/ApiResponseHandler.js";
import { startContainer } from "../controllers/docker.js";

const routes = Router();

routes.get("/", (_, res) => {
  new ApiResponse("OK", 200, { success: true }).handleResponse(res);
});

routes.route("/create").get(startContainer);

export { routes };
