import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DocumentsPopupComponent } from 'src/app/partials/popups/documents/documents-popup.component';
import { LimitTradePopupComponent } from 'src/app/partials/popups/limit-trade/limit-trade-popup.component';
import { SelectPairPopupComponent } from 'src/app/partials/popups/select-pair/select-pair-popup.component';
import { WalletProviderPopupComponent } from 'src/app/partials/popups/wallet-provider/wallet-provider-popup.component';
import { LimitModule } from '../limit/limit.module';
import { PopupsComponent } from './popups.component';

@NgModule({
  imports: [CommonModule, LimitModule, FormsModule],
  providers: [],
  declarations: [
    PopupsComponent,
    WalletProviderPopupComponent,
    SelectPairPopupComponent,
    LimitTradePopupComponent,
    DocumentsPopupComponent,
  ],
  exports: [PopupsComponent],
})
export class PopupsModule {}
