import { Injectable } from '@angular/core';
import { SchedulesService } from '../schedule/schedules.service';
import { AuthService } from '../auth/auth.service';
import { Ginasio } from '../../models/Ginasio';
import { UserData } from '../../models/UserData';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class LayoutSchedulesService {
  private Ginasios: Ginasio[] = [];
  private user: UserData | null = null;
  private userLoggedIn: User | null = null;

constructor(private Auth: AuthService, private ScheduleService: SchedulesService) { 
    this.loadGinasios();
    this.loadUser();
    this.loadUserLoggedIn();
    
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

  private loadUserLoggedIn(): void {
    const userLoggedIn = this.Auth.getUserLoggedIn();
    if (userLoggedIn != null) {
      this.userLoggedIn = userLoggedIn;
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

  getUserLoggedIn(): User | null {
      return this.userLoggedIn;
  }

}
