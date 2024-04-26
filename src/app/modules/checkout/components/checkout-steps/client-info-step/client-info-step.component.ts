import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { statesList } from '../../../../../shared/constants/data-constants';
import { KeyValuePair } from '../../../../../shared/models/key-value-pair.model';
import { UtilsService } from '../../../../../shared/services/utils.service';

@Component({
    selector: 'app-client-info-step',
    standalone: true,
    imports: [
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
    ],
    templateUrl: './client-info-step.component.html',
    styleUrl: './client-info-step.component.scss'
})

export class ClientInfoStepComponent {
    constructor(
        private utilsService: UtilsService
    ) { }

    @Input() form!: FormGroup;
    @Output() clickedNext = new EventEmitter<void>();
    @Output() clickedPrevious = new EventEmitter<void>();

    private _states = statesList.sort(this.utilsService.dynamicSort('value'))

    get states(): KeyValuePair[] {
        return this._states;
    }

    get nameControl(): FormControl {
        return this.form?.get('name') as FormControl;
    }

    get lastNameControl(): FormControl {
        return this.form?.get('lastName') as FormControl;
    }

    get addressControl(): FormControl {
        return this.form?.get('address') as FormControl;
    }

    get stateKeyControl(): FormControl {
        return this.form?.get('stateKey') as FormControl;
    }

    get zipCodeControl(): FormControl {
        return this.form?.get('zipCode') as FormControl;
    }
}