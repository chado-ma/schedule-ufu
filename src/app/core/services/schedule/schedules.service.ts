import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { NewSchedule } from '../../models/NewSchedule';
import { ScheduleModel } from '../../models/ScheduleModel';
import { DeleteSchedule } from '../../models/DeleteSchedule';
@Injectable({
  providedIn: 'root'
})
export class SchedulesService {
  private baseApiUrl = 'http://localhost:3000/v1/schedule';

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Buscar agendamentos por data e ginásio
  getSchedules(data: string, ginasio: string): Observable<ScheduleModel[]> {
    const Authorization = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authorization}`
    });

    return this.http.post<any[]>(`${this.baseApiUrl}`, { data, ginasio }, { headers });
  }


  // Criar novo agendamento
  createSchedule(scheduleData: NewSchedule): Observable<any> {
    const Authorization = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authorization}`
    });

    return this.http.post(`${this.baseApiUrl}/create`, scheduleData, { headers });
  }

  // Deletar agendamento
  deleteSchedule(deleteRequest: DeleteSchedule): Observable<any> {
    const Authorization = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authorization}`
    });

    return this.http.post(`${this.baseApiUrl}/delete`, deleteRequest, { headers });
  }

  // Buscar agendamentos por usuário
  getUserSchedules(matricula: string): Observable<ScheduleModel[]> {
    const Authorization = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authorization}`
    });

    return this.http.get<ScheduleModel[]>(`${this.baseApiUrl}/user/${matricula}`, { headers });
  }

  // Buscar ginásios disponíveis
  getAvailableGyms(): Observable<any[]> {
    const Authorization = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authorization}`
    });
    return this.http.get<any[]>(`${this.baseApiUrl}/ginasio`, { headers });
  }

}
