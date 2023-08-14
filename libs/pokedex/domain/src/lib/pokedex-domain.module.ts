import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './pokedex-domain.routes';
import { POKEDEX_DATA_SERVICE } from './adapters';
import { PokedexDataService } from './infrastructure/pokedex.data-service';
import { PokedexService } from './application/services';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    { provide: PokedexService },
    { provide: POKEDEX_DATA_SERVICE, useClass: PokedexDataService }
  ]
})
export class PokedexDomainModule {}
