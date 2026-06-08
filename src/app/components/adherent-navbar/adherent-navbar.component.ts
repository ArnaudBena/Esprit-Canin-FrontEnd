import { Component, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, LogOut, ChevronDown, Menu, X } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-adherent-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    LucideAngularModule
  ],
  templateUrl: './adherent-navbar.component.html',
  styleUrl: './adherent-navbar.component.css',
})
export class AdherentNavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  readonly jwtInfo = this.authService.jwtInfo;
  readonly iconLogout = LogOut;
  readonly iconChevron = ChevronDown;
  readonly iconMenu = Menu;
  readonly iconClose = X;

  menuOuvert = signal(false);
  menuMobileOuvert = signal(false);

  toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.menuOuvert.set(!this.menuOuvert());
  }

  toggleMenuMobile(): void {
    this.menuMobileOuvert.set(!this.menuMobileOuvert());
  }

  fermerMenuMobile(): void {
    this.menuMobileOuvert.set(false);
  }

  @HostListener('document:click')
  fermerMenu(): void {
    this.menuOuvert.set(false);
  }

  @HostListener('document:keydown.escape')
  fermerSurEchap(): void {
    this.menuOuvert.set(false);
    this.menuMobileOuvert.set(false);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
