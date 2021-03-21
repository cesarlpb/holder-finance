import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ChainId,
  Fetcher,
  Pair,
  Route,
  Token,
  TokenAmount,
  Trade,
  TradeType,
} from '@uniswap/sdk';
import { Subscription } from 'rxjs';
import { AppQuery } from 'src/app/akita/queries/app.query';
import { PairsQuery } from 'src/app/akita/queries/pairs.query';
import { AppService } from 'src/app/akita/services/app.service';
import { AppComponent } from 'src/app/app.component';
import { EthereumService } from 'src/app/services/ethereum.service';
import { LimitOrderService } from 'src/app/services/limitorder.service';
import { math } from 'src/app/services/math';
import { TradeService } from 'src/app/services/trade.service';
import {
  GraphMode,
  GraphPeriod,
  OrdersVisibility,
} from 'src/app/types/limit/trade.types';

declare var TradingView: any;

@Component({
  selector: 'partial-limit-trade',
  templateUrl: './limit-trade.component.html',
  styleUrls: ['./limit-trade.component.scss'],
})
export class LimitTradeComponent implements OnInit, AfterViewInit, OnDestroy {
  currentDark = false;
  from = this.tradeService.getFrom();
  to = this.tradeService.getTo();
  ratio = this.tradeService.getRatioPrice();
  pair = this.tradeService.getPair();
  info = this.tradeService.getInfo();
  liquidity = this.tradeService.getLiquidity();
  moreInfo = this.tradeService.getMoreInfo();
  graphMode = this.tradeService.getGraphMode();
  graphPeriod = this.tradeService.getGraphPeriod();
  transactionsStatus = this.tradeService.getTransactionsStatus();
  transactions = this.tradeService.getTransactions();
  orderVisibility = this.tradeService.getOrderVisibility();
  orders = this.tradeService.getOrders();
  lastPair: Pair;
  limitOrders = null;
  showApproveButton = false;
  filterOrderLimits = true;
  calculatePriceTxt = 'CALCULATE PRICE';

  inputFee: string = '1';

  subscriptions: Subscription[] = [];

  data = AppComponent.data;

  @ViewChild('fromEditable') fromEditable: ElementRef;
  @ViewChild('toEditable') toEditable: ElementRef;
  inputListener;

