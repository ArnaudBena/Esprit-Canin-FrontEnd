import { Component, inject, OnInit, signal } from '@angular/core';
import { Role } from '../../../models/role.model';
import { RoleService } from '../../../services/role.service';
import { DialogService } from '../../../services/dialog.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-role-list',
  imports: [
    RouterLink
  ],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.css',
})
export class RoleListComponent implements OnInit {
  private roleService = inject(RoleService);
  private dialog = inject(DialogService);
  roles = signal<Role[]>([]);

  ngOnInit(): void {
    this.roleService.getAll().subscribe({
      next: (data) => this.roles.set(data),
      error:(err) => console.log('Erreur de chargement roles',err),
    })
  }

  onDelete(role: Role): void {
    this.dialog.confirm({
      titre: 'Supprimer le rôle',
      message: `Voulez-vous vraiment supprimer le rôle "${role.nom}"\u00A0?`,
      confirmationLabel: 'Supprimer',
      danger: true,
    }).subscribe(confirmed => {
      if (!confirmed) return;

      this.roleService.delete(role.id!).subscribe({
        next: () => {
          this.roles.update(list => list.filter(r => r.id !== role.id));
        },
        error: (err) => console.error('Erreur de suppression', err),
      });
    });
  }
}
