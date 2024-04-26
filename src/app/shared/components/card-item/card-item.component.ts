import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { ProductModel } from '../../../modules/products/models/product.model';
import { PRODUCT_TAGS } from '../../constants/config-constants';

@Component({
    selector: 'app-card-item',
    standalone: true,
    imports: [
        MatCardModule,
        RouterModule,
        CurrencyPipe
    ],
    templateUrl: './card-item.component.html',
    styleUrl: './card-item.component.scss'
})

export class CardItemComponent {
    @Input() item!: ProductModel;

    private _tagMessage = '';

    get isAvailable(): boolean {
        return this.item?.availableItems > 0;
    }

    get hasTag(): boolean {
        return this.item?.tags?.length > 0 && this.item?.availableItems > 0;
    }

    get isTagPromotion(): boolean {
        return this.item?.tags?.includes(PRODUCT_TAGS.PROMOTION.Key);
    }

    get isTagNew(): boolean {
        return this.item?.tags?.includes(PRODUCT_TAGS.NEW.Key);
    }

    get tagText(): string {
        if (this.isTagPromotion) {
            this._tagMessage = PRODUCT_TAGS.PROMOTION.Value
        } else if (this.isTagNew) {
            this._tagMessage = PRODUCT_TAGS.NEW.Value
        }
        return this._tagMessage;
    }
}