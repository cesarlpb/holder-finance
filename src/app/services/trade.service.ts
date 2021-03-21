import { Injectable } from '@angular/core';
import { getCreate2Address } from '@ethersproject/address';
import { keccak256, pack } from '@ethersproject/solidity';
import { FACTORY_ADDRESS, INIT_CODE_HASH } from '@uniswap/sdk';
import { PairsQuery } from '../akita/queries/pairs.query';
import { CryptoPair } from '../types/data-service/crypto-pair.type';
import {
  GraphMode,
  GraphPeriod,
  OrdersList,
  OrdersVisibility,
  TransactionsFilter,
} from '../types/limit/trade.types';
import { EthereumService } from './ethereum.service';

@Injectable()
export class TradeService {
  selected: CryptoPair;

  constructor(
    readonly pairsQuery: PairsQuery,
    readonly ethereum: EthereumService
  ) {}

  graphMode: GraphMode = 'LIQUIDITY';
  graphPeriod: GraphPeriod = 'MONTH';
  transactionsStatus: TransactionsFilter = {
    type: 'ALL',
    order: 'TIME ASC',
  };
  transactions = [];
  orderVisibility: OrdersVisibility = 'ALL';
  orders: OrdersList = {
    last: {
      price: 36720.4,
      direction: 'DOWN',
      fiat: 30569.71,
    },
    over: [
      {
        price: 36720.42,
        amount: 0.05011,
        total: 1840.0602462,
      },
      {
        price: 36720.42,
        amount: 0.05011,
        total: 1840.0602462,
      },
      {
        price: 36720.42,
        amount: 0.05011,
        total: 1840.0602462,
      },
      {
        price: 36720.42,
        amount: 0.05011,
        total: 1840.0602462,
      },
      {
        price: 36720.42,
        amount: 0.05011,
        total: 1840.0602462,
      },
      {
        price: 36720.42,
        amount: 0.05011,
        total: 1840.0602462,
      },
      {
        price: 36720.42,
        amount: 0.05011,
        total: 1840.0602462,
      },
      {
        price: 36720.42,
        amount: 0.05011,
        total: 1840.0602462,
      },
      {
        price: 36720.42,
        amount: 0.05011,
        total: 1840.0602462,
      },
      {
        price: 36720.42,
        amount: 0.05011,
        total: 1840.0602462,
      },
      {
        price: 36720.42,
        amount: 0.05011,
        total: 1840.0602462,
      },
      {
        price: 36720.42,
        amount: 0.05011,
        total: 1840.0602462,
      },
      {
        price: 36720.42,
        amount: 0.05011,
        total: 1840.0602462,
      },
      {
        price: 36720.42,
        amount: 0.05011,
        total: 1840.0602462,
      },
      {
        price: 36720.42,
        amount: 0.05011,
        total: 1840.0602462,
      },
      {
        price: 36720.42,
        amount: 0.05011,
        total: 1840.0602462,
      },
      {
        price: 36720.42,
        amount: 0.05011,
        total: 1840.0602462,
      },
    ],
    under: [
      {
        price: 36717.42,
        amount: 0.05021,
        total: 1843.5816582,
      },
      {
        price: 36717.42,
        amount: 0.05021,
        total: 1843.5816582,
      },
      {
        price: 36717.42,
        amount: 0.05021,
        total: 1843.5816582,
      },
      {
        price: 36717.42,
        amount: 0.05021,
        total: 1843.5816582,
      },
      {
        price: 36717.42,
        amount: 0.05021,
        total: 1843.5816582,
      },
      {
        price: 36717.42,
        amount: 0.05021,
        total: 1843.5816582,
      },
      {
        price: 36717.42,
        amount: 0.05021,
        total: 1843.5816582,
      },
      {
        price: 36717.42,
        amount: 0.05021,
        total: 1843.5816582,
      },
      {
        price: 36717.42,
        amount: 0.05021,
        total: 1843.5816582,
      },
      {
        price: 36717.42,
        amount: 0.05021,
        total: 1843.5816582,
      },
      {
        price: 36717.42,
        amount: 0.05021,
        total: 1843.5816582,
      },
      {
        price: 36717.42,
        amount: 0.05021,
        total: 1843.5816582,
      },
      {
        price: 36717.42,
        amount: 0.05021,
        total: 1843.5816582,
      },
      {
        price: 36717.42,
        amount: 0.05021,
        total: 1843.5816582,
      },
      {
        price: 36717.42,
        amount: 0.05021,
        total: 1843.5816582,
      },
      {
        price: 36717.42,
        amount: 0.05021,
        total: 1843.5816582,
      },
      {
        price: 36717.42,
        amount: 0.05021,
        total: 1843.5816582,
      },
      {
        price: 36717.42,
        amount: 0.05021,
        total: 1843.5816582,
      },
      {
        price: 36717.42,
        amount: 0.05021,
        total: 1843.5816582,
      },
      {
        price: 36717.42,
        amount: 0.05021,
        total: 1843.5816582,
      },
      {
        price: 36717.42,
        amount: 0.05021,
        total: 1843.5816582,
      },
    ],
  };

