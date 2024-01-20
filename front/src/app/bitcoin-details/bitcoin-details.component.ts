import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElectronService } from 'ngx-electron';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-bitcoin-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bitcoin-details.component.html',
  styleUrl: './bitcoin-details.component.css',
})
export class BitcoinDetailsComponent implements OnInit {
  detailsData: any = [];
  detailsReady: boolean = false;
  priceBitcoinCop: number = 0.0;
  priceBitcoinEur: number = 0.0;

  constructor(
    private _electronService: ElectronService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this._electronService.ipcRenderer.on('data-details', (event, data) => {
      this.ngZone.run(() => {
        this.detailsData = data;

        // Conversion to COP
        this.priceBitcoinCop = data.priceUsd * 4000;

        // Conversion to EUR
        this.priceBitcoinEur = data.priceUsd * 0.92;
        this.checkDetailReady();
      });
    });
  }

  private checkDetailReady() {
    if (this.detailsData) {
      this.detailsReady = true;
    }
  }
}
