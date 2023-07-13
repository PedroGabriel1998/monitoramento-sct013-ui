import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  // message = '';

  // Preparing the chart data
 chartData = [
  {
    label: "",
    value: "0"
  }
];

dataSource = {
  chart: {
    caption: "Corrente do último minuto", //Set the chart caption
    subCaption: "In MMbbl = One Million barrels", //Set the chart subcaption
    xAxisName: "Country", //Set the x-axis name
    yAxisName: "Amperes", //Set the y-axis name
    numberSuffix: "A",
    theme: "fusion" //Set the theme for your chart

  },
  // Chart Data - from step 2
  data: this.chartData
};

  constructor(public webSocketService: WebSocketService) {
    // this.webSocketService.connect();
  }

  ngOnInit(): void {
    this.mostrarDados();
  }


  mostrarDados() {
    this.startFunction();
    // this.sendMessage(this.message);
  }

  sendMessage(message: string) {
    this.webSocketService.sendMessage(message);
  }


  startFunction() {
    const intervalId = setInterval(() => {
      this.pushOne();
    }, 1);

    setTimeout(() => {
      clearInterval(intervalId);
    }, 30000000);
  }

  public pushOne(): void {
    const valorAtual =   {
      label: this.webSocketService.currentData.time,
      value: this.webSocketService.currentData.message.toString()
    }
    console.log(this.webSocketService.currentData.message)
    this.chartData.push(valorAtual);

   if (this.chartData.length > 60) {
       this.chartData.shift();
     }
  }

}
