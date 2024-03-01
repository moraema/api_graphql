import express from 'express';
import { Server } from 'http';
import { Comentarios } from './src/entities/comentarios';

export class WebhookServer {
    private app = express();
    private server?: Server;

    public start(httpServer: Server) {
        this.server = httpServer;
        this.app.use(express.json());
        this.app.post('/webhook/comentario-creado', async (req, res) => {
            try {
                const { comentarios, puntuacion } = req.body;
                const nuevoComentario = Comentarios.create({ comentarios, puntuacion });
                await nuevoComentario.save();
                console.log('Nuevo comentario guardado:', nuevoComentario);
                res.sendStatus(200);
            } catch (error) {
                console.error('Error al procesar el comentario:', error);
                res.sendStatus(500); // Devuelve un estado de error en caso de problemas
            }
        });
        this.server.on('request', this.app);
    }
}
