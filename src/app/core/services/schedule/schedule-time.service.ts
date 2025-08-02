import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ScheduleTimeService {
    horarioDisponivelClicadoEmitter = new EventEmitter<void>();

    abrirModalScheduleForm(): void {
        this.horarioDisponivelClicadoEmitter.emit();
    }
}