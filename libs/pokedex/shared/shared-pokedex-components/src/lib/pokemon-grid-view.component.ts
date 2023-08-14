import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonDetail } from '@desktop-test/pokedex';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'pkdx-pokemon-grid-view',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ],
  template: `
    <mat-card *ngFor="let mon of pokemon" class="max-w-sm w-full lg:flex">
        <mat-card-header>
          <mat-card-title class="flex flex-row gap-2 capitalize">
            <span>({{ mon.id }}/{{ mon.order}})</span> 
            <span> {{ mon.name }}</span>
          </mat-card-title>
        </mat-card-header>
        <img mat-card-image
          class="bg-slate-500"
          [src]="mon.image"
          [alt]="mon.name" [title]="mon.name">

        <mat-card-content>
          content
        </mat-card-content>
      </mat-card>

  `,
  styles: [`
      :host {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }
      mat-card {
        width: 200px;
      }
  `],
})
export class PokemonGridViewComponent {

  @Input({required: true}) public pokemon: Array<PokemonDetail> = [];
}
