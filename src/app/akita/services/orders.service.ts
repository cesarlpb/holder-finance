import { Injectable } from '@angular/core';
import { Order, OrdersFilter, OrdersStore } from '../stores/orders.store';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  constructor(private store: OrdersStore) {}

  setEntities(entities: Order[]): void {
    this.store.set(entities);
  }

  setOwner(owner: string): void {
    this.store.update({ owner });
  }

  setFilter(filter: OrdersFilter): void {
    this.store.update({ filter });
  }
}
