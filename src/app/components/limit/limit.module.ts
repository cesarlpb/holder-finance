import { NgModule } from '@angular/core';
import { LimitComponent } from './limit.component';
import { LimitInfoComponent } from '../../partials/limit/info/limit-info.component';
import { LimitActionsComponent } from 'src/app/partials/limit/actions/limit-actions.component';
import { CommonModule } from '@angular/common';
import { LimitTradeComponent } from 'src/app/partials/limit/trade/limit-trade.component';
import { PipesModule } from 'src/app/pipes/pipes.modules';
import { TradeService } from 'src/app/services/trade.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LimitSelectPairComponent } from 'src/app/partials/limit/select-pair/limit-select-pair.component';

@NgModule({
  imports: [CommonModule, PipesModule, HttpClientModule, FormsModule],
  providers: [TradeService],
  declarations: [
    LimitComponent,
    LimitInfoComponent,
    LimitActionsComponent,
    LimitSelectPairComponent,
    LimitTradeComponent,
  ],
  exports: [LimitComponent, LimitSelectPairComponent],
})
export class LimitModule {}
