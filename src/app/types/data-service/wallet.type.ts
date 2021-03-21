export type Wallet = {
  address: string;
  currency: string;
  amount: number;
  transactions: { id: string; amound: number }[];
};

export const EmptyWallet: Wallet = {
  address: null,
  currency: null,
  amount: null,
  transactions: null,
};
