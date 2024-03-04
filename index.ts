import express, { Request, Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { AppDataSource } from './src/config/db.confing';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { authenticateJWT } from './src/middlewares/verify.jwt';
import { resolvers } from './src/schema/resolves/resolvers';
import { typeDefs } from './src/schema/typeDefs/typeDfes';
import dotenv from 'dotenv';
dotenv.config();

interface CustomRequest extends Request {
  user?: any;
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const app: Application = express(); 

const server = new ApolloServer({
  schema,
  context: ({ req }: { req: CustomRequest }) => {
    return { user: req.user };
  }
});


app.use(authenticateJWT); 

const httpServer = createServer(app);

const PORT = parseInt(process.env.PORT || "4000");

httpServer.listen(PORT, async () => {
  await server.start(); 
  server.applyMiddleware({ app: app as any }); 

  console.log(`Servidor GraphQL en http://localhost:${PORT}${server.graphqlPath}`);

  AppDataSource.initialize()
    .then(() => {
      console.log('Se conectó a la base de datos correctamente');
    });

  new SubscriptionServer({
    execute,
    subscribe,
    schema,
    
  }, {
    server: httpServer,
    path: server.graphqlPath
  });
});
