import { Injectable, Signal, WritableSignal, inject, signal } from '@angular/core';
import { POKEDEX_DATA_SERVICE, PokedexDataServiceAdapter } from '../../adapters';
import { DEFAULT_PAGE, Page, Paginated, PokemonDetail } from '../../entities';


@Injectable({
  providedIn: 'platform',
})
export class PokedexService {

  private readonly _pokemon: WritableSignal<Array<PokemonDetail>>;
  private readonly _page: WritableSignal<Page>;
  private readonly _isLoading: WritableSignal<boolean>;
  private readonly _pokedexDataService: PokedexDataServiceAdapter;

  public readonly pokemon: Signal<Array<PokemonDetail>>;
  public readonly page: Signal<Page>;
  public readonly isLoading: Signal<boolean>;


  constructor() {
    this._pokemon = signal<Array<PokemonDetail>>([]);
    this._page = signal<Page>(DEFAULT_PAGE);
    this._isLoading = signal<boolean>(false);

    this.pokemon = this._pokemon.asReadonly();
    this.page = this._page.asReadonly();
    this.isLoading = this._isLoading.asReadonly();

    this._pokedexDataService = inject<PokedexDataServiceAdapter>(POKEDEX_DATA_SERVICE);

  }

  public fetch(): void {
    this._isLoading.set(true);

    this._pokedexDataService.getDetailPokemon(this.page())
      .subscribe({
        next: (paginatedPokemon: Paginated<PokemonDetail>) => {
          this._pokemon.set(paginatedPokemon.items)
          this._page.set(paginatedPokemon.page);
        },
        complete: () => {
          this._isLoading.set(false);
        }
      });
  }

  public updatePage(page: Page): void {
    this._page.set(page);
    this.fetch();
  }

}
