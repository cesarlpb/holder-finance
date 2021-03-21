import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-limit',
  templateUrl: './limit.component.html',
})
export class LimitComponent {
  data = AppComponent.data;
  section = () => this.data.getLimitSection();
}
