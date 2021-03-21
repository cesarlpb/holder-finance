import { Component, OnInit } from '@angular/core';

import { DataService } from './services/data.service';
import { EthereumService } from './services/ethereum.service';
import { AppQuery } from './akita/queries/app.query';
import { AppService } from './akita/services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public app = AppComponent;
  static data: DataService = new DataService();

  constructor(
    private readonly ethereumService: EthereumService,
    readonly appService: AppService,
    readonly appQuery: AppQuery
  ) {}

  ngOnInit(): void {
    this.ethereumService.init();

    this.ethereumService.getAccount().then((account) => {
      this.app.data.setWallet({ address: account });
    });

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => this.appService.setDark(e.matches));
  }

  checkScroll(event: any): void {
    const t = event.target;

    this.app.data.setScroll({
      top: t.scrollTop,
      bottom: t.scrollHeight - t.offsetHeight - t.scrollTop,
    });
  }

  closeMenu(event: any): void {
    if (!event.target.classList.contains('show-links')) {
      this.app.data.setMenuOpened(false);
    }
  }
}
