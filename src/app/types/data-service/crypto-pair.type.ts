export type CryptoPair = {
  id: string;
  firstIcon: string;
  firstName: string;
  firstAddress: string;
  firstDecimals: number;
  secondIcon: string;
  secondName: string;
  secondAddress: string;
  secondDecimals: number;
  firstTVSymbol: string;
  secondTVSymbol: string;
  selected?: boolean;
  fee?: boolean;
}