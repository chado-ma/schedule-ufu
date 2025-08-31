import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { MenuComponent } from '../../shared/menu/menu.component';
import { LayoutSchedulesService } from '../../services/layout/layout-schedules.service';
import { UserData } from '../../models/UserData';
import { User } from '../../models/User';

@Component({
  selector: 'app-schedule-layout',
  imports: [   
     RouterOutlet,
      HeaderComponent,
      FooterComponent,
      MenuComponent],
  templateUrl: './schedule-layout.component.html',
  styleUrl: './schedule-layout.component.css'
})
export class ScheduleLayoutComponent {
  private user: UserData | null = null;
  private userLoggedIn: User | null = null;

  constructor(private layoutService: LayoutSchedulesService, private router: Router) {
    this.userLoggedIn = this.layoutService.getUserLoggedIn();
    this.user = this.layoutService.getUser();
    if (this.user === null) {
      console.error('User not found');
      this.router.navigate(['/auth/login']);
    } else {
      console.log('User found:', this.user);
    }
   }

  getUsername(): string {
    return this.user ? this.user.nome : 'Guest';
  }

  getAccess(): boolean {
    console.log('User logged in:', this.userLoggedIn);
    return this.userLoggedIn?.acess === 'ADMIN';
  }
}
