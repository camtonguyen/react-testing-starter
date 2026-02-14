import { createServer, Server } from "miragejs";
import { handlers } from "./handlers";
import { models, factories } from "./db";

export let server: Server;

export const makeServer = () => {
  server = createServer({
    models,
    factories,
    seeds(server) {
      server.createList('product', 3);
      server.createList('category', 3);
    },
    routes() {
      handlers(this);
    },
  });
  return server;
};

