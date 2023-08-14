import { Observable } from 'rxjs';
import { Page, Paginated, Pokemon, PokemonDetail } from '../entities';
import { InjectionToken } from '@angular/core';

export interface PokedexDataServiceAdapter {
  getDetailPokemon(page: Page): Observable<Paginated<PokemonDetail>>;
}

export const POKEDEX_DATA_SERVICE = new InjectionToken<PokedexDataServiceAdapter>('POKEDEX_DATA_SERVICE');