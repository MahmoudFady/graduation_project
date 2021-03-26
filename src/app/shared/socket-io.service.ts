import { Post } from './../create-post/post.model';
import { Comment } from './../create-post/post-single/create-comment/comment.model';
import { io } from 'socket.io-client';
import { Injectable } from '@angular/core';
@Injectable()
export class SocketIoService {
  socket: any;
  init() {
    this.socket = io('http://localhost:3000');
  }
  getMessage() {
    this.socket.on('sendMessage', (message: string) => {
      console.log(message);
    });
  }
  // => JOINING SPECIFIC ROOM
  joinRoom(joinPath: string) {
    this.socket.emit('join', joinPath, (msg: string) => {
      console.log(msg);
    });
  }
  // => ON ADD NEW COMMENT (CLIENT => SERVER)
  onAddComment(newComment: Comment, joinPath: string) {
    this.socket.emit('onAddComment', { newComment, joinPath });
  }
  // => ON ADD NEW POST
  onAddPost(post: Post) {
    this.socket.emit('onAddPost', post);
  }
  onDeletePost(postId: string) {
    this.socket.emit('onDeletePost', postId);
  }
  
  //=> DISCONNECT USER
  disconnectUser(joinPath: string) {
    this.socket.emit('userOut', joinPath);
  }
}
