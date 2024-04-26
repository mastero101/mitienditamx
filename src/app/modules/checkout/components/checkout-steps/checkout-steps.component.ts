import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { AsyncPipe } from '@angular/common';
import { ShoppingCartService } from '../../../../shared/services/shopping-cart.service';
import { StepperOrientation, STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatIconModule } from '@angular/material/icon';
import { ReviewCartStepComponent } from './review-cart-step/review-cart-step.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';
import { ShippingMethodStepComponent } from './shipping-method-step/shipping-method-step.component';
import { ClientInfoStepComponent } from './client-info-step/client-info-step.component';
import { PaymentStepComponent } from './payment-step/payment-step.component';
import { PlaceOrderStepComponent } from './place-order-step/place-order-step.component';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-checkout-steps',
    standalone: true,
    imports: [
        AsyncPipe,
        ReviewCartStepComponent,
        ShippingMethodStepComponent,
        ClientInfoStepComponent,
        PaymentStepComponent,
        PlaceOrderStepComponent,
        MatStepperModule,
        MatButtonModule,
        MatIconModule,
        RouterModule
    ],
    providers: [
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: { showError: true, displayDefaultIndicatorType: false },
        },
    ],
    templateUrl: './checkout-steps.component.html',
    styleUrl: './checkout-steps.component.scss'
})

export class CheckoutStepsComponent {
    constructor(
        private shoppingCartService: ShoppingCartService,
        _breakpointObserver: BreakpointObserver,
        private _formBuilder: FormBuilder,
        private router: Router
    ) {
        this.stepperOrientation = _breakpointObserver
            .observe('(min-width: 800px)')
            .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
    }

    stepperOrientation: Observable<StepperOrientation>;

    private _checkoutForm: FormGroup = this._formBuilder.group({
        clientInfo: this._formBuilder.group({
            name: [undefined, [Validators.required, Validators.maxLength(150)]],
            lastName: [undefined, [Validators.required, Validators.maxLength(150)]],
            zipCode: [undefined, [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern('^[0-9]*$')]],
            address: [undefined, [Validators.required, Validators.maxLength(300)]],
            stateKey: [undefined, [Validators.required]]
        }),
        payment: this._formBuilder.group({
            agreement: [false, [Validators.requiredTrue]],
            productsTotal: [0, []],
            shipmentTotal: [0, []]
        })
    });

    get isEmptyCart(): boolean {
        return this.shoppingCartService.cartItemsCount === 0;
    }

    get checkoutForm(): FormGroup {
        return this._checkoutForm as FormGroup;
    }

    get clientInfoForm(): FormGroup {
        return this.checkoutForm.get('clientInfo') as FormGroup;
    }

    get paymentValidationForm(): FormGroup {
        return this.checkoutForm.get('payment') as FormGroup;
    }
}