import { Routes } from '@angular/router';
import { NewOrderComponent } from './pages/new-order/new-order.component';

export const routes: Routes = [
  { path: '', redirectTo: 'order', pathMatch: 'full' },
  {
    path: 'order',
    component: NewOrderComponent,
  },
];
