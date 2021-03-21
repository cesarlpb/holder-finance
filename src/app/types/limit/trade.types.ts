export type GraphMode = 'LIQUIDITY' | 'VOLUME' | 'FROM-TO' | 'TO-FROM';

export type GraphPeriod = 'WEEK' | 'MONTH' | 'ALL';

export type TransactionsFilter = {
  type: 'ALL' | 'FROM' | 'TO';
  order: 'TIME ASC' | 'TIME DESC' | 'VALUE ASC' | 'VALUE DESC';
};

export type LimitSection = 'INFO' | 'ACTIONS' | 'SELECT_PAIR' | 'TRADE';

export type RatioPrice = {
  selected: 'ONE-TO' | 'ONE-FROM';
  oneTo: number;
  oneFrom: number;
};

export type OrdersVisibility = 'ALL' | 'OVER' | 'UNDER';

export type Order = {
  price: number;
  amount: number;
  total: number;
};

export type OrdersList = {
  last: { price: number, direction: 'UP' | 'DOWN', fiat: number },
  under: Order[],
  over: Order[]
};
