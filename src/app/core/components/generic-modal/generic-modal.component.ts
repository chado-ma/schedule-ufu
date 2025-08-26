import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormType } from '../../models/FormType';
import { ScheduleFormComponent } from '../schedule-form/schedule-form.component';
import { DeleteScheduleFormComponent } from '../delete-schedule-form/delete-schedule-form.component';

@Component({
  selector: 'app-generic-modal',
  imports: [CommonModule, ScheduleFormComponent, DeleteScheduleFormComponent],
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
    // Removed debug logs for production
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
