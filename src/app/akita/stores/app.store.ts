import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export type Popup = 'WALLET_PROVIDER' | 'SELECT_PAIR' | 'LIMIT_TRADE' | 'DOCUMENTS';

export interface AppState {
  ui: {
    dark: boolean;
    popup: Popup;
  };
}

export function createInitialState(): AppState {
  return {
    ui: { dark: localStorage.getItem('DARK_MODE') === '1', popup: null },
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'app' })
export class AppStore extends Store<AppState> {
  constructor() {
    super(createInitialState());
  }
}