  constructor(
    private readonly tradeService: TradeService,
    private readonly ethereum: EthereumService,
    public readonly appQuery: AppQuery,
    public readonly appService: AppService,
    public readonly pairsQuery: PairsQuery,
    private readonly limitOrder: LimitOrderService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.pairsQuery.getSelected().subscribe(() => {
        if (this.fromEditable) {
          this.fromEditable.nativeElement.innerText = '0';
          this.toEditable.nativeElement.innerText = '0';
        }
        this.init();
      })
    );
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.appQuery.getDark().subscribe((value) => {
        this.currentDark = value;
        this.initChart();
      })
    );
    this.inputListener = () => this.onChangeFrom();
    this.fromEditable.nativeElement.addEventListener(
      'input',
      this.inputListener
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
    this.fromEditable.nativeElement.removeEventListener(
      'input',
      this.inputListener
    );
  }

  private init() {
    this.from = this.tradeService.getFrom();
    this.to = this.tradeService.getTo();
    this.ratio = this.tradeService.getRatioPrice();
    this.pair = this.tradeService.getPair();
    this.info = this.tradeService.getInfo();
    this.liquidity = this.tradeService.getLiquidity();
    this.moreInfo = this.tradeService.getMoreInfo();
    this.graphMode = this.tradeService.getGraphMode();
    this.graphPeriod = this.tradeService.getGraphPeriod();
    this.transactionsStatus = this.tradeService.getTransactionsStatus();
    this.transactions = this.tradeService.getTransactions();
    this.orderVisibility = this.tradeService.getOrderVisibility();
    this.orders = this.tradeService.getOrders();
    this.getPrice(true);
    this.getBalances();
    this.getLiquidity();
    this.getLastSwaps();
    this.getLimitOrders();
    this.initChart();
  }

  private initChart(): void {

    let pair = this.to.tvPair;
    if (pair === 'KRAKEN:ETHUSD') {
      pair = this.from.tvPair;
    }

    new TradingView.widget({
      autosize: true,
      symbol: pair,
      interval: '5',
      timezone: 'Etc/UTC',
      theme: this.currentDark ? 'dark' : 'light',
      style: '1',
      locale: 'en',
      toolbar_bg: '#f1f3f6',
      enable_publishing: false,
      container_id: 'tradingview_00ae5',
    });
  }

  getSelectedFee(): number {
    return parseFloat(this.inputFee);
  }

  async executeOrder(id): Promise<void> {
    await this.limitOrder.executeTradeLimit(id, this.getSelectedFee() * 100);
    this.getLimitOrders();
  }

  async cancelOrder(id): Promise<void> {
    await this.limitOrder.cancelTradeLimit(id);
    this.getLimitOrders();
  }

  async getLimitOrders(): Promise<void> {
    this.limitOrders = null;
    const total = await this.limitOrder.getTotalTrades();
    const end = 0;
    let limitOrders = [];
    if (total > 0) {
      const profitables = await this.limitOrder.getProfitableTradeMultiple(
        this.getSelectedFee() * 100
      );
      for (let i = total - 1; i >= end; i--) {
        const order = await this.limitOrder.getTrades(i);
        if (this.filterOrderLimits) {
          if (
            order.tokenA.toLowerCase() != this.from.address.toLowerCase() &&
            order.tokenA.toLowerCase() != this.to.address.toLowerCase()
          ) {
            continue;
          }
          if (
            order.tokenB.toLowerCase() != this.from.address.toLowerCase() &&
            order.tokenB.toLowerCase() != this.to.address.toLowerCase()
          ) {
            continue;
          }
        }
        if (order.status != 1) {
          continue;
        }
        order.owner = order.tradeOwner == (await this.ethereum.getAccount());
        order.profitable = profitables[1][i] == '1';

        let amountA = math
          .chain(math.bignumber(order.amountA))
          .divide(
            math
              .bignumber(10)
              .pow(
                math.bignumber(
                  order.tokenA == this.from.address
                    ? this.from.decimals
                    : this.to.decimals
                )
              )
          )
          .done()
          .toFixed(4);

        let amountB = math
          .chain(math.bignumber(order.amountB))
          .divide(
            math
              .bignumber(10)
              .pow(
                math.bignumber(
                  order.tokenB == this.to.address
                    ? this.to.decimals
                    : this.from.decimals
                )
              )
          )
          .done()
          .toFixed(4);

        let from =
          amountA +
          ' ' +
          (order.tokenA == this.from.address ? this.from.name : this.to.name);
        let to =
          amountB +
          ' ' +
          (order.tokenB == this.to.address ? this.to.name : this.from.name);
        order.desc = from + ' to ' + to;
        order.fee =
          math
            .chain(math.bignumber(amountA))
            .multiply(math.bignumber(this.getSelectedFee()))
            .divide(math.bignumber(100))
            .toString() +
          ' ' +
          (order.tokenA == this.from.address ? this.from.name : this.to.name);
        limitOrders.push(order);
      }
    }
    this.limitOrders = limitOrders;
  }

  async getLastSwaps(): Promise<void> {
    const abi = require('../../../types/abis/unipair.json');
    const web3 = this.ethereum.getWeb3();
    const pair = new web3.eth.Contract(
      abi,
      this.tradeService.getPair().address
    );

    const token0 = await pair.methods.token0().call();

    const limitSwaps = 30;
    let fromBlock = 100;
    let swaps = [];
    let i = 0;
    while (swaps.length < limitSwaps) {
      swaps = [
        ...swaps,
        ...(await this.getLastSwapEvents(pair, web3, fromBlock)),
      ];
      fromBlock += fromBlock;
      i++;
      if (i > 20) {
        break;
      }
    }
    swaps = swaps.reverse();
    if (swaps.length > limitSwaps) {
      swaps = swaps.slice(0, limitSwaps);
    }

    const transactions = [];
    const blockTimes = {};

    for (const swap of swaps) {
      if (!blockTimes[swap.blockNumber]) {
        blockTimes[swap.blockNumber] = new Date(
          (await web3.eth.getBlock(swap.blockNumber)).timestamp * 1000
        );
      }

      let from = this.from.address == token0 ? this.from.name : this.to.name;
      let to = this.from.address == token0 ? this.to.name : this.from.name;
      let fromDecimals =
        this.from.address == token0 ? this.from.decimals : this.to.decimals;
      let toDecimals =
        this.from.address == token0 ? this.to.decimals : this.from.decimals;
      if (swap.returnValues.amount0In == 0) {
        const temp = to;
        to = from;
        from = temp;
        const tempDecimals = toDecimals;
        toDecimals = fromDecimals;
        fromDecimals = tempDecimals;
      }
      transactions.push({
        type: 'SWAP ' + from + ' TO ' + to,
        value:
          (swap.returnValues.amount0Out != 0
            ? (
                parseInt(swap.returnValues.amount0Out, undefined) /
                10 ** fromDecimals
              ).toFixed(2)
            : (
                parseInt(swap.returnValues.amount1Out, undefined) /
                10 ** fromDecimals
              ).toFixed(2)) +
          ' ' +
          from,
        created: blockTimes[swap.blockNumber],
      });
    }
    this.transactions = transactions;
  }

  private async getLastSwapEvents(contract, web3, blocks): Promise<object[]> {
    return await contract.getPastEvents(
      'Swap',
      {},
      {
        fromBlock: (await web3.eth.getBlockNumber()) - blocks,
        toBlock: 'latest',
      }
    );
  }

  async getLiquidity(): Promise<void> {
    const pairAddress = this.tradeService.getPair().address.toLowerCase();

    const global = await (
      await fetch(
        'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
        {
          credentials: 'omit',
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
          referrer: 'https://thegraph.com/explorer/subgraph/uniswap/uniswap-v2',
          body:
            '{"query":"{\\n pair(id: \\"' +
            pairAddress +
            '\\"){\\n     reserveUSD\\n }\\n}","variables":null}',
          method: 'POST',
          mode: 'cors',
        }
      )
    ).json();

    this.info[0].total = parseInt(global.data.pair.reserveUSD, undefined);

    const res = await (
      await fetch(
        'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
        {
          credentials: 'omit',
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
          referrer: 'https://thegraph.com/explorer/subgraph/uniswap/uniswap-v2',
          body:
            '{"query":"{\\n pairDayDatas(first:1, orderBy: date, orderDirection: asc,\\n   where: {\\n     pairAddress: \\"' +
            pairAddress +
            '\\",\\n     date_gt: 1614294048\\n   }\\n ) {\\n     date\\n     dailyVolumeToken0\\n     dailyVolumeToken1\\n     dailyVolumeUSD\\n     reserveUSD\\n }\\n}","variables":null}',
          method: 'POST',
          mode: 'cors',
        }
      )
    ).json();
    this.info[1].total = parseInt(
      res.data.pairDayDatas[0].dailyVolumeUSD,
      undefined
    );
    this.info[2].total = this.info[1].total * 0.003;
  }

  async getPrice(forceRefresh?: boolean): Promise<void> {
    const pair = await this.getPair(forceRefresh);
    const route = this.getRoute(pair);

    const reserve0 = pair.reserve0.toSignificant(6);
    const reserve1 = pair.reserve1.toSignificant(6);

    this.liquidity.from = reserve0;
    this.liquidity.to = reserve1;

    this.ratio = {
      selected: 'ONE-TO',
      oneTo: route.midPrice.toSignificant(6),
      oneFrom: route.midPrice.invert().toSignificant(6),
    };
  }

  async getTradePrice(amount: number, forceRefresh: boolean): Promise<void> {
    if (amount == 0) {
      return;
    }

    const pair = await this.getPair(forceRefresh);

    const route = this.getRoute(pair);

    const amountIn = amount.toLocaleString('fullwide', {
      useGrouping: false,
    });

    const trade = new Trade(
      route,
      new TokenAmount(
        new Token(ChainId.MAINNET, this.from.address, this.from.decimals),
        amountIn
      ),
      TradeType.EXACT_INPUT
    );

    this.toEditable.nativeElement.innerText = trade.outputAmount.toSignificant(
      6
    );

    this.moreInfo.impact = parseFloat(trade.priceImpact.toSignificant(4));
    const outputAmount = parseFloat(trade.outputAmount.toSignificant(6));
    this.moreInfo.minReceived = math
      .bignumber(outputAmount)
      .sub(
        math
          .chain(math.bignumber(outputAmount))
          .multiply(math.bignumber(0.5))
          .divide(math.bignumber(100))
          .done()
      )
      .toFixed(4); // Apply 0.5% of slippage
    this.moreInfo.liquidity = math
      .chain(math.bignumber(parseFloat(trade.inputAmount.toSignificant(6))))
      .multiply(math.bignumber(0.3))
      .divide(math.bignumber(100))
      .done()
      .toFixed(4);

    this.calculatePriceTxt = 'CALCULATE PRICE';
  }

  private async getPair(forceRefresh?: boolean): Promise<Pair> {
    if (this.lastPair && !forceRefresh) {
      return this.lastPair;
    }
    const tokenA = new Token(
      ChainId.MAINNET,
      this.from.address,
      this.from.decimals
    );
    const tokenB = new Token(
      ChainId.MAINNET,
      this.to.address,
      this.to.decimals
    );

    this.lastPair = await Fetcher.fetchPairData(tokenA, tokenB);
    return this.lastPair;
  }

  private getRoute(pair: Pair): Route {
    return new Route(
      [pair],
      new Token(ChainId.MAINNET, this.from.address, this.from.decimals),
      new Token(ChainId.MAINNET, this.to.address, this.to.decimals)
    );
  }

  async getBalances(): Promise<void> {
    const abi = require('../../../types/abis/erc20.json');
    const web3 = this.ethereum.getWeb3();
    const tokenA = new web3.eth.Contract(abi, this.from.address);
    const tokenB = new web3.eth.Contract(abi, this.to.address);
    const balanceA = await tokenA.methods
      .balanceOf(await this.ethereum.getAccount())
      .call();

    this.from.balance = math
      .chain(math.bignumber(balanceA))
      .divide(
        math
          .chain(math.bignumber(10))
          .pow(math.bignumber(this.from.decimals))
          .done()
      )
      .done()
      .toFixed(4);
    const balanceB = await tokenB.methods
      .balanceOf(await this.ethereum.getAccount())
      .call();
    this.to.balance = math
      .chain(math.bignumber(balanceB))
      .divide(
        math
          .chain(math.bignumber(10))
          .pow(math.bignumber(this.to.decimals))
          .done()
      )
      .done()
      .toFixed(4);
  }

  async onChangeFrom(): Promise<void> {
    if (this.fromEditable.nativeElement.innerText.trim() == '') {
      this.getTradePrice(0, false);
      return;
    }

    this.getTradePrice(
      parseFloat(this.fromEditable.nativeElement.innerText) *
        10 ** this.from.decimals,
      false
    );

    this.showApproveButton = !(await this.limitOrder.allowedToken(
      this.from.address,
      parseFloat(this.fromEditable.nativeElement.innerText),
      this.from.decimals
    ));
  }

  async limitTrade(): Promise<void> {
    await this.limitOrder.createTradeLimit(
      this.from.address,
      parseFloat(this.fromEditable.nativeElement.innerText) *
        10 ** this.from.decimals,
      this.to.address,
      parseFloat(this.toEditable.nativeElement.innerText) *
        10 ** this.to.decimals
    );
    this.getLimitOrders();
  }

  async approve(): Promise<void> {
    await this.limitOrder.erc20Allowance(
      this.from.address,
      this.limitOrder.getContractAddress(),
      BigInt(
        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
      )
    );
    this.onChangeFrom();
  }

  marketTrade(): void {
    this.calculatePriceTxt = '...';
    this.getTradePrice(
      parseFloat(this.fromEditable.nativeElement.innerText) *
        10 ** this.from.decimals,
      true
    );
  }

  max(): void {
    this.fromEditable.nativeElement.innerText = this.from.balance;
    this.inputListener();
  }

  toggleRatio(): void {
    this.ratio.oneFrom = '...';
    this.ratio.oneTo = '...';
    const tempFrom = this.from;
    this.from = this.to;
    this.to = tempFrom;
    this.initChart();

    const tempFromInput = this.fromEditable.nativeElement.innerText;
    this.fromEditable.nativeElement.innerText = this.toEditable.nativeElement.innerText;
    this.toEditable.nativeElement.innerText = tempFromInput;

    this.lastPair = null;
    this.onChangeFrom();
    this.getPrice();
  }

  setGraphMode(mode: GraphMode): void {
    this.graphMode = mode;
  }

  setGraphPeriod(period: GraphPeriod): void {
    this.graphPeriod = period;
  }

  toggleTransactionDate(): void {
    this.transactionsStatus.order =
      this.transactionsStatus.order === 'TIME ASC' ? 'TIME DESC' : 'TIME ASC';
  }

  selectPair(): void {
    this.appService.setPopup('SELECT_PAIR');
  }

  toggleTransactionValue(): void {
    this.transactionsStatus.order =
      this.transactionsStatus.order === 'VALUE ASC'
        ? 'VALUE DESC'
        : 'VALUE ASC';
  }

  updateOrderVisibility(value: OrdersVisibility): void {
    this.tradeService.setOrderVisibility(value);

    this.orderVisibility = this.tradeService.orderVisibility;
  }

  openLimitTrade(): void {
    this.appService.setPopup('LIMIT_TRADE');
  }
}
