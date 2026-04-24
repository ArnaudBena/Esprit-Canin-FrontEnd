import { Injectable, signal } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface ConfirmConfig {
  titre:string;
  message:string;
  confirmationLabel?: string;
  annulerLabel?: string;
  danger?: boolean;
}

@Injectable({ providedIn: 'root', })
export class DialogService {

  readonly config = signal<ConfirmConfig | null>(null);

  private reponse$: Subject<boolean> | null = null;

  confirm(config: ConfirmConfig): Observable<boolean> {
    this.config.set(config);
    this.reponse$ = new Subject<boolean>();
    return this.reponse$.asObservable();
  }

  respond(confirmed: boolean): void {
    this.reponse$?.next(confirmed);
    this.reponse$?.complete();
    this.reponse$ = null;
    this.config.set(null);
  }
}
