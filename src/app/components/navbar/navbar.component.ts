import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ChevronDown, LogOut, LucideAngularModule, Globe } from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  readonly jwtInfo = this.authService.jwtInfo;
  readonly iconLogout = LogOut;
  readonly iconChevron = ChevronDown;
  readonly iconGlobe = Globe;

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
