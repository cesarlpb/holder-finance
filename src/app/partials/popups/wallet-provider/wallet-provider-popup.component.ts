import { Component } from '@angular/core';
import { AppService } from 'src/app/akita/services/app.service';
import { AppComponent } from 'src/app/app.component';
import { EthereumService } from 'src/app/services/ethereum.service';

@Component({
  selector: 'popup-wallet-provider',
  templateUrl: './wallet-provider-popup.component.html',
  styleUrls: ['./wallet-provider-popup.component.scss'],
})
export class WalletProviderPopupComponent {
  data = AppComponent.data;

  constructor(
    private readonly ethereumService: EthereumService,
    readonly appService: AppService
  ) {}

  async connectWithMetamask(): Promise<void> {
    const address = await this.ethereumService.connectWithMetamask();
    this.continue(address);
  }

  async connectWithWalletConnect(): Promise<void> {
    const address = await this.ethereumService.connectWithWalletConnect();
    this.continue(address);
  }

  continue(address?: string): void {
    this.data.setWallet({ address });
    this.data.setLimitSection('ACTIONS');
    this.appService.setPopup(null);
  }
}
