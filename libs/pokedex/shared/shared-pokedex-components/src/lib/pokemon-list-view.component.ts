import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonDetail } from '@desktop-test/pokedex';
import {MatListModule} from '@angular/material/list';


@Component({
  selector: 'pkdx-pokemon-list-view',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule
  ],
  template: `
    <mat-list role="list">
      <mat-list-item role="listitem" class="flex flex-row" *ngFor="let poke of pokemon">
        <img 
          *ngIf="poke.image"
          [src]="poke.image"
          [alt]="poke.name"
          matListItemIcon>
        [ID: {{ poke.id }}] {{ poke.name }} - Height: {{poke.height}}
      </mat-list-item>
    </mat-list>
  `,
  styles: [`
      :host {
        display: block;
      }
  `],
})
export class PokemonListViewComponent {

  @Input({required: true}) public pokemon: Array<PokemonDetail> = [];
}
