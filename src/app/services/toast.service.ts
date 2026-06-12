import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();
  private nextId = 0;

  show(message: string, type: 'success' | 'error'): void {
    const id = this.nextId++;
    this._toasts.update(list => [...list, {id, message, type}]);
    setTimeout(() => this.remove(id), 5000);
  }

  remove(id: number): void {
    this._toasts.update(list => list.filter(t => t.id !== id));
  }
}
