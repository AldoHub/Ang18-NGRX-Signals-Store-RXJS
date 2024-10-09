import { computed } from "@angular/core";
import { signalStore, withComputed, withState } from "@ngrx/signals";

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
        cards: computed(() => cards()),
        cardsCount: computed(() => cards().length),
        cardsSpellCount: computed(() => cards().filter((card) => card.type === ' Spell Card').length),
        
    })),
);


//TODO 17:47