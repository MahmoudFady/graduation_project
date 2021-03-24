import { io } from 'socket.io-client';

export class SocketIoService {
  private socket: any;
  init() {
    this.socket = io('http://localhost:3000');
  }
}
