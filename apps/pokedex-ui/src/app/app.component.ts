import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary">
      <span>{{ title | uppercase }}</span>
    </mat-toolbar>

    <router-outlet></router-outlet>
  `,
  styles: [''],
})
export class AppComponent {
  title = 'the pokedex';
}
