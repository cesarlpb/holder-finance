import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LimitModule } from './components/limit/limit.module';
import { OtcComponent } from './components/otc/otc.component';
import { PopupsModule } from './components/popups/popups.module';
import { SwapComponent } from './components/swap/swap.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { PipesModule } from './pipes/pipes.modules';
import { EthereumService } from './services/ethereum.service';
import { LimitOrderService } from './services/limitorder.service';
import { ModalPopupComponent } from './components/modal-popup/modal-popup.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent, 
    NavbarComponent, 
    SwapComponent, 
    OtcComponent, 
    ModalPopupComponent
  ],
  imports: [
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    BrowserModule,
    AppRoutingModule,
    PipesModule,
    LimitModule,
    PopupsModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [EthereumService, LimitOrderService],
  bootstrap: [AppComponent],
  entryComponents: [ModalPopupComponent]
})
export class AppModule {}
