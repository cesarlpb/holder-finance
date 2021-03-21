import { Injectable } from '@angular/core';
import {
  QueryEntity,
} from '@datorama/akita';
import { PairsState, PairsStore } from '../stores/pairs.store';

@Injectable({ providedIn: 'root' })
export class PairsQuery extends QueryEntity<PairsState> {
  loading$ = this.selectLoading();
  error$ = this.selectError();
  entities$ = this.selectAll();
  selected$ = this.selectActive();

  constructor(protected store: PairsStore) {
    super(store);
  }

  getLoading = () => this.loading$;

  getError = () => this.error$;

  getList = () => this.entities$;

  getSelected = () => this.selected$;

  getFiltered = (filter: string) =>
    this.getAll({
      filterBy: [
        (entity) =>
          entity.firstName.includes(filter) ||
          entity.secondName.includes(filter),
      ],
    });
}
