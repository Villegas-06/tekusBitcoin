import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectronService } from 'ngx-electron';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-bitcoin-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bitcoin-list.component.html',
  styleUrls: ['./bitcoin-list.component.css'],
})
export class BitcoinListComponent implements OnInit {
  twoWeeksData: any = [];
  todayData: any = [];
  dataReady: boolean = false;
  data: any;

  constructor(
    private _electronService: ElectronService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this._electronService.ipcRenderer.on(
      'update-bitcoin-data',
      (event, data) => {
        this.ngZone.run(() => {
          this.twoWeeksData = data.twoWeeksData.data.reverse();
          this.checkDataReady();
          console.log('Received update-bitcoin-data event:', data);
        });
      }
    );

    this._electronService.ipcRenderer.on(
      'update-bitcoin-today-data',
      (event, data) => {
        this.ngZone.run(() => {
          this.todayData = data.todayData.data.at(-1);
          this.checkDataReady();
          console.log('Received update-bitcoin-today-data event:', data);
        });
      }
    );
  }

  openDetailsWindow(data: any): void {
    console.log('Sending open-details-window event:', data);
    this._electronService.ipcRenderer.send('open-details-window', data);
  }

  private checkDataReady() {
    if (this.twoWeeksData.length > 0 && this.todayData) {
      this.dataReady = true;
    }
  }
}
