import React from "react";

const FileExplorer = ({ structure }) => {
  const renderFileTree = (node) => {
    if (node.name === "node_modules") return null;

    if (node.type === "file") {
      return (
        <div key={node.name} className="pl-4 flex items-center">
          <span className="mr-2">📄</span>
          <span>{node.name}</span>
        </div>
      );
    }

    if (node.type === "folder") {
      return (
        <div key={node.name} className="pl-2">
          <div className="flex items-center">
            <span className="mr-2">📁</span>
            <span>{node.name}</span>
          </div>
          <div className="ml-4">
            {node.children &&
              node.children.map((child) => renderFileTree(child))}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="text-white bg-black h-full w-64 p-4">
      {renderFileTree(structure)}
    </div>
  );
};

export default FileExplorer;
