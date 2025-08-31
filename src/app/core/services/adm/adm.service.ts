import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ScheduleModel } from '../../models/ScheduleModel';
import { Observable } from 'rxjs';
import { User } from '../../models/User';
import { Restricao } from '../../models/Restricao';
import { CreateGinasio } from '../../models/CreateGinasioRequest';
import { RestricaoRequest } from '../../models/RestricaoRequest';
import { UserData } from '../../models/UserData';

@Injectable({
  providedIn: 'root'
})
export class AdmService {
    private baseApiUrl = 'http://localhost:3000/v1/adm';

    constructor(private http: HttpClient, private authService: AuthService) { 
      authService.getToken();
    }

  // Buscar todos os agendamentos
  getAllSchedules(): Observable<ScheduleModel[]> {
    const Authorization = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authorization}`
    });

    return this.http.get<ScheduleModel[]>(`${this.baseApiUrl}/schedule`, { headers });
  }

  // Buscar usuários
  getAllUsers(): Observable<User[]> {
    const Authorization = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authorization}`
    });

    return this.http.get<User[]>(`${this.baseApiUrl}/users`, { headers });
  }

  getAllRestrictions(): Observable<Restricao[]> {
    const Authorization = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authorization}`
    });

    return this.http.get<Restricao[]>(`${this.baseApiUrl}/restricao`, { headers });
  }

   // Apagar ginásio por id
  deleteGinasio(ginasio: string): Observable<void> {
    const Authorization = this.authService.getToken();
    console.log('Deletando ginásio:', ginasio);
    console.log('Authorization:', Authorization);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authorization}`
    });
    return this.http.post<void>(`${this.baseApiUrl}/ginasio/delete/${ginasio}`, {}, { headers });
  }

  createGinasio(ginasio: CreateGinasio): Observable<void> {
    const Authorization = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authorization}`
    });
    return this.http.post<void>(`${this.baseApiUrl}/ginasio`, ginasio, { headers });
  }

  createRestricao(restricao: RestricaoRequest): Observable<void> {
    const Authorization = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authorization}`
    });
    return this.http.post<void>(`${this.baseApiUrl}/restricao`, restricao, { headers });
  }

  deleteRestricao(restricao: RestricaoRequest): Observable<void> {
    const Authorization = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authorization}`
    });
    return this.http.post<void>(`${this.baseApiUrl}/restricao/delete`, restricao, { headers });
  }

    generateAdm(userData: UserData): Observable<any> {
    const Authorization = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authorization}`
    });

    return this.http.post(`${this.baseApiUrl}/user`, userData, { 
      headers,
    });
  }

}