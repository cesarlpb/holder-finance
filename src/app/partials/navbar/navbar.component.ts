import { Component, OnInit } from '@angular/core';

import { AppComponent } from 'src/app/app.component';
import { AppQuery } from 'src/app/akita/queries/app.query';
import { AppService } from 'src/app/akita/services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'partial-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  data = AppComponent.data;

  constructor(
    public router: Router,
    readonly appService: AppService,
    readonly appQuery: AppQuery,
  ) {}

  address = () => this.data.getWallet().address;

  walletClick() {
    this.appService.setPopup('WALLET_PROVIDER');
  }

  limitClick() {
    this.data.setLimitSection('ACTIONS');
  }

  toggleDarkMode() {
    this.appService.toggleDark();
  }

  toogleMenuOpened() {
    this.data.toggleMenuOpened();
  }

  openDocumentsPopup(): void {
    this.appService.setPopup('DOCUMENTS');
  }
}
