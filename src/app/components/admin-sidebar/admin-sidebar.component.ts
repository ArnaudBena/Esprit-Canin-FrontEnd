import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, ChartColumn, Users, BookOpen, Calendar, Shield, PawPrint, Bone, User } from 'lucide-angular';


@Component({
  selector: 'app-admin-sidebar',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css',
})
export class AdminSidebarComponent {
  readonly iconDashboard = ChartColumn;
  readonly iconUsers = Users;
  readonly iconTypes = BookOpen;
  readonly iconSeances = Calendar;
  readonly iconRoles = Shield;
  readonly iconRaces = PawPrint;
  readonly iconBone = Bone;
  readonly iconProfil = User;
}
