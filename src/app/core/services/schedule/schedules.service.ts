import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { NewSchedule } from '../../models/NewSchedule';
import { ScheduleModel } from '../../models/ScheduleModel';
import { DeleteSchedule } from '../../models/DeleteSchedule';
import { Ginasio } from '../../models/Ginasio';
@Injectable({
  providedIn: 'root'
})
export class SchedulesService {
  private baseApiUrl = 'http://localhost:3000/v1/schedule';

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Buscar agendamentos por data e ginásio
  getSchedules(data: string, ginasio: string | null): Observable<ScheduleModel[]> {
    var requestParams: any = { data, ginasio };
    const Authorization = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authorization}`
    });

    return this.http.get<any[]>(`${this.baseApiUrl}`, { params: requestParams, headers });
  }


  // Criar novo agendamento
  createSchedule(scheduleData: NewSchedule): Observable<any> {
    const Authorization = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authorization}`
    });

    return this.http.post(`${this.baseApiUrl}`, scheduleData, { headers });
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

    return this.http.get<ScheduleModel[]>(`${this.baseApiUrl}/${matricula}`, { headers });
  }

 // Buscar ginásios disponíveis
  getAvailableGyms(): Observable<Ginasio[]> {
    const Authorization = this.authService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Authorization}`
    });
    
    return this.http.get<Ginasio[]>(`${this.baseApiUrl}/ginasio`, { headers });
  }

}
