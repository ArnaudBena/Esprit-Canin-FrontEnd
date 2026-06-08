import { Component, HostListener, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Menu, X } from 'lucide-angular';

@Component({
  selector: 'app-public-navbar',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './public-navbar.component.html',
  styleUrl: './public-navbar.component.css',
})
export class PublicNavbarComponent {
  readonly iconMenu = Menu;
  readonly iconClose = X;

  menuMobileOuvert = signal(false);

  toggleMenuMobile(): void {
    this.menuMobileOuvert.set(!this.menuMobileOuvert());
  }

  fermerMenuMobile(): void {
    this.menuMobileOuvert.set(false);
  }

  @HostListener('document:keydown.escape')
  fermerSurEchap(): void {
    this.menuMobileOuvert.set(false);
  }
}
