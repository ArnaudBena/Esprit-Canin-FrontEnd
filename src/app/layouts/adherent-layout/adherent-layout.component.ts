import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdherentNavbarComponent } from '../../components/adherent-navbar/adherent-navbar.component';

@Component({
  selector: 'app-adherent-layout',
  imports: [
    RouterOutlet,
    AdherentNavbarComponent
  ],
  templateUrl: './adherent-layout.component.html',
  styleUrl: './adherent-layout.component.css',
})
export class AdherentLayoutComponent {}