  getFrom() {
    const selectedPair = this.getSelectedPair();
    return {
      name: selectedPair.firstName,
      icon: selectedPair.firstIcon,
      amount: 0,
      balance: 0,
      address: selectedPair.firstAddress,
      decimals: selectedPair.firstDecimals,
      tvPair: selectedPair.firstTVSymbol,
    };
  }

  getTo() {
    const selectedPair = this.getSelectedPair();
    return {
      name: selectedPair.secondName,
      icon: selectedPair.secondIcon,
      amount: 0,
      balance: 0,
      address: selectedPair.secondAddress,
      decimals: selectedPair.secondDecimals,
      tvPair: selectedPair.secondTVSymbol,
    };
  }

  getRatioPrice() {
    return {
      selected: 'ONE-TO',
      oneTo: '...',
      oneFrom: '...',
    };
  }

  getPair() {
    const pair = this.getSelectedPair();

    return {
      name: pair.firstName + '-' + pair.secondName,
      address: getCreate2Address(
        FACTORY_ADDRESS,
        keccak256(
          ['bytes'],
          [
            pack(
              ['address', 'address'],
              [pair.firstAddress, pair.secondAddress]
            ),
          ]
        ),
        INIT_CODE_HASH
      ),
    };
  }

  getInfo() {
    return [
      {
        title: 'TOTAL LIQUIDITY',
        total: 0,
      },
      {
        title: 'VOLUME (24HRS)',
        total: 0,
      },
      {
        title: 'FEES (24HRS)',
        total: 0,
      },
    ];
  }

  getLiquidity() {
    return {
      from: '0',
      to: '0',
    };
  }

  getMoreInfo() {
    return {
      minReceived: 0,
      impact: 0,
      liquidity: 0,
    };
  }

  getGraphMode() {
    return this.graphMode;
  }

  getGraphPeriod() {
    return this.graphPeriod;
  }

  getTransactionsStatus() {
    return this.transactionsStatus;
  }

  getTransactions() {
    return this.transactions;
  }

  getOrderVisibility(): OrdersVisibility {
    return this.orderVisibility;
  }

  setOrderVisibility(status: OrdersVisibility): void {
    this.orderVisibility = status;
  }

  getOrders(): OrdersList {
    return this.orders;
  }

  getSelectedPair(): CryptoPair {
    return this.selected || this.getPairs()[0];
  }

