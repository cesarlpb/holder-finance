import { Injectable } from '@angular/core';
import { AppStore, Popup } from '../stores/app.store';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private store: AppStore) {}

  toggleDark(): void {
    this.store.update(state => {
      localStorage.setItem('DARK_MODE', state.ui.dark ? '0' : '1');
      return {
        ui: {
          ...state.ui,
          dark: !state.ui.dark,
        },
      };
    });
  }

  setDark(dark: boolean): void {
    this.store.update(state => ({ ui: { ...state.ui, dark }}));
  }

  setPopup(popup: Popup): void {
    this.store.update(state => ({ ui: { ...state.ui, popup } }));
  }
}
