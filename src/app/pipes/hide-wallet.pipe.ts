import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'hideWallet' })
export class HideWalletPipe implements PipeTransform {
  constructor() {}

  transform(address: string, nose = 6, tail = 4): string {
    return `${address.slice(0, nose)}...${address.slice(tail * -1)}`;
  }
}
