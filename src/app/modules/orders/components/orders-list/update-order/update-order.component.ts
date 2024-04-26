import { Component, Inject, OnInit } from '@angular/core';
import { ProductService } from '../../../../products/services/products.service';
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
    selector: 'app-update-order',
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
    templateUrl: './update-order.component.html',
    styleUrl: './update-order.component.scss'
})

export class UpdateOrderComponent implements OnInit {
    constructor(
        private ordersService: OrdersService,
        private matDialogRef: MatDialogRef<UpdateOrderComponent>,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    updateOrderForm!: FormGroup
    statuses: any[] = this._getStatuses()

    ngOnInit() {
        this._initForm(this.data);
    }

    saveItem() {
        const updatedOrder: any = this.updateOrderForm.getRawValue();
        this.ordersService.updateOrder(updatedOrder.id, updatedOrder.statusKey, updatedOrder.shipmentTrackCode);
        this.matDialogRef.close();
    }

    private _initForm(data: any) {
        this.updateOrderForm = this.fb.group({
            id: new FormControl<number | undefined>(data?.id ?? undefined, []),
            statusKey: [{value: data?.statusKey ?? undefined, disabled: this.isCanceled}, [Validators.required]],
            shipmentTrackCode: [{value: data?.shipmentTrackCode ?? undefined, disabled: this.isCanceled}],
        });
    }

    private _getStatuses(): any[] {
        const statuses = [
            { key: 1, value: 'Creado', disabled: false },
            { key: 2, value: 'Pendiente', disabled: false },
            { key: 3, value: 'Pago Invalido', disabled: false },
            { key: 4, value: 'Pagado', disabled: false },
            { key: 5, value: 'Enviado', disabled: false },
            { key: 6, value: 'Cancelado', disabled: false }
        ];

        statuses.filter(c => c.key <= this.data?.statusKey)
            ?.forEach(c => c.disabled = true)

        return statuses;
    }


    get isInvalid(): boolean {
        return this.updateOrderForm.invalid;
    }

    get isCanceled(): boolean {
        return this.data?.statusKey === 5;
    }
}