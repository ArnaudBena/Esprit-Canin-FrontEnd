import { Routes } from '@angular/router';
import { RaceListComponent } from './pages/admin/race-list/race-list.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { RaceCreateComponent } from './pages/admin/race-create/race-create.component';
import { RaceEditComponent } from './pages/admin/race-edit/race-edit.component';
import { RoleListComponent } from './pages/admin/role-list/role-list.component';
import { RoleCreateComponent } from './pages/admin/role-create/role-create.component';
import { RoleEditComponent } from './pages/admin/role-edit/role-edit.component';
import { TypeSeanceListComponent } from './pages/admin/type-seance-list/type-seance-list.component';
import { TypeSeanceCreateComponent } from './pages/admin/type-seance-create/type-seance-create.component';
import { TypeSeanceEditComponent } from './pages/admin/type-seance-edit/type-seance-edit.component';
import { UtilisateurPasswordComponent } from './pages/admin/utilisateur-password/utilisateur-password.component';
import { UtilisateurEditRoleComponent } from './pages/admin/utilisateur-edit-role/utilisateur-edit-role.component';
import { UtilisateurDetailComponent } from './pages/admin/utilisateur-detail/utilisateur-detail.component';
import { UtilisateurListComponent } from './pages/admin/utilisateur-list/utilisateur-list.component';
import { ChienListComponent } from './pages/admin/chien-list/chien-list.component';
import { SeanceListComponent } from './pages/admin/seance-list/seance-list.component';
import { SeanceCreateComponent } from './pages/admin/seance-create/seance-create.component';
import { SeanceEditComponent } from './pages/admin/seance-edit/seance-edit.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';



export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'races', component: RaceListComponent },
      { path: 'races/new', component: RaceCreateComponent },
      { path: 'races/:id/edit', component: RaceEditComponent },
      { path: 'roles', component: RoleListComponent },
      { path: 'roles/new', component: RoleCreateComponent },
      { path: 'roles/:id/edit', component: RoleEditComponent },
      { path: 'types-seances', component: TypeSeanceListComponent },
      { path: 'types-seances/new', component: TypeSeanceCreateComponent },
      { path: 'types-seances/:id/edit', component: TypeSeanceEditComponent },
      { path: 'utilisateurs', component: UtilisateurListComponent },
      { path: 'utilisateurs/:id', component: UtilisateurDetailComponent },
      { path: 'utilisateurs/:id/edit-role', component: UtilisateurEditRoleComponent },
      { path: 'utilisateurs/:id/password', component: UtilisateurPasswordComponent },
      { path: 'chiens', component: ChienListComponent },
      { path: 'seances', component: SeanceListComponent },
      { path: 'seances/new', component: SeanceCreateComponent },
      { path: 'seances/:id/edit', component: SeanceEditComponent },
    ]
  },
];

