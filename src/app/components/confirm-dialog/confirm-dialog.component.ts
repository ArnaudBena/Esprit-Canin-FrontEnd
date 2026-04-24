import { Component, inject } from '@angular/core';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
})
export class ConfirmDialogComponent {
  private dialog = inject(DialogService);

  readonly config = this.dialog.config;

  onConfirmer(): void {
    this.dialog.respond(true);
  }

  onAnnuler(): void {
    this.dialog.respond(false);
  }
}
