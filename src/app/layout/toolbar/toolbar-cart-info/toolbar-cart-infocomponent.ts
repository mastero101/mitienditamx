import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';

@Component({
    selector: 'app-toolbar-cart-info',
    standalone: true,
    imports: [
        RouterModule,
        MatButtonModule,
        MatCardModule,
        CurrencyPipe
    ],
    templateUrl: './toolbar-cart-info.component.html',
    styleUrl: './toolbar-cart-info.component.scss',
})

export class ToolbarCartInfoComponent {
    constructor(
        private shoppingCartService: ShoppingCartService
    ) { }

    deleteItemFromShoppingCart(event: Event, itemId: number) {
        event.stopPropagation();
        this.shoppingCartService.deleteItem(itemId);
    }

    get items(): any[] {
        return this.shoppingCartService.cartItems;
    }

    get cartItemsCount(): number {
        return this.shoppingCartService.cartItemsCount;
    }
}