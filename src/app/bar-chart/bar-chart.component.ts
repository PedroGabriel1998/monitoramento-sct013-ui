import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Observable, range } from 'rxjs';
import { WebSocketService } from '../services/web-socket.service';

// import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: [ './bar-chart.component.scss' ],
})
export class BarChartComponent implements OnInit {

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
      caption: "Countries With Most Oil Reserves [2017-18]", //Set the chart caption
      subCaption: "In MMbbl = One Million barrels", //Set the chart subcaption
      xAxisName: "Country", //Set the x-axis name
      yAxisName: "Reserves (MMbbl)", //Set the y-axis name
      numberSuffix: "",
      theme: "fusion" //Set the theme for your chart

    },
    // Chart Data - from step 2
    data: this.chartData
  };

    constructor(public webSocketService: WebSocketService) {
      this.webSocketService.conectarAmostragem();
    }

    ngOnInit(): void {
      this.mostrarDados();
    }


    mostrarDados() {
      this.startFunction();
      // this.sendMessage(this.message);
    }

    sendMessage(message: string) {
      this.webSocketService.iniciarComunicacao(message);
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
        value: this.webSocketService.currentData.messageAmostragem.toString()
      }
      console.log("AAAA", valorAtual)
      this.chartData.push(valorAtual);

       if (this.chartData.length > 60) {
         this.chartData.shift();
       }
    }

}

