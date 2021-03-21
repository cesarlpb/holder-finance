import { Component } from '@angular/core';
import { AppService } from 'src/app/akita/services/app.service';
import { AppComponent } from 'src/app/app.component';
import { EthereumService } from 'src/app/services/ethereum.service';

@Component({
  selector: 'partial-limit-info',
  templateUrl: './limit-info.component.html',
  styleUrls: ['./limit-info.component.scss'],
})
export class LimitInfoComponent {
  data = AppComponent.data;

  constructor(
    private readonly ethereum: EthereumService,
    readonly appService: AppService
  ) {}

  async continue(): Promise<void> {
    if (await this.ethereum.getAccount()) {
      this.data.setLimitSection('ACTIONS');
      return;
    }

    this.appService.setPopup('WALLET_PROVIDER');
  }
  
  openDocumentsPopup(): void {
    this.appService.setPopup('DOCUMENTS');
  }
}
