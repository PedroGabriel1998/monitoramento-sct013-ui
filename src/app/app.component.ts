import { Component } from '@angular/core';
import { WebSocketService } from './services/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'monitoramento-sct013-ui';
  message = '';

  thresholdConfigA = {
    '0': {color: 'green'},
    '5': {color: 'orange'},
    '8': {color: 'red'}
  };

  thresholdConfigW = {
    '0': {color: 'green'},
    '1100': {color: 'orange'},
    '1760': {color: 'red'}
  };


  constructor(public webSocketService: WebSocketService) {
    this.webSocketService.connect();
    this.sendMessage(this.message);

  }

  sendMessage(message: string) {
    this.webSocketService.sendMessage(message);
  }


}
