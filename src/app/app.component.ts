import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardlistComponent } from './components/cardlist/cardlist.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardlistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ang-18-NGRX-store-signals-RXJS';
}
