import { Router } from "express";
import { getFileStructure } from "../controllers/controllers.js";

const routes = Router();

routes.route("/getfiles").get(getFileStructure);

export { routes };
