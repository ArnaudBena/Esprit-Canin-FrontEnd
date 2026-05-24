import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Dashboard } from '../models/dashboard.model';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.baseUrl}/admin/dashboard`;

  getDashboard(): Observable<Dashboard> {
    return this.http.get<Dashboard>(this.apiUrl);
  }
}
