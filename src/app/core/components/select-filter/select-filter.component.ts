import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { option } from '../../models/Option';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-filter',
  imports: [CommonModule],
  templateUrl: './select-filter.component.html',
  styleUrl: './select-filter.component.css'
})
export class SelectFilterComponent implements OnInit, OnChanges {
    @Input() placeholder: string = 'Selecione o Ginásio para filtrar';
    @Input() dropdownOptions: Array<option> = [];
    @Output() selectedOption = new EventEmitter<option>();
  

    @ViewChild('dropdownList') dropdownList!: ElementRef;
    isDropdownOpen: boolean = false;
    selectedGinasio: string = '';
    selectedLabel: string = ''; 
    
    ngOnInit(): void {
        this.selectedLabel = this.placeholder;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['placeholder'] && changes['placeholder'].currentValue) {
            this.selectedLabel = changes['placeholder'].currentValue;
        }
    }

    //lógica do dropdown
    toggleDropdown(): void {
        this.isDropdownOpen = !this.isDropdownOpen;
        if (this.isDropdownOpen) {
            this.dropdownList.nativeElement.style.display = 'absolute';
        } else {
            this.dropdownList.nativeElement.style.display = 'none';
        }
    }

    onDropdownChange(selectedValue: string): void {
        var selected = this.dropdownOptions.find(option => option.value === selectedValue) || this.dropdownOptions[0];
        this.selectedLabel = selected.label;
        this.selectedGinasio = selected.value;
        this.selectedOption.emit(selected); 
        this.toggleDropdown();
    }

    reset(): void {
        this.selectedLabel = this.placeholder;
        this.selectedGinasio = '';
        this.isDropdownOpen = false;
    }
}
