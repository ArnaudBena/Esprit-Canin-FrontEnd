import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AdminSidebarComponent } from '../../components/admin-sidebar/admin-sidebar.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, NavbarComponent, AdminSidebarComponent, ConfirmDialogComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {}
