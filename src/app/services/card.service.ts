import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Card } from '../store/card.store';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor() { }

  private httpClient = inject(HttpClient);

  loadCards(page = 0) {
    return this.httpClient.get<{data: Card[]}>(`https://db.ygoprodeck.com/api/v7/cardinfo.php?num=5&offset=${page * 5}`).pipe(
      map(response => response.data)
    );
  }

}
