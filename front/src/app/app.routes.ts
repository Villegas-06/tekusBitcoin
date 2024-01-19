import { Routes } from '@angular/router';
import { BitcoinListComponent } from './bitcoin-list/bitcoin-list.component';
import { BitcoinDetailsComponent } from './bitcoin-details/bitcoin-details.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: BitcoinListComponent,
  },
  { path: 'details', component: BitcoinDetailsComponent },
  {
    path: 'index.html',
    component: AppComponent,
  },
];
