import { Injectable } from '@angular/core';
import {
  EntityState,
  EntityStore,
  StoreConfig,
} from '@datorama/akita';

export type Order = {
  id: string;
  owner: boolean;
  fee: string;
  desc: string;
  profitable: boolean;
  limit: string;
  status: string;
  tokenA: string;
  tokenB: string;
  amountA: string;
  amountB: string;
};

export type OrdersFilter = 'ALL' | 'ACTIVES' | 'YOURS';

export interface OrdersState extends EntityState<Order, string> {
  owner: string;
  filter: OrdersFilter;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'orders' })
export class OrdersStore extends EntityStore<OrdersState> {
  constructor() {
    super({ filter: 'ALL' });
  }
}
