import { Injectable } from '@angular/core';
import {
  ActiveState,
  EntityState,
  EntityStore,
  StoreConfig,
} from '@datorama/akita';
import { CryptoPair } from 'src/app/types/data-service/crypto-pair.type';

export interface PairsState
  extends EntityState<CryptoPair, string>,
    ActiveState {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'pairs' })
export class PairsStore extends EntityStore<PairsState> {
  constructor() {
    super();
  }
}
