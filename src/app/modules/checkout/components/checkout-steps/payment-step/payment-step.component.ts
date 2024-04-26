import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-payment-step',
    standalone: true,
    imports: [
        MatButtonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCheckboxModule
    ],
    templateUrl: './payment-step.component.html',
    styleUrl: './payment-step.component.scss'
})

export class PaymentStepComponent {
    constructor() { }
    
    @Input() form!: FormGroup;
    @Output() clickedNext = new EventEmitter<void>();
    @Output() clickedPrevious = new EventEmitter<void>();

    get agreementControl(): FormControl {
        return this.form?.get('agreement') as FormControl;
    }
}