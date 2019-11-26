import {Component, OnInit} from '@angular/core';
import {MyservService} from './myserv.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  seconds = 0;
  title = 'tp2embarque';
  ipAddress = '';
  private data: any;
  chartOptions = {
    responsive: true
  };

  chartData = [
    { data: [], label: 'Temperature' },
    { data: [], label: 'Humidity' }
  ];
  chartLabels = [];
  constructor(private s: MyservService) {
  }

  sendData() {
    this.s.sendData(this.ipAddress, this.data).subscribe(
      data => alert(data.message + '\ncheck the serial!'),
      err => console.log(err.error)
    );
  }
  getData() {
    if (this.ipAddress !== '') {
      this.s.getData(this.ipAddress).subscribe(
        data => {
          console.log(data);
          this.chartData[0].data.push(data.t);
          this.chartData[1].data.push(data.h);
          this.chartLabels.push(this.seconds);
          this.seconds = this.seconds + 2;
          if (this.chartData[0].data.length > 7) {
            this.chartData[0].data.splice(0, 1);
            this.chartData[1].data.splice(0, 1);
            this.chartLabels.splice(0, 1);
          }
          const tbody = document.getElementsByTagName('tbody')[0];
          const tr = document.createElement('tr');
          const td0 = document.createElement('td');
          td0.innerText = String(this.seconds / 2);
          const td1 = document.createElement('td');
          td1.innerText = data.t;
          const td2 = document.createElement('td');
          td2.innerText = data.h;
          const td3 = document.createElement('td');
          const date = new Date(); // for now
          td3.innerText = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
          tr.appendChild(td0);
          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tbody.appendChild(tr);
          if (this.seconds / 2 > 4) {
            tbody.removeChild( tbody.firstChild);
          }
        }, err => {
          console.log(err.error);
        }
      );
    }
  }
  ngOnInit(): void {
      setInterval(() => {
          this.getData();
        },
        2000);
  }

  sendEvent() {
    this.s.switchLight(this.ipAddress).subscribe(
      data => {
        console.log(data);
        const element = document.getElementById('switch');
        if (data.state === 'ON') {
          element.classList.remove('btn-danger');
          element.classList.add('btn-info');
        } else {
          element.classList.remove('btn-info');
          element.classList.add('btn-danger');
        }
      }, err => {
        console.log(err.error);
      }
    );
  }
  onChartClick(event) {
    console.log(event);
  }
}
