import { Component, OnInit } from '@angular/core';
import { chain } from 'mathjs';
import { OrdersQuery } from 'src/app/akita/queries/orders.query';
import { OrdersService } from 'src/app/akita/services/orders.service';
import { Order, OrdersFilter } from 'src/app/akita/stores/orders.store';
import { EthereumService } from 'src/app/services/ethereum.service';
import { LimitOrderService } from 'src/app/services/limitorder.service';
import { math } from 'src/app/services/math';
import { TradeService } from 'src/app/services/trade.service';
import { CryptoPair } from 'src/app/types/data-service/crypto-pair.type';

@Component({
  selector: 'popup-limit-trade',
  templateUrl: './limit-trade-popup.component.html',
  styleUrls: ['./limit-trade-popup.component.scss'],
})
export class LimitTradePopupComponent implements OnInit {
  owner$ = this.ordersQuery.owner$;
  orders = this.ordersQuery.getList();
  pairs: CryptoPair[] = null;
  fee = 1;
  total = '...';
  loading = false;

  constructor(
    readonly ordersService: OrdersService,
    readonly ordersQuery: OrdersQuery,
    readonly limitOrder: LimitOrderService,
    readonly ethereum: EthereumService,
    readonly trade: TradeService
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  filter(filter: OrdersFilter): void {
    this.ordersService.setFilter(filter);
    this.orders = this.ordersQuery.getList();
  }

  async executeOrder(id): Promise<void> {
    await this.limitOrder.executeTradeLimit(id, this.getSelectedFee() * 100);
    this.loadOrders();
  }

  async cancelOrder(id): Promise<void> {
    await this.limitOrder.cancelTradeLimit(id);
    this.loadOrders();
  }

  applyFee() {
    this.loadOrders();
  }

  private getSelectedFee(): number {
    return this.fee;
  }

  private getTokenForAddress(address: string) {
    if (this.pairs == null) {
      this.pairs = this.trade.getPairs();
    }
    for (const pair of this.pairs) {
      if (pair.firstAddress.toLowerCase() === address.toLowerCase()) {
        return {
          name: pair.firstName,
          icon: pair.firstIcon,
          address: address,
          decimals: pair.firstDecimals,
        };
      }
      if (pair.secondAddress.toLowerCase() === address.toLowerCase()) {
        return {
          name: pair.secondName,
          icon: pair.secondIcon,
          address: address,
          decimals: pair.secondDecimals,
        };
      }
    }
  }

  private async loadOrders(): Promise<void> {
    this.loading = true;
    this.ordersService.setEntities([]);
    this.ordersService.setOwner(
      (await this.ethereum.getAccount()).toLowerCase()
    );
    const total = await this.limitOrder.getTotalTrades();
    this.total = total;
    const end = 0;
    let limitOrders = [];
    if (total > 0) {
      const profitables = await this.limitOrder.getProfitableTradeMultiple(
        this.getSelectedFee() * 100
      );
      for (let i = total - 1; i >= end; i--) {
        const order = await this.limitOrder.getTrades(i);
        order.owner = order.tradeOwner == (await this.ethereum.getAccount());
        order.profitable = profitables[1][i] == '1';
        let amountA = math
          .chain(math.bignumber(order.amountA))
          .divide(
            math.bignumber(
              chain(10)
                .pow(this.getTokenForAddress(order.tokenA).decimals)
                .done()
            )
          )
          .done()
          .toFixed(4);
        let amountB = math
          .chain(math.bignumber(order.amountB))
          .divide(
            math.bignumber(
              chain(10)
                .pow(this.getTokenForAddress(order.tokenB).decimals)
                .done()
            )
          )
          .done()
          .toFixed(4);

        let from = amountA + ' ' + this.getTokenForAddress(order.tokenA).name;
        let to = amountB + ' ' + this.getTokenForAddress(order.tokenB).name;
        order.desc = from + ' to ' + to;
        order.fee =
          math
            .chain(math.bignumber(amountA))
            .multiply(math.bignumber(this.getSelectedFee()))
            .divide(math.bignumber(100))
            .done() +
          ' ' +
          this.getTokenForAddress(order.tokenA).name;
        limitOrders.push(order);
      }
    }
    this.ordersService.setEntities(
      limitOrders.map(
        (order): Order => {
          return {
            id: order.ID,
            owner: order.owner,
            fee: order.fee,
            desc: order.desc,
            profitable: order.profitable,
            limit: order.limit,
            status: order.status,
            tokenA: order.tokenA,
            tokenB: order.tokenB,
            amountA: order.amountA,
            amountB: order.amountB,
          };
        }
      )
    );

    this.loading = false;
  }
}
