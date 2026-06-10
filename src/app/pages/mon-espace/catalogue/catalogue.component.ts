import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Calendar, Clock } from 'lucide-angular';
import { SeanceService } from '../../../services/seance.service';
import { TypeSeanceService } from '../../../services/type-seance.service';
import { SeanceCatalogue } from '../../../models/seance-catalogue.model';
import { TypeSeance } from '../../../models/type-seance.model';
import { dureeAffichage } from '../../../utils/duree.utils';

@Component({
  selector: 'app-catalogue',
  imports: [
    DatePipe,
    ReactiveFormsModule,
    RouterLink,
    LucideAngularModule
  ],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.css',
})
export class CatalogueComponent implements OnInit {
  private seanceService = inject(SeanceService);
  private typeSeanceService = inject(TypeSeanceService);
  private formBuilder = inject(FormBuilder);

  protected readonly iconCalendar = Calendar;
  protected readonly iconClock = Clock;
  protected readonly dureeAffichage = dureeAffichage;

  seances = signal<SeanceCatalogue[]>([]);
  types: TypeSeance[] = [];

  filtres = this.formBuilder.nonNullable.group({
    typeSeanceId: [''],
    date: [''],
    disponible: [''],   // '' | 'true' | 'false'
  });

  ngOnInit(): void {
    this.typeSeanceService.getAll().subscribe({
      next: (data) => this.types = data,
      error: (err) => console.error('Erreur chargement types', err),
    });
    this.charger();
  }

  charger(): void {
    const v = this.filtres.getRawValue();
    this.seanceService.getCatalogue({
      typeSeanceId: v.typeSeanceId || undefined,
      date: v.date || undefined,
      disponible: v.disponible || undefined,
    }).subscribe({
      next: (data) => this.seances.set(data),
      error: (err) => console.error('Erreur chargement catalogue', err),
    });
  }

  reinitialiser(): void {
    this.filtres.reset({ typeSeanceId: '', date: '', disponible: '' });
    this.charger();
  }
}
