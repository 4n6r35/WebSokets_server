
import express from 'express'
import cors from 'cors'
import http from "http"
import { Server as SocketServer } from "socket.io"
import { SocketCotroller } from '../sockets/controller.js'

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
        this.io.on('connection', SocketCotroller);
    }

    Port_listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

export { Server }