import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../env/environment';
interface MessageData {
  message: number;
  time: string;
  potencia: number;
  messageAmostragem: number;
}
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket$!: WebSocketSubject<any>;
  public receivedData: MessageData[] = [];
  currentData: MessageData= {
    "message": 0,
    "time": "",
    "potencia": 0,
    "messageAmostragem": 0
  };
  private socketAmostragem$!: WebSocketSubject<any>;
  valorAtual!: MessageData;

  public connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket(environment.webSocketUrl);

      this.socket$.subscribe((data: MessageData) => {
        this.receivedData.push(data);
        this.currentData = data;
      });
    }
  }

  sendMessage(message: string) {
    this.socket$.next({ message });
  }

  close() {
    this.socket$.complete();
  }

  public conectarAmostragem(): void {
    if (!this.socketAmostragem$ || this.socketAmostragem$.closed) {
      this.socketAmostragem$ = webSocket("ws://localhost:8000/amostragem");

      this.socketAmostragem$.subscribe((data: MessageData) => {
        this.valorAtual = data;
      });
    }
  }

  iniciarComunicacao(message: string) {
    this.socketAmostragem$.next({ message });
  }

  fecharComunicacao() {
    this.socketAmostragem$.complete();
  }

}
