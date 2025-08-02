import { Routes } from '@angular/router';
import { ScheduleComponent } from '../pages/schedule/schedule.component';
import { UserschdeulesComponent } from '../pages/userschdeules/userschdeules.component';
import { ConfigurationComponent } from '../pages/configuration/configuration.component';
import { EmailCodeSendComponent } from '../pages/email-code-send/email-code-send.component';
import { AuthLayoutComponent } from '../layouts/auth-layout/auth-layout.component';
import { ScheduleLayoutComponent } from '../layouts/schedule-layout/schedule-layout.component';
import { authGuard } from '../guards/auth.guard';
import { EmailValidatorComponent } from '../pages/email-validator/email-validator.component';


export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: EmailCodeSendComponent },
      { path: 'register', component: EmailValidatorComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  

  {
    path: '',
    component: ScheduleLayoutComponent,
    canActivate: [authGuard], 
    children: [
      { path: '', redirectTo: '/reservas', pathMatch: 'full' },
      { path: 'reservas', component: ScheduleComponent },
      { path: 'minhas-reservas', component: UserschdeulesComponent },
      { path: 'configuracoes', component: ConfigurationComponent }
    ]
  },
  
  { path: '**', redirectTo: '/auth/login' }
];