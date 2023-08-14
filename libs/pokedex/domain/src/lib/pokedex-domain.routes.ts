import { Routes } from "@angular/router";
import { ManagePokedexComponent } from "./application/features/manage-pokedex.component";

export const routes: Routes = [
  { path: '', redirectTo: 'pokemon', pathMatch: 'full' },
  { path: 'pokemon', component: ManagePokedexComponent }
]