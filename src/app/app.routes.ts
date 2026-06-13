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
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { adminGuard } from './guards/admin.guard';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { AproposComponent } from './pages/apropos/apropos.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { AdherentLayoutComponent } from './layouts/adherent-layout/adherent-layout.component';
import { adherentGuard } from './guards/adherent.guard';
import { MesChiensComponent } from './pages/mon-espace/mes-chiens/mes-chiens.component';
import { ChienCreateComponent } from './pages/mon-espace/chien-create/chien-create.component';
import { ChienEditComponent } from './pages/mon-espace/chien-edit/chien-edit.component';
import { ChienDetailComponent } from './pages/mon-espace/chien-detail/chien-detail.component';
import { CatalogueComponent } from './pages/mon-espace/catalogue/catalogue.component';
import { SeanceDetailComponent } from './pages/mon-espace/seance-detail/seance-detail.component';
import { MonProfilComponent } from './pages/mon-espace/mon-profil/mon-profil.component';
import { DashboardAdherentComponent } from './pages/mon-espace/dashboard-adherent/dashboard-adherent.component';
import { CoachLayoutComponent } from './layouts/coach-layout/coach-layout.component';
import { coachGuard } from './guards/coach.guard';
import { MesSeancesComponent } from './pages/coach/mes-seances/mes-seances.component';
import { ParticipantsComponent } from './pages/coach/participants/participants.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { guestGuard } from './guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'a-propos', component: AproposComponent },
    ],
  },
  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  { path: 'inscription', component: InscriptionComponent, canActivate: [guestGuard] },
  {
    path: 'mon-espace',
    component: AdherentLayoutComponent,
    canActivate: [adherentGuard],
    children: [
      { path: '', redirectTo: 'tableau-de-bord', pathMatch: 'full' },
      { path: 'tableau-de-bord', component: DashboardAdherentComponent },
      { path: 'mes-chiens', component: MesChiensComponent, data: { breadcrumb: 'Mes chiens' } },
      { path: 'mes-chiens/new', component: ChienCreateComponent, data: { breadcrumb: 'Ajouter un chien' } },
      { path: 'mes-chiens/:id', component: ChienDetailComponent },
      { path: 'mes-chiens/:id/edit', component: ChienEditComponent, data: { breadcrumb: 'Modifier un chien' } },
      { path: 'seances', component: CatalogueComponent, data: { breadcrumb: 'Séances' } },
      { path: 'seances/:id', component: SeanceDetailComponent },
      { path: 'mon-profil', component: MonProfilComponent, data: { breadcrumb: 'Mon profil' } },
    ],
  },
  {
    path: 'espace-coach',
    component: CoachLayoutComponent,
    canActivate: [coachGuard],
    children: [
      { path: '', redirectTo: 'mes-seances', pathMatch: 'full' },
      { path: 'mes-seances', component: MesSeancesComponent },
      { path: 'mes-seances/:id', component: ParticipantsComponent, data: { breadcrumb: 'Participants' } },
      { path: 'mon-profil', component: MonProfilComponent, data: { breadcrumb: 'Mon profil' } },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
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
      { path: 'mon-profil', component: MonProfilComponent, data: { breadcrumb: 'Mon profil' } },
    ]
  },
  { path: '**', component: NotFoundComponent },
];

