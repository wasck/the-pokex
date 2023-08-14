import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, forkJoin, map, of, switchMap, zip } from 'rxjs';
import { PokedexDataServiceAdapter } from '../adapters';
import { Page, Paginated, Pokemon, PokemonDetail } from '../entities';

import { PaginatedDto } from './dto';
import { PokemonDetailDto } from './dto/pokemon-detailed.dto';
import { PagedPokemonMapper } from './mapper';
import { PokemonDetailMapper } from './mapper/pokemon-detail.mapper';

@Injectable({
  providedIn: 'platform'
})
export class PokedexDataService implements PokedexDataServiceAdapter {

  private readonly API_VERSION = 'v2';
  private readonly BASE_URL: string = `https://pokeapi.co/api/${this.API_VERSION}`;
  private readonly POKEMON_URL: string = `${this.BASE_URL}/pokemon`;

  public constructor(private readonly httpClient: HttpClient){}

  public getPokemonNames(page: Page): Observable<Paginated<Pokemon>> {
    const params: HttpParams = new HttpParams()
      .set('offset', page.size * page.page)
      .set('limit', page.size);

    return this.httpClient.get<PaginatedDto<Pokemon>>(this.POKEMON_URL, {params})
      .pipe(
        catchError((error) => {
          return this.errorHandling(error, 'Unable to fetch Pokemon');
        }),
        map((response: PaginatedDto<Pokemon>) => {
          return { ...page, ...response }
        }),
        map((response: PaginatedDto<Pokemon> & Page) => 
          PagedPokemonMapper.from(response))
      );
  }

  public getPokemonByName(name: string): Observable<PokemonDetailDto> {
    const URL = `${this.POKEMON_URL}/${name}`;

    return this.httpClient.get<PokemonDetailDto>(URL)
      .pipe(
        catchError((error) => {
          return this.errorHandling(error, 'Unable to fetch pokemon by name');
        }),
      )
  }

  public getDetailPokemon(page: Page): Observable<Paginated<PokemonDetail>> {
    return this.getPokemonNames(page)
      .pipe(
        switchMap((paginatedPokemon) => {
          const parallelRequests: Array<Observable<PokemonDetailDto>> = paginatedPokemon.items.map((pokemon) => {
            return this.getPokemonByName(pokemon.name);
          });
          const {page} = paginatedPokemon;

          return zip(of(page), forkJoin(parallelRequests));
        }),
        map(([page, items]) => {
          return {
            page,
            items: items.map((item) => PokemonDetailMapper.from(item))
          }
        }),
    );
  }

    /**
   * 
   * @param error the error which was caused
   * @param text custom error information
   * @returns EmptyError as observable
   */
    private errorHandling(error: unknown, text?: string) {
      console.error(text, error);
      return EMPTY;
    }
}
