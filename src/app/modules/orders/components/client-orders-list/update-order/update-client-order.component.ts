import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { OrdersService } from '../../../services/orders.service';
import { CurrencyPipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-update-client-order',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        CurrencyMaskModule,
        CurrencyPipe,
        MatSelectModule
    ],
    templateUrl: './update-client-order.component.html',
    styleUrl: './update-client-order.component.scss'
})

export class UpdateClientOrderComponent implements OnInit {
    constructor(
        private ordersService: OrdersService,
        private matDialogRef: MatDialogRef<UpdateClientOrderComponent>,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    updateOrderForm!: FormGroup

    ngOnInit() {
        this._initForm(this.data);
    }

    saveItem() {
        const updatedOrder: any = this.updateOrderForm.getRawValue();
        this.ordersService.addBankTrackCode(updatedOrder.id, updatedOrder.bankTrackCode);
        this.matDialogRef.close();
    }

    private _initForm(data: any) {
        this.updateOrderForm = this.fb.group({
            id: new FormControl<number | undefined>(data?.id ?? undefined, []),
            statusValue: [{value: this._getStatusValue(data?.statusKey) ?? undefined, disabled: true}, [Validators.required]],
            bankTrackCode: [{value: data?.bankTrackCode ?? undefined, disabled: this.isCanceled}, [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z0-9 ]+$')]],
        });
    }

    private _getStatusValue(statusKey: number): string | undefined {
        const statuses = [
            { key: 1, value: 'Creado' },
            { key: 2, value: 'Pendiente' },
            { key: 3, value: 'Pago Invalido' },
            { key: 4, value: 'Pagado' },
            { key: 5, value: 'Enviado' },
            { key: 6, value: 'Cancelado' }
        ];       

        return statuses.find(c => c.key === statusKey)?.value;
    }

    get isInvalid(): boolean {
        return this.updateOrderForm.invalid;
    }

    get isCanceled(): boolean {
        return this.data?.statusKey === 5;
    }

    get bankTrackCodeControl(): FormControl{
        return this.updateOrderForm.get('bankTrackCode') as FormControl;
    }
}