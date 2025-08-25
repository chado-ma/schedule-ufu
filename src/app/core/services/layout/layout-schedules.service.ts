import { Injectable } from '@angular/core';
import { SchedulesService } from '../schedule/schedules.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../../models/User';
import { Ginasio } from '../../models/Ginasio';
import { UserData } from '../../models/UserData';

@Injectable({
  providedIn: 'root'
})
export class LayoutSchedulesService {
  private Ginasios: Ginasio[] = [];
  private user: UserData | null = null;

constructor(private Auth: AuthService, private ScheduleService: SchedulesService) { 
    this.loadGinasios();
    this.loadUser();
  }

  private loadGinasios(): void {
    this.ScheduleService.getAvailableGyms().subscribe({
      next: (ginasios) => {
        this.Ginasios = ginasios;
      },
      error: (error) => {
        console.error('Erro ao carregar ginásios:', error);
      }
    });
  }

  private loadUser(): void {
    const user = this.Auth.getUser();
    if (user != null) {
      this.user = user;
    } else {
      console.error('Usuário não encontrado');
    };
  }

  getGinasios(): Ginasio[] {
    return this.Ginasios;
  }

  getUser(): UserData | null {
    return this.user;
  }

}
