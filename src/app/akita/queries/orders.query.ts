import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { OrdersState, OrdersStore } from '../stores/orders.store';

@Injectable({ providedIn: 'root' })
export class OrdersQuery extends QueryEntity<OrdersState> {
  loading$ = this.selectLoading();
  error$ = this.selectError();
  entities$ = this.selectAll();
  owner$ = this.select(state => state.owner);

  constructor(protected store: OrdersStore) {
    super(store);
  }

  getLoading = () => this.loading$;

  getError = () => this.error$;

  getList = () => {
    switch (this.getValue().filter) {
      case 'ACTIVES':
        return this.selectAll({
          filterBy: [(entity) => entity.status === '1'],
        });
      case 'YOURS':
        return this.selectAll({
          filterBy: [(entity) => entity.owner == true],
        });
      default:
        return this.selectAll();
    }
  };
}
