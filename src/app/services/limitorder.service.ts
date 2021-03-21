import { Injectable } from '@angular/core';
import { EthereumService } from './ethereum.service';

@Injectable()
export class LimitOrderService {

  private contractAddress = '0xEe6C8e03a08172F5F2e8D1e54F937099d268EdBC';
  private contractAddressTestNet = '0xD4b2395285e81DDF22b2D6ee9E88D6DcCf1AB59E';

  private static testNet = true;

  private limitContract;

  constructor(private readonly ethereum: EthereumService) {
  }

  /**
   * Read methods
   */
  async getTotalTrades() {
    return await this.getLimitContract().methods.totalTrades().call();
  }

  async getProfitableTradeMultiple(_feePercentage) {
    return await this.getLimitContract().methods.profitableTradeMultiple(_feePercentage).call();
  }

  // lo SC - getStatusTrade(_status) // 1 = active, 2 = close, 3 = canceled
  async getStatusTrade(_status) {
    return await this.getLimitContract().methods.statusTrade(_status).call();
  }

  async getTradeByOwner(_owner) {
    return await this.getLimitContract().methods.tradeByOwner(_owner).call();
  }

  // lo SC - getStatusTradeByOwner(_status, _owner) // 1 = active, 2 = close, 3 = canceled
  async getStatusTradeByOwner(_status, _owner) {
    return await this.getLimitContract().methods.statusTradeByOwner(_owner, _status).call();
  }

  async getTrades(_id) {
    return await this.getLimitContract().methods.trades(_id).call();
  }

  async isValidPair(_tokenA, _tokenB) {
    return await this.getLimitContract().methods.isValidPair(_tokenA, _tokenB).call();
  }

  async currentTime() {
    return await this.getLimitContract().methods.currentTime().call();
  }

  async allowedToken(tokenAddress: string, amount: number, decimals: number): Promise<boolean> {
    const account = await this.ethereum.getAccount();
    const web3 = this.ethereum.getWeb3();
    const erc20Token = new web3.eth.Contract(require('../types/abis/erc20.json'), tokenAddress);

    const allowance = await erc20Token.methods
      .allowance(account, this.getContractAddress())
      .call();

    // tslint:disable-next-line: triple-equals
    return allowance >= amount * (10 * decimals);
  }

  /**
   * Write methods
   */

  async createTradeLimit(_tokenOffer, _amountOffer, _tokenRequest, _amountRequest): Promise<void> {
    let dataValue;
    (_tokenOffer == "0x0000000000000000000000000000000000000000") ? dataValue = _amountOffer : dataValue = 0;
    console.log(_amountOffer.toFixed());
    console.log(_amountRequest.toFixed());

    return await this.getLimitContract().methods.createTrade(_tokenOffer, _amountOffer.toFixed(), _tokenRequest, _amountRequest.toFixed())
    .send({ from: await this.ethereum.getAccount(), value: dataValue })
    .on('receipt', async (receipt) => {
      // Success
      console.log('SUCCESS');
    })
    .on('error', (error) => {
      console.error(error);
    });
  }

  async cancelTradeLimit(_tradeID): Promise<void> {
    return await this.getLimitContract().methods.cancelTrade(_tradeID)
    .send({ from: await this.ethereum.getAccount(), value: 0 })
    .on('receipt', async (receipt) => {
      // Success
      console.log('SUCCESS');
    })
    .on('error', (error) => {
      console.error(error);
    });
  }

  async executeTradeLimit(_tradeID, _feePercentage): Promise<void> {
    return await this.getLimitContract().methods.executeTrade(_tradeID, _feePercentage)
    .send({ from: await this.ethereum.getAccount(), value: 0 })
    .on('receipt', async (receipt) => {
      // Success
      console.log('SUCCESS');
    })
    .on('error', (error) => {
      console.error(error);
    });
  }

  // ERC20 - allowance for smart contract
  async erc20Allowance(_token, _spender, _amount): Promise<void> {
    const web3 = this.ethereum.getWeb3();
    const erc20Contract = new web3.eth.Contract(require('../types/abis/erc20.json'), _token);
    return await erc20Contract.methods.approve(_spender, _amount)
    .send({ from: await this.ethereum.getAccount() })
    .on('receipt', async (receipt) => {
      // Success
      console.log('SUCCESS');
    })
    .on('error', (error) => {
      console.error(error);
    });
  }

  public getContractAddress(): String {
    if (this.ethereum.isTestNet()) {
      return this.contractAddressTestNet;
    }
    return this.contractAddress;
  }

  private getLimitContract() {
    if (!this.limitContract) {
      const abi = require('../types/abis/limitorder.json');
      const web3 = this.ethereum.getWeb3();
      this.limitContract = new web3.eth.Contract(abi, this.getContractAddress());
    }
    return this.limitContract;
  }

}
