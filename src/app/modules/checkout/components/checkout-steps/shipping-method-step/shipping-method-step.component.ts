import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-shipping-method-step',
    standalone: true,
    imports: [
        MatButtonModule
    ],
    templateUrl: './shipping-method-step.component.html',
    styleUrl: './shipping-method-step.component.scss'
})

export class ShippingMethodStepComponent {
    constructor() { }

    @Output() clickedNext = new EventEmitter<void>();
    @Output() clickedPrevious = new EventEmitter<void>();
}