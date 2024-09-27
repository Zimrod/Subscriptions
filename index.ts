const express = require("express");
const app = express();
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
// const { startStandaloneServer } = require('@apollo/server/standalone');
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const http = require("http");
const { createServer } = require("http");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

// Import the User model
const User = require("./models/User"); // Make sure to adjust the path

const typeDefs = require("./graphql/typeDefs");
const resolversAgric = require("./graphql/resolvers/agriculture");
const resolversUsers = require("./graphql/resolvers/users");

// const MONGODB = "mongodb://127.0.0.1:27017/houseBust";
const MONGODB = process.env.MONGODB_CONNEXN;
// const MONGODB = "mongodb+srv://tumai:Areyou4or9@cluster0-pl-1.n14gb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// For expressMiddleware
// const httpServer = http.createServer(app);
// For Enabling Subscriptions
const httpServer = createServer(app);
const schema = makeExecutableSchema({
  typeDefs,
  resolversAgric,
  resolversUsers,
});
// Creating the WebSocket server
const wsServer = new WebSocketServer({
  // This is the `httpServer` we created in a previous step.
  server: httpServer,
  // Pass a different path here if app.use
  // serves expressMiddleware at a different path
  path: "/subscriptions",
});

// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  csrfPrevention: true,
  cache: "bounded",
  cors: {
    origin: "*",
  },
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

server.start();

const apolloPort = process.env.APOLLO_PORT;
// Start Express app on a separate port
const expressPort = process.env.EXPRESS_PORT; // Use environment variable (optional)
app.listen(expressPort, () => {
  console.log(`Express App listening on port: ${expressPort}`);
});

// Set strictQuery to true to enforce strict mode for queries
mongoose.set("strictQuery", true);

mongoose.connect(MONGODB, { useNewUrlParser: true }).then(async () => {
  console.log("MongoDB Connected");

  app.use(
    "/",
    cors(),
    // 50mb is the limit that `startStandaloneServer` uses, but you may configure this to suit your needs
    express.json({ limit: "50mb" }),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
      // context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  // Modified server startup
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/`);
});
// .catch((error) => {
//   console.error("Error connecting to MongoDB: ", error);
// });
