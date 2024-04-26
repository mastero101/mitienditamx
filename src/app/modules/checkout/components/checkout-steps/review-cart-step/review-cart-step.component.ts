import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { ShoppingCartService } from '../../../../../shared/services/shopping-cart.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-review-cart-step',
    standalone: true,
    imports: [
        CurrencyPipe,
        RouterModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './review-cart-step.component.html',
    styleUrl: './review-cart-step.component.scss'
})

export class ReviewCartStepComponent {
    constructor(
        private shoppingCartService: ShoppingCartService,
    ) { }

    @Output() clickedNext = new EventEmitter<void>();

    reduceFromShoppingCart(itemId: number) {
        this.shoppingCartService.updateShoppingCartItemCount(itemId, 'reduce');
    }

    increaseFromShoppingCart(itemId: number) {
        this.shoppingCartService.updateShoppingCartItemCount(itemId);
    }

    get items(): any[] {
        return this.shoppingCartService.cartItems ?? [];
    }

    get totalCharge(): number {
        let total = 0;
        for (let index = 0; index < this.items.length; index++) {
            total += this.items[index].count * this.items[index].price;
        }
        return total;
    }
}