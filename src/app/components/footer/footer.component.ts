import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [
    RouterLink
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  // Liens "Légal" sans page dédiée (MVP) : on remonte en haut plutôt que de
  // pointer vers une route inexistante (404).
  remonterEnHaut(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
