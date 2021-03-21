import { Injectable } from '@angular/core';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';

declare global {
  interface Window {
    ethereum: any;
  }
}

@Injectable()
export class EthereumService {
  private web3;
  private account;

  private testNet = false;

  init(): void {
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);
      this.refreshTestnet();
    }
  }

  isMetamaskInstalled(): boolean {
    if (window.ethereum) {
      return true;
    }
    return false;
  }

  getWeb3(): any {
    if (!this.web3) {
      throw new Error('Call init() first and make sure metamask is installed');
    }
    return this.web3;
  }

  isTestNet(): boolean {
    return this.testNet;
  }

  async refreshTestnet() {
    this.testNet = (await this.getWeb3().eth.net.getId()) != 1;
  }

  async getAccount(): Promise<string|null> {
    if (!this.web3) {
      return null;
    }
    if (this.account) {
      return this.account;
    }
    const accounts = await this
      .getWeb3()
      .eth.getAccounts();
    if (accounts.length === 0) {
      return null;
    }
    this.account = accounts[0];
    return accounts[0];
  }

  async connectWithMetamask(): Promise<string> {
    this.web3 = new Web3(window.ethereum);
    this.refreshTestnet();

    return new Promise((resolve, reject) => {
      window.ethereum.enable().then((account) => {
        if (account !== null) {
          resolve(account[0]);
        }

        reject('No accounts found');
      });
    });
  }

  async connectWithWalletConnect(): Promise<string> {
    const provider = new WalletConnectProvider({
      infuraId: '27e484dcd9e3efcfd25a83a78777cdf1',
    });

    this.web3 = new Web3(provider as any);
    this.refreshTestnet();

    return new Promise(async (resolve, reject) => {
      provider.on('accountsChanged', (accounts: string[]) => {
        resolve(accounts[0]);
      });

      await provider.enable();
    });
  }
}
