import { NgModule } from '@angular/core';
import { HideWalletPipe } from './hide-wallet.pipe';
import { ToHumanTimePipe } from './to-human-time.pipe';

const pipes = [HideWalletPipe, ToHumanTimePipe];

@NgModule({
  declarations: pipes,
  exports: pipes,
  providers: [],
})
export class PipesModule {}
