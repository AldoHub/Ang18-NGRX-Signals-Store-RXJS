import { Component, inject, OnInit, signal } from '@angular/core';
import { CardStore } from '../../store/card.store';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-cardlist',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './cardlist.component.html',
  styleUrl: './cardlist.component.scss'
})
export class CardlistComponent implements OnInit {

  readonly store = inject(CardStore);
  page = signal(0);

  nextPage(){
    this.page.update((page) => page + 1)
    this.store.loadPages(this.page());
  }

  ngOnInit(): void {
      this.store.loadPages(this.page());
  }

}
