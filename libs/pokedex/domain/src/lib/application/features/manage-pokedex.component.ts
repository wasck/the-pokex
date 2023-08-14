import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PokemonGridViewComponent, PokemonListViewComponent } from '@pokedex/shared/shared-pokedex-components';
import { Page, PokemonDetail } from '../../entities';
import { View, Views } from '../../entities/pokemon-view.types';
import { PokedexService } from '../services/pokedex.service';



@Component({
  selector: 'pokedex-manage-pokedex',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatButtonModule,
    PokemonListViewComponent,
    PokemonGridViewComponent
  ],
  template: `
      <mat-toolbar>
        <span class="uppercase"> {{title()}} </span> 
        <button
          mat-stroked-button
          color="primary"
          class="uppercase"
          (click)="toggleView()">
          {{ viewLabel() }}
        </button>
  
        <mat-paginator 
                [length]="page().count"
                [pageSize]="page().size"
                [pageIndex]="page().page"
                [pageSizeOptions]="page().sizeOptions"
                [disabled]="isLoading()"
                [showFirstLastButtons]="true"
                (page)="onPageChange($event)"
                aria-label="Select page">
        </mat-paginator>
  
      </mat-toolbar>

      <mat-progress-bar
        mode="indeterminate"
        *ngIf="isLoading()">
      </mat-progress-bar>
  
      <div [ngSwitch]="view()">
        <pkdx-pokemon-grid-view
          *ngSwitchCase="VIEWS.Grid"
          [pokemon]="pokemon()">
        </pkdx-pokemon-grid-view>
      
        <pkdx-pokemon-list-view
          *ngSwitchDefault
          [pokemon]="pokemon()">
        </pkdx-pokemon-list-view>
      </div>
  `,
  styles: [`
      :host {
        display: block;
      }
      mat-toolbar {
        display: flex;
        justify-content: space-between;
      }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagePokedexComponent implements OnInit {
  private readonly pokedexService = inject(PokedexService);
  
  public readonly VIEWS = Views;
  public readonly pokemon: Signal<Array<PokemonDetail>> = this.pokedexService.pokemon;
  public readonly page: Signal<Page> = this.pokedexService.page;
  public readonly isLoading = this.pokedexService.isLoading;
  public readonly view: WritableSignal<View> = signal(Views.Grid);
  public readonly viewLabel: Signal<View> = 
    computed(() => this.view() === Views.List ? Views.Grid : Views.List);
  public readonly title: Signal<string> =
    computed(() => this.view() === Views.List ? 'pokemon list view' : 'pokemon grid view')
  
  public ngOnInit(): void {
    this.pokedexService.fetch();
  }

  public onPageChange(event: PageEvent): void {
    this.pokedexService.updatePage({
      count: event.length,
      page: event.pageIndex,
      size: event.pageSize,
      sizeOptions: this.page().sizeOptions
    })
  }

  public toggleView(): void {
    this.view.update((view: View) => view === Views.List ? Views.Grid : Views.List)
  }

}
