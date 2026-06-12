import { Component, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, LogOut, ChevronDown } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-coach-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    LucideAngularModule
  ],
  templateUrl: './coach-navbar.component.html',
  styleUrl: './coach-navbar.component.css',
})
export class CoachNavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  readonly jwtInfo = this.authService.jwtInfo;
  readonly iconLogout = LogOut;
  readonly iconChevron = ChevronDown;

  menuOuvert = signal(false);

  toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.menuOuvert.set(!this.menuOuvert());
  }

  @HostListener('document:click')
  fermerMenu(): void {
    this.menuOuvert.set(false);
  }

  @HostListener('document:keydown.escape')
  fermerSurEchap(): void {
    this.menuOuvert.set(false);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
