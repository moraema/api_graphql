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
import { typeDefs } from './src/schema/typeDefs/typeDfes';
import { resolvers } from './src/schema/resolves/resolvers';
import { AppDataSource } from './src/config/db.confing';
import  createApolloGraphqlServer  from './src/middlewares/mycontext';
import { verifyToken } from './src/utils/jwt/verify.jwt';

(async function () {
    const app = express();
    const httpServer = createServer(app);

    const schema = makeExecutableSchema({
        typeDefs,
        resolvers
    });

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: "/"
    });  

    await useServer({ schema }, wsServer);

    createApolloGraphqlServer

    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
        ],

    });

    await server.start();
    
    app.use('/', cors<cors.CorsRequest>(), bodyParser.json(), expressMiddleware(server));

    const PORT = process.env.PORT || 4000;
    httpServer.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}/`);
    });

    AppDataSource.initialize()
        .then(() => {
            console.log('Se conectó a la base de datos correctamente');
        })
        .catch((error) => console.log(error));
})();
