import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AppState, AppStore } from '../stores/app.store';

@Injectable({ providedIn: 'root' })
export class AppQuery extends Query<AppState> {
  allState$ = this.select();
  dark$ = this.select(state => state.ui.dark);
  popup$ = this.select(state => state.ui.popup);

  constructor(protected store: AppStore) {
    super(store);
  }

  getAll = () => this.allState$;

  getDark = () => this.dark$;

  getPopup = () => this.popup$;
}
