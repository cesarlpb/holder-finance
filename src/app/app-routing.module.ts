import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LimitComponent } from './components/limit/limit.component';
import { OtcComponent } from './components/otc/otc.component';
import { SwapComponent } from './components/swap/swap.component';

const routes: Routes = [
  {
    path: 'swap',
    component: SwapComponent,
  },
  {
    path: 'otc',
    component: OtcComponent,
  },
  {
    path: '',
    component: LimitComponent,
  },
  {
    path: 'limit',
    component: LimitComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
