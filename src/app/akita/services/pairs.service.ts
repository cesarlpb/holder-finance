import { Injectable } from '@angular/core';
import { CryptoPair } from 'src/app/types/data-service/crypto-pair.type';
import { PairsStore } from '../stores/pairs.store';

@Injectable({ providedIn: 'root' })
export class PairsService {
  constructor(private store: PairsStore) {}

  setEntities(entities: CryptoPair[]): void {
    this.store.set(entities);
  }

  updateSelected(id: string): void {
    this.store.setActive(id);
  }
}
