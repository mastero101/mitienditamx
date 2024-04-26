import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { environment } from '../../../environments/environment.prod';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { ToolbarCartInfoComponent } from './toolbar-cart-info/toolbar-cart-infocomponent';
import { ToolbarUserInfoComponent } from './toolbar-user-info/toolbar-user-info.component';

@Component({
    selector: 'app-toolbar',
    standalone: true,
    imports: [
        MatToolbarModule,
        MatIconModule,
        UpperCasePipe,
        MatMenuModule,
        MatBadgeModule,
        MatCardModule,
        CurrencyPipe,
        MatButtonModule,
        ToolbarUserInfoComponent,
        ToolbarCartInfoComponent
    ],
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.scss',
})

export class ToolbarComponent {
    constructor(
        private shoppingCartService: ShoppingCartService,
    ) { }

    @Output() toggleDrawer = new EventEmitter<void>();

    toolbarTitle = environment.settings.toolbarTitle;

    get cartItemsCount(): number {
        return this.shoppingCartService.cartItemsCount;
    }

    get isCartBadgeHidden(): boolean {
        return this.cartItemsCount === 0;
    }
}