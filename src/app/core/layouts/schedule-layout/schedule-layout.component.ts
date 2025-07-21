import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { MenuComponent } from '../../shared/menu/menu.component';

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

}
