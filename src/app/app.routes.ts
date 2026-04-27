import { Routes } from '@angular/router';
import { RaceListComponent } from './pages/admin/race-list/race-list.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { RaceCreateComponent } from './pages/admin/race-create/race-create.component';
import { RaceEditComponent } from './pages/admin/race-edit/race-edit.component';
import { RoleListComponent } from './pages/admin/role-list/role-list.component';
import { RoleCreateComponent } from './pages/admin/role-create/role-create.component';
import { RoleEditComponent } from './pages/admin/role-edit/role-edit.component';



export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'races', component: RaceListComponent },
      { path: 'races/new', component: RaceCreateComponent },
      { path: 'races/:id/edit', component: RaceEditComponent },
      { path: 'roles', component: RoleListComponent },
      { path: 'roles/new', component: RoleCreateComponent },
      { path: 'roles/:id/edit', component: RoleEditComponent },
      // Plus tard #TODO : Utilisateurs, types-cours, seances...
    ]
  },
];

