import { Component } from '@angular/core';
import { AppService } from 'src/app/akita/services/app.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'partial-limit-actions',
  templateUrl: './limit-actions.component.html',
  styleUrls: ['./limit-actions.component.scss'],
})
export class LimitActionsComponent {
  data = AppComponent.data;

  constructor(public readonly appService: AppService) {}

  insertOffer() {
    this.data.setLimitSection('SELECT_PAIR');
  }

  openLimitTrade(): void {
    this.appService.setPopup('LIMIT_TRADE');
  }
}
