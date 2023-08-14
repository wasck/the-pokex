import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { 
    path: '',
    loadChildren: () => import('@desktop-test/pokedex')
      .then(m => m.PokedexDomainModule)
  }
];
