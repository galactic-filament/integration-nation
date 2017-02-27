import * as net from "net";

// misc
const netConnect = (port: number, host: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const client = net.connect(port, host, () => resolve());
    client.on("error", reject);
  });
};

const main = async () => {
  // validating that env vars are available
  const envVarNames = [
    "API_PORT",
    "API_HOST"
  ];
  const envVarPairs = envVarNames.map((v) => <[string, string]>[v, process.env[v]]);
  const missingEnvVarPairs = envVarPairs.filter(([, v]) => typeof v === "undefined" || v.length === 0);
  if (missingEnvVarPairs.length > 0) {
    throw new Error(missingEnvVarPairs.map(([key]) => `${key} was missing`).join("\n"));
  }

  const envVars = envVarPairs.reduce((envVars, value) => {
    envVars[value[0]] = value[1];
    return envVars;
  }, <{[key: string]: string}>{});

  // validating that the app port is accessible
  const appPort = Number(envVars["API_PORT"]);
  try {
    await netConnect(appPort, envVars["API_HOST"]);
  } catch (err) {
    switch (err["code"]) {
      case "ENOTFOUND":
        throw new Error(`Host ${envVars["API_HOST"]} could not be found`);
      case "EHOSTUNREACH":
        throw new Error(`Host ${envVars["API_HOST"]} could not be reached`);
      case "ECONNREFUSED":
        throw new Error(`Host ${envVars["API_HOST"]} was not accessible at ${appPort}`);
      default:
        throw err;
    }
  }
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
