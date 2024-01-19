import { Component, OnInit, Input } from '@angular/core';
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
  @Input() detailsData: any;
  detailsReady: boolean = false;

  constructor(
    private _electronService: ElectronService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this._electronService.ipcRenderer.on('details-data', (event, data) => {
      this.ngZone.run(() => {
        this.detailsData = data;
        console.log(this.detailsData);
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
