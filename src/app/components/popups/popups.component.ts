import { Component } from '@angular/core';
import { AppQuery } from 'src/app/akita/queries/app.query';
import { AppService } from 'src/app/akita/services/app.service';
import { Popup } from 'src/app/akita/stores/app.store';

@Component({
  selector: 'app-popups',
  templateUrl: './popups.component.html',
  styleUrls: ['./popups.component.scss'],
})
export class PopupsComponent {
  constructor(readonly appService: AppService, readonly appQuery: AppQuery) {}

  closePopup(event): void {
    if (event.target.className === 'container') {
      this.appService.setPopup(null);
    }
  }

  currentPopup() {
    return this.appQuery.getPopup();
  }
}
