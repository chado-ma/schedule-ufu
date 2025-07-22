import { AfterViewInit, Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import flatpickr from 'flatpickr';

@Component({
  selector: 'app-datapicker',
  imports: [],
  templateUrl: './datapicker.component.html',
  styleUrl: './datapicker.component.css'
})
export class DatapickerComponent implements AfterViewInit, OnChanges {
  @Input() selectedDate: string = ''; 
  @Output() dateSelected = new EventEmitter<string>(); 

  private flatpickrInstance: any;

  ngAfterViewInit(): void {
    this.initializeFlatpickr();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDate'] && this.flatpickrInstance) {
      this.flatpickrInstance.setDate(this.selectedDate);
    }
  }

  private initializeFlatpickr(): void {
    this.flatpickrInstance = flatpickr('#simples-input', {
      dateFormat: 'Y-m-d', // Formato correto do flatpickr para YYYY-MM-DD
      defaultDate: this.selectedDate || new Date(), // Data padrão: selectedDate ou data atual
      onChange: (selectedDates: Date[], dateStr: string) => {
        this.dateSelected.emit(dateStr);
      }
    });
  }
}
