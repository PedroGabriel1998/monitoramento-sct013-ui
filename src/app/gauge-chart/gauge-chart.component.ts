import { Component, Input, OnInit } from '@angular/core';
import { NgxGaugeType } from 'ngx-gauge/gauge/gauge';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.scss']
})
export class GaugeChartComponent implements OnInit {
   @Input() potenciaValor = 0;
   @Input() titulo = "";
   @Input() label = "";
   @Input() max = 10;
   @Input() range: any;

  gaugeType: NgxGaugeType = "semi";
  gaugeValue = 0;
  gaugeLabel = "Amperimetro";
  gaugeAppendText = "A";



  constructor(public webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.startFunction();
    this.gaugeLabel = this.titulo;
    this.gaugeAppendText = this.label;
  }

  startFunction() {
    const intervalId = setInterval(() => {
      this.gaugeValue = this.potenciaValor
    }, 1);

    setTimeout(() => {
      clearInterval(intervalId);
    }, 30000000);
  }

}



