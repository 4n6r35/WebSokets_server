
import express from 'express'
import cors from 'cors'
import http from "http"
import { Server as SocketServer } from "socket.io"

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT;
        this.server = http.createServer(this.app);
        this.io = new SocketServer(this.server);
        this.path = {}

        //Middlewares
        this.middlewares();
        //Rutas de app
        this.routes();

        //config sockets
        this.config_sockets();
    }

    middlewares() {
        //CORS
        this.app.use(cors());
        //Directorio Público
        this.app.use(express.static('public'));
    }

    routes() { }

    config_sockets() {
        this.io.on('connection', socket => {
            console.log('Cliente conectado', socket.id);
            socket.on('disconnect', () => {
                console.log('Cliente desconectado', socket.id);
            });
            socket.on('enviar-mensaje', (payload) => {
                console.log(payload)
            })
        });
    }

    Port_listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

export { Server }