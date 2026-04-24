import { Routes } from '@angular/router';
import { RaceListComponent } from './pages/admin/race-list/race-list.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';



export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'races', pathMatch: 'full' },
      { path: 'races', component: RaceListComponent },
      // Plus tard #TODO : Utilisateurs, roles, types-cours, seances...
    ]
  },
];

