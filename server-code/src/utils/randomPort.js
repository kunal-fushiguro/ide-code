export const randomPort = (runnigPorts, minPort, maxPort) => {
  const port = Math.floor(Math.random() * (minPort - maxPort + 1)) + minPort;

  if (runnigPorts[port]) {
    randomPort();
  }

  runnigPorts[port] = true;

  return port;
};
