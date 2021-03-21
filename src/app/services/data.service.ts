import { Injectable } from '@angular/core';
import { CryptoPair } from '../types/data-service/crypto-pair.type';
import { EmptyScroll, Scroll } from '../types/data-service/scroll.type';
import { EmptyUser, User } from '../types/data-service/user.type';
import { EmptyWallet, Wallet } from '../types/data-service/wallet.type';
import { LimitSection } from '../types/limit/trade.types';

@Injectable()
export class DataService {
  private user: User = EmptyUser;
  private wallet: Wallet = EmptyWallet;
  private menuOpened: boolean = false;
  private darkEnabled: boolean = false;
  private limitSection: LimitSection = 'INFO';
  private cryptoPairs: CryptoPair[] = null;
  private selectedPair: CryptoPair = null;
  private scroll: Scroll = EmptyScroll;


  getUser = () => this.user;

  setUser = (user: Partial<User>): void => {
    this.user = { ...this.user, ...user };
  };

  getWallet = () => this.wallet;

  setWallet = (wallet: Partial<Wallet>): void => {
    this.wallet = { ...this.wallet, ...wallet };
  };

  isMenuOpened = () => this.menuOpened;

  setMenuOpened = (menuOpened: boolean): void => {
    this.menuOpened = menuOpened;
  };

  toggleMenuOpened = (): void => {
    this.menuOpened = !this.menuOpened;
  };

  isDarkEnabled = () => this.darkEnabled;

  toggleDarkEnabled = (): void => {
    this.darkEnabled = !this.darkEnabled;
  };

  getLimitSection = () => this.limitSection;

  setLimitSection = (section: LimitSection): void => {
    this.limitSection = section;
  };

  getCryptoPairs = () => this.cryptoPairs;

  setCryptoPairs = (pairs: CryptoPair[]): void => {
    this.cryptoPairs = pairs;
  };
  
  getSelectedPair = () => this.selectedPair;

  setSelectedPair = (pair: CryptoPair): void => {
    this.selectedPair = pair;
  };

  getScroll = () => this.scroll;

  setScroll = (values: Scroll): void => {
    this.scroll = values;
  }
}