  // Get TV symbol from: https://es.tradingview.com/widget/advanced-chart/
  getPairs(): CryptoPair[] {
    return this.ethereum.isTestNet()
      ? [
          {
            id: '0x082bEb9E2e22C205508C1d25023ECAAdda58B9B6',
            firstIcon: '/assets/icons/tmp/usdc.svg',
            firstName: 'USDC',
            firstAddress: '0xf2D1DCB27E3177b9466D0dc610797C0B5acf57D0',
            firstTVSymbol: 'KRAKEN:USDCUSD',
            firstDecimals: 6,
            secondIcon: '/assets/icons/tmp/weth.svg',
            secondName: 'HFI',
            secondAddress: '0x3Eb350B716A0d0ceE6d7c24CeD0e467A6954C6D4',
            secondDecimals: 6,
            secondTVSymbol: 'KRAKEN:ETHUSD',
          },
        ]
      : [
          {
            id: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc',
            firstIcon: '/assets/icons/tmp/usdc.svg',
            firstName: 'USDC',
            firstAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
            firstTVSymbol: 'UNISWAP:USDCWETH',
            firstDecimals: 6,
            secondIcon: '/assets/icons/tmp/weth.svg',
            secondName: 'WETH',
            secondAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            secondDecimals: 18,
            secondTVSymbol: 'UNISWAP:USDCWETH',
          },
          {
            id: '0xA478c2975Ab1Ea89e8196811F51A7B7Ade33eB11',
            firstIcon: '/assets/icons/tmp/dai.svg',
            firstName: 'DAI',
            firstAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
            firstTVSymbol: 'UNISWAP:DAIWETH',
            firstDecimals: 18,
            secondIcon: '/assets/icons/tmp/weth.svg',
            secondName: 'WETH',
            secondAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            secondDecimals: 18,
            secondTVSymbol: 'UNISWAP:DAIWETH',
          },
          {
            id: '0x598e7A017dAce2534Bc3F7496124C89425b1E165',
            firstAddress: '0x8e870d67f660d95d5be530380d0ec0bd388289e1',
            firstDecimals: 18,
            firstIcon: '/assets/icons/tmp/pax.svg',
            firstName: 'PAX',
            firstTVSymbol: 'UNISWAP:PAXWETH',
            secondAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            secondDecimals: 18,
            secondIcon: '/assets/icons/tmp/weth.svg',
            secondName: 'WETH',
            secondTVSymbol: 'UNISWAP:PAXWETH',
          },
          {
            id: '0xFA71C9D1ec99b1d5f55aeE8bF2A2130A37eA9469',
            firstAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
            firstDecimals: 6,
            firstIcon: '/assets/icons/tmp/usdt.svg',
            firstName: 'USDT',
            firstTVSymbol: 'UNISWAP:WETHUSDT',
            secondAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            secondDecimals: 18,
            secondIcon: '/assets/icons/tmp/weth.svg',
            secondName: 'WETH',
            secondTVSymbol: 'UNISWAP:WETHUSDT',
          },
          {
            id: '0x26aAd2da94C59524ac0D93F6D6Cbf9071d7086f2',
            firstAddress: '0x111111111117dc0aa78b770fa6a738034120c302',
            firstDecimals: 18,
            firstIcon: '/assets/icons/tmp/1inch.svg',
            firstName: '1INCH',
            firstTVSymbol: 'UNISWAP:1INCHWETH',
            secondAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            secondDecimals: 18,
            secondIcon: '/assets/icons/tmp/weth.svg',
            secondName: 'WETH',
            secondTVSymbol: 'UNISWAP:1INCHWETH',
          },
          {
            id: '0xDFC14d2Af169B0D36C4EFF567Ada9b2E0CAE044f',
            firstAddress: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
            firstDecimals: 18,
            firstIcon: '/assets/icons/tmp/aave.svg',
            firstName: 'AAVE',
            firstTVSymbol: 'UNISWAP:AAVEWETH',
            secondAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            secondDecimals: 18,
            secondIcon: '/assets/icons/tmp/weth.svg',
            secondName: 'WETH',
            secondTVSymbol: 'UNISWAP:AAVEWETH',
          },
          {
            id: '0x654def3E97C3F4218C3f49ace81687483C361b2b',
            firstAddress: '0x910524678c0b1b23ffb9285a81f99c29c11cbaed',
            firstDecimals: 18,
            firstIcon: '/assets/icons/tmp/azuki.svg',
            firstName: 'AZUKI',
            firstTVSymbol: 'UNISWAP:AZUKIWETH',
            secondAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            secondDecimals: 18,
            secondIcon: '/assets/icons/tmp/weth.svg',
            secondName: 'WETH',
            secondTVSymbol: 'UNISWAP:AZUKIWETH',
            fee: true,
          },
          {
            id: '0x0F9768eE0914c48f65234Cf10e8aEb6028C8426C',
            firstAddress: '0x25e1474170c4c0aa64fa98123bdc8db49d7802fa',
            firstDecimals: 18,
            firstIcon: 'https://etherscan.io/token/images/bidao_32.png',
            firstName: 'BID',
            firstTVSymbol: 'UNISWAP:BIDWETH',
            secondAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            secondDecimals: 18,
            secondIcon: '/assets/icons/tmp/weth.svg',
            secondName: 'WETH',
            secondTVSymbol: 'UNISWAP:BIDWETH',
          },
          {
            id: '0x6591c4BcD6D7A1eb4E537DA8B78676C1576Ba244',
            firstAddress: '0x0391d2021f89dc339f60fff84546ea23e337750f',
            firstDecimals: 18,
            firstIcon: 'https://etherscan.io/token/images/barnbridge_32.png',
            firstName: 'BOND',
            firstTVSymbol: 'UNISWAP:BONDWETH',
            secondAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
            secondDecimals: 6,
            secondIcon: '/assets/icons/tmp/usdc.svg',
            secondName: 'USDC',
            secondTVSymbol: 'UNISWAP:BONDWETH',
          },
          {
            id: '0xa5E79baEe540f000ef6F23D067cd3AC22c7d9Fe6',
            firstAddress: '0xaaaebe6fe48e54f431b0c390cfaf0b017d09d42d',
            firstDecimals: 4,
            firstIcon: 'https://etherscan.io/token/images/celsiustoken1_28.png',
            firstName: 'CEL',
            firstTVSymbol: 'UNISWAP:CELWETH',
            secondAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            secondDecimals: 18,
            secondIcon: '/assets/icons/tmp/weth.svg',
            secondName: 'WETH',
            secondTVSymbol: 'UNISWAP:CELWETH',
          },
          {
            id: '0x32Ce7e48debdccbFE0CD037Cc89526E4382cb81b',
            firstAddress: '0x62359ed7505efc61ff1d56fef82158ccaffa23d7',
            firstDecimals: 18,
            firstIcon: 'https://etherscan.io/token/images/core_32.png',
            firstName: 'CORE',
            firstTVSymbol: 'UNISWAP:COREWETH',
            secondAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            secondDecimals: 18,
            secondIcon: '/assets/icons/tmp/weth.svg',
            secondName: 'WETH',
            secondTVSymbol: 'UNISWAP:COREWETH',
          },
          {
            id: '0x37a0464f8F4c207B54821f3C799Afd3D262Aa944',
            firstAddress: '0x26ce25148832c04f3d7f26f32478a9fe55197166',
            firstDecimals: 18,
            firstIcon: 'https://etherscan.io/token/images/dextools_32.png',
            firstName: 'DEXT',
            firstTVSymbol: 'UNISWAP:DEXTWETH',
            secondAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            secondDecimals: 18,
            secondIcon: '/assets/icons/tmp/weth.svg',
            secondName: 'WETH',
            secondTVSymbol: 'UNISWAP:DEXTWETH',
          },
          {
            id: '0x1D4b2B2a2Ca8762410801b51f128B73743439E39',
            firstAddress: '0x9ceb84f92a0561fa3cc4132ab9c0b76a59787544',
            firstDecimals: 18,
            firstIcon: 'https://etherscan.io/token/images/dokidoki_32.png',
            firstName: 'DOKI',
            firstTVSymbol: 'UNISWAP:DOKIWETH',
            secondAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            secondDecimals: 18,
            secondIcon: '/assets/icons/tmp/weth.svg',
            secondName: 'WETH',
            secondTVSymbol: 'UNISWAP:DOKIWETH',
          },
          {
            id: '0x4d5ef58aAc27d99935E5b6B4A6778ff292059991',
            firstAddress: '0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b',
            firstDecimals: 18,
            firstIcon: 'https://etherscan.io/token/images/dpi_32.png',
            firstName: 'DPI',
            firstTVSymbol: 'UNISWAP:DPIWETH',
            secondAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            secondDecimals: 18,
            secondIcon: '/assets/icons/tmp/weth.svg',
            secondName: 'WETH',
            secondTVSymbol: 'UNISWAP:DPIWETH',
          },
          {
            id: '0x514906FC121c7878424a5C928cad1852CC545892',
            firstAddress: '0xa0246c9032bc3a600820415ae600c6388619a14d',
            firstDecimals: 18,
            firstIcon:
              'https://etherscan.io/token/images/HarvestFinance_32.png',
            firstName: 'FARM',
            firstTVSymbol: 'UNISWAP:FARMUSDC',
            secondAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
            secondDecimals: 6,
            secondIcon: '/assets/icons/tmp/usdc.svg',
            secondName: 'USDC',
            secondTVSymbol: 'UNISWAP:FARMUSDC',
          },
          {
            id: '0x56feAccb7f750B997B36A68625C7C596F0B41A58',
            firstAddress: '0xa0246c9032bc3a600820415ae600c6388619a14d',
            firstDecimals: 18,
            firstIcon:
              'https://etherscan.io/token/images/HarvestFinance_32.png',
            firstName: 'FARM',
            firstTVSymbol: 'UNISWAP:FARMWETH',
            secondAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            secondDecimals: 18,
            secondIcon: '/assets/icons/tmp/weth.svg',
            secondName: 'WETH',
            secondTVSymbol: 'UNISWAP:FARMWETH',
          },
          {
            id: '0xbb735BB2eA9fCa1bDb331a57D4F238B2dA02fD87',
            firstAddress: '0xc944e90c64b2c07662a292be6244bdf05cda44a7',
            firstDecimals: 18,
            firstIcon: 'https://etherscan.io/token/images/TheGraph_32.png',
            firstName: 'GRT',
            firstTVSymbol: 'BINANCE:GRTUSDT',
            secondAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
            secondDecimals: 6,
            secondIcon: '/assets/icons/tmp/usdc.svg',
            secondName: 'USDC',
            secondTVSymbol: 'BINANCE:GRTUSDT',
          },
          {
            id: '0xd884bD3f91921A368aa6De23c0fEc81758e186c5',
            firstAddress: '0xc944e90c64b2c07662a292be6244bdf05cda44a7',
            firstDecimals: 18,
            firstIcon: 'https://etherscan.io/token/images/TheGraph_32.png',
            firstName: 'GRT',
            firstTVSymbol: 'KRAKEN:GRTETH',
            secondAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            secondDecimals: 18,
            secondIcon: '/assets/icons/tmp/weth.svg',
            secondName: 'WETH',
            secondTVSymbol: 'KRAKEN:GRTETH',
          },
          {
            id: '0xa2107FA5B38d9bbd2C461D6EDf11B11A50F6b974',
            firstAddress: '0x514910771af9ca656af840dff83e8264ecf986ca',
            firstDecimals: 18,
            firstIcon: 'https://etherscan.io/token/images/chainlink_28_2.png',
            firstName: 'LINK',
            firstTVSymbol: 'UNISWAP:LINKWETH',
            secondAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            secondDecimals: 18,
            secondIcon: '/assets/icons/tmp/weth.svg',
            secondName: 'WETH',
            secondTVSymbol: 'UNISWAP:LINKWETH',
          },
          {
            id: '0xC2aDdA861F89bBB333c90c492cB837741916A225',
            firstAddress: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
            firstDecimals: 18,
            firstIcon: 'https://etherscan.io/token/images/mkr-etherscan-35.png',
            firstName: 'MKR',
            firstTVSymbol: 'UNISWAP:MKRWETH',
            secondAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            secondDecimals: 18,
            secondIcon: '/assets/icons/tmp/weth.svg',
            secondName: 'WETH',
            secondTVSymbol: 'UNISWAP:MKRWETH',
          },
          {
            id: '0x6C8b0Dee9E90EA9F790DA5DaF6f5B20D23B39689',
            firstAddress: '0x0258f474786ddfd37abce6df6bbb1dd5dfc4434a',
            firstDecimals: 8,
            firstIcon: 'https://etherscan.io/token/images/orionprotocol_32.png',
            firstName: 'ORN',
            firstTVSymbol: 'UNISWAP:ORNWETH',
            secondAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            secondDecimals: 18,
            secondIcon: '/assets/icons/tmp/weth.svg',
            secondName: 'WETH',
            secondTVSymbol: 'UNISWAP:ORNWETH',
          },
          {
            id: '0x4C8341379E95f70c08Defb76C4F9C036525edc30',
            firstAddress: '0xa1afffe3f4d611d252010e3eaf6f4d77088b0cd7',
            firstDecimals: 9,
            firstIcon: 'https://etherscan.io/token/images/reflect_32.png',
            firstName: 'RFI',
            firstTVSymbol: 'UNISWAP:RFIWETH',
            secondAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            secondDecimals: 18,
            secondIcon: '/assets/icons/tmp/weth.svg',
            secondName: 'WETH',
            secondTVSymbol: 'UNISWAP:RFIWETH',
            fee: true,
          },
          {
            id: '0x43AE24960e5534731Fc831386c07755A2dc33D47',
            firstAddress: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
            firstDecimals: 18,
            firstIcon: 'https://etherscan.io/token/images/SynthetixSNX_32.png',
            firstName: 'SNX',
            firstTVSymbol: 'UNISWAP:SNXWETH',
            secondAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            secondDecimals: 18,
            secondIcon: '/assets/icons/tmp/weth.svg',
            secondName: 'WETH',
            secondTVSymbol: 'UNISWAP:SNXWETH',
          },
          {
            id: '0xd3d2E2692501A5c9Ca623199D38826e513033a17',
            firstAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
            firstDecimals: 18,
            firstIcon: '/assets/icons/tmp/uni.svg',
            firstName: 'UNI',
            firstTVSymbol: 'UNISWAP:UNIWETH',
            secondAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            secondDecimals: 18,
            secondIcon: '/assets/icons/tmp/weth.svg',
            secondName: 'WETH',
            secondTVSymbol: 'UNISWAP:UNIWETH',
          },
          {
            id: '0x2fDbAdf3C4D5A8666Bc06645B8358ab803996E28',
            firstAddress: '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e',
            firstDecimals: 18,
            firstIcon: 'https://etherscan.io/token/images/yfi_32.png',
            firstName: 'YFI',
            firstTVSymbol: 'UNISWAP:YFIWETH',
            secondAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            secondDecimals: 18,
            secondIcon: '/assets/icons/tmp/weth.svg',
            secondName: 'WETH',
            secondTVSymbol: 'UNISWAP:YFIWETH',
          },
          {
            id: '0xBb2b8038a1640196FbE3e38816F3e67Cba72D940',
            firstAddress: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
            firstDecimals: 8,
            firstIcon: 'https://etherscan.io/token/images/wbtc_28.png?v=1',
            firstName: 'WBTC',
            firstTVSymbol: 'UNISWAP:WBTCWETH',
            secondAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            secondDecimals: 18,
            secondIcon: '/assets/icons/tmp/weth.svg',
            secondName: 'WETH',
            secondTVSymbol: 'UNISWAP:WBTCWETH',
          },
          {
            id: '0x004375Dff511095CC5A197A54140a24eFEF3A416',
            firstAddress: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
            firstDecimals: 8,
            firstIcon: 'https://etherscan.io/token/images/wbtc_28.png?v=1',
            firstName: 'WBTC',
            firstTVSymbol: 'UNISWAP:WBTCUSDC',
            secondAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
            secondDecimals: 6,
            secondIcon: '/assets/icons/tmp/usdc.svg',
            secondName: 'USDC',
            secondTVSymbol: 'UNISWAP:WBTCUSDC',
          },
          {
            id: '0x21b8065d10f73EE2e260e5B47D3344d3Ced7596E',
            firstAddress: '0x66a0f676479cee1d7373f3dc2e2952778bff5bd6',
            firstDecimals: 18,
            firstIcon: '/assets/icons/tmp/wise.svg',
            firstName: 'WISE',
            firstTVSymbol: 'UNISWAP:WISEWETH',
            secondAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            secondDecimals: 18,
            secondIcon: '/assets/icons/tmp/weth.svg',
            secondName: 'WETH',
            secondTVSymbol: 'UNISWAP:WISEWETH',
          },
        ];
  }
}
