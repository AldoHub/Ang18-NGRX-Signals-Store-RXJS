import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { CardService } from "../services/card.service";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";

export interface Card {
    id: string;
    name: string;
    type: string
}

interface CardState {
    cards: Card[];
    state: "Loading" | "Loaded" | "Error";
    pageFilter: {query: string, page: number}
}

const initialState: CardState = {
    cards: [],
    state: "Loading",
    pageFilter: {query: "", page: 1}
}

//store
export const CardStore = signalStore(
    {providedIn: "root"},
    withState(initialState),
    withComputed(({cards}) => ({
        //we are just using the "cards" property of the state instead of passing the whole "state"
        cardsList: computed(() => cards()),
        cardsCount: computed(() => cards().length),
        cardsSpellCount: computed(() => cards().filter((card) => card.type === 'Spell Card').length),
        
    })),
    withMethods((store, cardService = inject(CardService)) => ({
        loadPages: rxMethod<number>(
            pipe(
                tap(() => patchState(store, {state: 'Loading'})),
                switchMap((page) => {
                    return cardService.loadCards(page).pipe(tap(
                        (cards) => patchState(store, {cards, state: 'Loaded'})
                    ))
                })
            )
        )
    }))
);

