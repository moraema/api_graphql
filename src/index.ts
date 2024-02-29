import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from "@apollo/server/express4";
import cors from 'cors';
import bodyParser from 'body-parser';
import { typeDefs } from './schema/typeDefs/typeDfes';
import { resolvers } from './schema/resolves/resolvers';
import { AppDataSource } from './config/db.confing';
import { WebhookServer } from './webhokk/webhook';

(async function () {
    const app = express();
    const httpServer = createServer(app);

    const schema = makeExecutableSchema({
        typeDefs,
        resolvers
    });
   
    WebhookServer;

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: "/"
    });

    const serverCleanup = useServer({ schema }, wsServer);

    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        }
                    }
                }
            }
        ]
    });
    

    await server.start();


    
    
    app.use('/', cors<cors.CorsRequest>(), bodyParser.json(), expressMiddleware(server));

   
    const PORT = process.env.PORT || 4000;
    httpServer.listen(PORT, () => {
        console.log(`Servidor corriedo en http://localhost:${PORT}/`);
    });


    AppDataSource.initialize()
    .then(() => {
      console.log('Se conecto a la base de datos correctamente');
    })
    .catch((error) => console.log(error));
})();

