import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormType } from '../../models/FormType';
import { ScheduleFormComponent } from '../schedule-form/schedule-form.component';
import { DeleteScheduleFormComponent } from '../delete-schedule-form/delete-schedule-form.component';
import { GinasioFormComponent } from "../ginasio-form/ginasio-form.component";
import { GinasioFormDeleteComponent } from "../ginasio-form-delete/ginasio-form-delete.component";
import { RestricaoFormComponent } from "../restricao-form/restricao-form.component";
import { RestricaoFormDeleteComponent } from "../restricao-form-delete/restricao-form-delete.component";

@Component({
  selector: 'app-generic-modal',
  imports: [CommonModule, ScheduleFormComponent, DeleteScheduleFormComponent, GinasioFormComponent, GinasioFormDeleteComponent, RestricaoFormComponent, RestricaoFormDeleteComponent],
  templateUrl: './generic-modal.component.html',
  styleUrl: './generic-modal.component.css'
})
export class GenericModalComponent implements OnChanges {
  @Input() isOpen: boolean = false;
  @Input() formType: FormType = FormType.CREATE_SCHEDULE;
  @Input() title: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() formSubmitted = new EventEmitter<boolean>();

  FormType = FormType; // Expose enum to template

  ngOnChanges(changes: SimpleChanges): void {
  }

  closeModal(): void {
    this.close.emit();
  }

  onOverlayClick(): void {
    this.closeModal();
  }

  onFormSubmit(success: boolean): void {
    this.formSubmitted.emit(success);
  }
}
