import { ApiResponse } from "../utils/ApiResponse.js";
import fs from "fs/promises";
import path from "path";

// Controller to get the file structure
async function getFileStructure(_, res) {
  try {
    const tree = await generateFileStructure("./user");

    new ApiResponse("File structure fetched successfully", 200, {
      tree,
    }).handleResponse(res);
  } catch (error) {
    console.error(error);
    new ApiResponse(
      error.message || "Server Side Error",
      error.statusCode || 500,
      { ...error }
    ).handleResponse(res);
  }
}

// Function to generate the file/folder structure
async function generateFileStructure(dirPath) {
  const stats = await fs.lstat(dirPath);

  if (stats.isDirectory()) {
    const files = await fs.readdir(dirPath);
    const children = await Promise.all(
      files.map(async (file) => {
        const fullPath = path.join(dirPath, file);
        return await generateFileStructure(fullPath);
      })
    );

    return {
      type: "folder",
      name: path.basename(dirPath),
      children,
    };
  } else {
    return {
      type: "file",
      name: path.basename(dirPath),
    };
  }
}

export { getFileStructure };
