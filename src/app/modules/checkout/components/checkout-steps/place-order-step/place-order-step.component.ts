import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ShoppingCartService } from '../../../../../shared/services/shopping-cart.service';
import { SnackBarService } from '../../../../../shared/services/snackbar.service';
import { SpinnerDialogService } from '../../../../../shared/services/spinner-dialog.service';
import { OrderModel } from '../../../../orders/models/order.model';
import { OrdersService } from '../../../../orders/services/orders.service';

@Component({
    selector: 'app-place-order-step',
    standalone: true,
    imports: [
        MatButtonModule,
        CurrencyPipe
    ],
    templateUrl: './place-order-step.component.html',
    styleUrl: './place-order-step.component.scss'
})

export class PlaceOrderStepComponent {
    constructor(
        private shoppingCartService: ShoppingCartService,
        private ordersService: OrdersService,
        private snackbarService: SnackBarService,
        private spinnerDialogService: SpinnerDialogService,
        private router: Router
    ) { }

    @Input() form!: FormGroup;
    @Output() clickedPrevious = new EventEmitter<void>();

    checkout() {
        const productsTotal = this.form.get('payment.productsTotal');
        const shipmentTotal = this.form.get('payment.shipmentTotal');

        productsTotal?.setValue(this.totalInProducts);
        productsTotal?.updateValueAndValidity();
        shipmentTotal?.setValue(100);
        shipmentTotal?.updateValueAndValidity();

        if (this.form.invalid) {
            this.snackbarService.displayError("Existe un error con el formulario");
            console.log(this.form, "invalid checkout form");
        } else {
            const checkoutFormData = this.form.getRawValue();
            this._checkout(checkoutFormData);
        }
    }

    private _checkout(checkoutFormData: any) {
        this.ordersService
            .addOrder(checkoutFormData, this.shoppingCartService.cartItems)
            .pipe(tap(() => this.spinnerDialogService.startSpinner()))
            .subscribe({
                next: (placedOrder: OrderModel) => {
                    this.shoppingCartService.clearAll();
                    this.router.navigateByUrl('/ordered', { state: { orderId: placedOrder.orderId, isAllowed: true } })
                },
                error: () => {
                    this.snackbarService.displayError("Ha ocurrido un error con el pedido");
                },
                complete: () => {
                    this.spinnerDialogService.closeSpinner();
                }
            });
    }

    get name(): string {
        return this.form?.get('clientInfo.name')?.value;
    }

    get lastName(): string {
        return this.form?.get('clientInfo.lastName')?.value;
    }

    get address(): string {
        return this.form?.get('clientInfo.address')?.value;
    }

    get state(): string {
        return this.form?.get('clientInfo.stateKey')?.value;
    }

    get zipCode(): string {
        return this.form?.get('clientInfo.zipCode')?.value;
    }

    get totalInProducts(): number {
        let total = 0;
        const items = this.shoppingCartService.cartItems;
        for (let index = 0; index < items.length; index++) {
            total += items[index].count * items[index].price;
        }
        return total;
    }
}