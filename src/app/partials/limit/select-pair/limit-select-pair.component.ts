import { Component, OnInit } from '@angular/core';
import { PairsService } from 'src/app/akita/services/pairs.service';
import { PairsQuery } from 'src/app/akita/queries/pairs.query';
import { AppComponent } from 'src/app/app.component';
import { TradeService } from 'src/app/services/trade.service';
import { CryptoPair } from 'src/app/types/data-service/crypto-pair.type';
import { AppService } from 'src/app/akita/services/app.service';

@Component({
  selector: 'partial-limit-select-pair',
  templateUrl: './limit-select-pair.component.html',
  styleUrls: ['./limit-select-pair.component.scss'],
})
export class LimitSelectPairComponent implements OnInit {
  data = AppComponent.data;
  notConfirmed = this.pairsQuery.getActive();

  constructor(
    private readonly trade: TradeService,
    readonly pairsService: PairsService,
    readonly pairsQuery: PairsQuery,
    readonly appService: AppService
  ) {}

  pairs = this.pairsQuery.getAll();
  selected = this.pairsQuery.getSelected();

  ngOnInit() {
    if (!this.pairsQuery.getAll().length) {
      this.pairsService.setEntities(this.trade.getPairs());
      this.pairs = this.pairsQuery.getAll();
    }
  }

  continue() {
    this.trade.selected = this.notConfirmed;
    this.pairsService.updateSelected(this.notConfirmed.id);

    if (this.data.getLimitSection() === 'SELECT_PAIR') {
      this.data.setLimitSection('TRADE');
    } else {
      this.appService.setPopup(null);
    }
  }

  selectPair(pair: CryptoPair) {
    this.notConfirmed = pair;
  }

  search(search: EventTarget) {
    const value = search['value'].toUpperCase().replace(' ', '');

    this.pairs =
      value !== ''
        ? this.pairsQuery.getFiltered(value)
        : this.pairsQuery.getAll();
  }
}
