import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-bitcoin-list',
  standalone: true,
  imports: [],
  templateUrl: './bitcoin-list.component.html',
  styleUrls: ['./bitcoin-list.component.css'],
})
export class BitcoinListComponent implements OnInit {
  bitcoinData: any = [];

  constructor(private _electronService: ElectronService) {}

  ngOnInit(): void {
    if (this._electronService.isElectronApp) {
      if (this._electronService.ipcRenderer) {
        this._electronService.ipcRenderer
          .invoke('request-bitcoin-data') // Use invoke instead of sendSync
          .then((data) => {
            this.bitcoinData = data;
            console.log(this.bitcoinData);
          })
          .catch((error) => {
            console.error('Error sending IPC request:', error);
          });
      } else {
        console.error('ipcRenderer is not available in Electron service.');
      }
    } else {
      console.warn('Not running in an Electron app.');
    }
  }
}
