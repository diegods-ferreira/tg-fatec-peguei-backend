import 'reflect-metadata';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import { createServer } from 'http';
import socketIo from 'socket.io';
import routes from './routes';
import rateLimiter from './middlewares/rateLimiter';

import '@shared/infra/typeorm';
import '@shared/container';
import handleWebsocketConnection from './websocket';

const app = express();
const server = createServer(app);
const io: socketIo.Server = socketIo(server, {
  cors: {
    origin: '*',
    methods: '*',
  },
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);
app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    console.error(err);

    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error.',
    });
  },
);

io.on('connection', (socket: socketIo.Socket) => {
  handleWebsocketConnection(io, socket);
});

server.listen(3333, () => {
  console.log('Server started on port 3333 🚀');
});
