import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PublicNavbarComponent } from '../../components/public-navbar/public-navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-public-layout',
  imports: [
    RouterOutlet,
    PublicNavbarComponent,
    FooterComponent
  ],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.css',
})
export class PublicLayoutComponent {}
