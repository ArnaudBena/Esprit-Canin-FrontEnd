import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Menu, X } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-public-navbar',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './public-navbar.component.html',
  styleUrl: './public-navbar.component.css',
})
export class PublicNavbarComponent {
  private auth = inject(AuthService);

  readonly jwtInfo = this.auth.jwtInfo;
  readonly iconMenu = Menu;
  readonly iconClose = X;

  menuMobileOuvert = signal(false);

  espaceUrl(): string {
    return this.auth.espaceUrl();
  }

  logout(): void {
    this.auth.logout();
    this.fermerMenuMobile();
  }

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
