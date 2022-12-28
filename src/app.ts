import os from "node:os";
import cluster from "node:cluster";

import { config } from "dotenv";

import createLoadBalancer from "./createLoadBalancer";
import initialUsers from "./user/initialUsers";
import createAPIServer from "./createAPIServer";
import {Worker} from "cluster";

config();

const numCPUs = os.cpus().length;

const port = Number(process.env.PORT) ?? 4000

if (cluster.isPrimary) {
  console.log(`Primary worker is running`);

  const servers = Array.from({ length: 8 }, (_, i) => `http://localhost:${port + i + 1}`)
  createLoadBalancer(servers).listen(port, () => {
    console.log(`Load balancer started on port: ${port}`);
  });

  let workers: Worker[] = [];
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork({
      PORT: port + i + 1,
      INITIAL_DATA: JSON.stringify({
        users: initialUsers
      })
    });

    workers.push(worker);

    worker.on("message", (msg) => {
      workers.forEach(worker => worker.send(msg))
    });
  }

  cluster.on('exit', (worker, code) => {
    console.log(
        `Worker ${worker.id} finished. Exit code: ${code}`
    );
  });
} else {
  const initialData = JSON.parse(process.env.INITIAL_DATA ?? '');

  const server = createAPIServer(initialData);
  server.listen(process.env.PORT, () => {
    console.log(`Server started on port: ${process.env.PORT}`);
    console.log(`Worker ${cluster?.worker?.id} launched`)
  });
}