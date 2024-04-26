import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../../../shared/services/local-storage.service';
import { ProductModel } from '../../models/product.model';
import { tap } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ShoppingCartService } from '../../../../shared/services/shopping-cart.service';
import { CurrencyPipe } from '@angular/common';
import { SnackBarService } from '../../../../shared/services/snackbar.service';
import { CardItemComponent } from '../../../../shared/components/card-item/card-item.component';
import { SpinnerDialogService } from '../../../../shared/services/spinner-dialog.service';
import { PRODUCT_TAGS } from '../../../../shared/constants/config-constants';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@Component({
    selector: 'app-product-details',
    standalone: true,
    imports: [
        MatButtonModule,
        MatInputModule,
        MatDividerModule,
        MatSelectModule,
        FormsModule,
        CurrencyPipe,
        CardItemComponent,
    ],
    providers:[
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                subscriptSizing: 'dynamic'
            }
        }
    ],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.scss'
})

export class ProductDetailsComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private localStorageService: LocalStorageService,
        private shoppingCartService: ShoppingCartService,
        private snackBarService: SnackBarService,
        private spinnerService: SpinnerDialogService,
    ) { }

    selectedAmount = 0;

    private _id = 0;
    private _product!: ProductModel;
    private _selectedImage!: string;
    private _availableOptions = <any>[];
    private _suggested: ProductModel[] = [];
    private _altImages = [
        {
            index: 1,
            url: ''
        },
        {
            index: 2,
            url: 'https://m.media-amazon.com/images/I/71Jrw5vFaWL._AC_SL1280_.jpg'
        },
        {
            index: 3,
            url: 'https://m.media-amazon.com/images/I/51svTyR1vPL._AC_SL1045_.jpg'
        }
    ]
    private _tagMessage = '';

    ngOnInit() {
        this.spinnerService.startSpinner();
        this.selectedAmount = 0;

        this.route.params
            .pipe(
                tap(({ id }) => this._id = id)
            )
            .subscribe(() => {
                this._getSuggested();
                this._updateAvailabilityOptions();
                this._setImages();
                this.spinnerService.closeSpinner();
            });

        this.shoppingCartService.onDeletedItem$
            .subscribe(() => {
                this._updateAvailabilityOptions();
            })
    }

    switchImage(url: string) {
        this._selectedImage = url;
    }

    addItemToCart(): void {
        this.shoppingCartService.addItem(this._product.defaultName, this._product.price, this._product.defaultImageURL, this._product.id, this.selectedAmount);
        this.snackBarService.displaySuccess(`Producto${this.selectedAmount > 1 ? 's' : ''} añadido${this.selectedAmount > 1 ? 's' : ''} al carrito`)
        this._updateAvailabilityOptions();
    }

    private _updateAvailabilityOptions() {
        this._product = this.localStorageService.getItemById('inventory', this._id);
        this._setAvailabilityOptions(this._product.availableItems);
    }

    private _setImages() {
        this._selectedImage = this._product.defaultImageURL;
        const elem = this._altImages.find(c => c.index == 1);
        elem!.url = this._selectedImage;
    }

    private _getSuggested() {
        this._suggested = [];
        const allItems = this.localStorageService.getAll('inventory');

        for (let index = 1; index < 11; index++) {
            const randomId: number = Math.floor(Math.random() * allItems.length) + 1;
            this._suggested.push(this.localStorageService.getItemById('inventory', randomId))
        }
    }

    private _setAvailabilityOptions(available: number) {
        this._availableOptions = [];
        for (let index = available; index > 0; index--) {
            this._availableOptions.push(<any>{
                key: index,
                value: index.toString()
            });
        }
        this.selectedAmount = 1;
    }

    get exists(): boolean {
        return this._product?.id > 0;
    }

    get name(): string {
        return this._product?.defaultName;
    }

    get brand(): string {
        return this._product?.brand;
    }

    get selectedImage(): string {
        return this._selectedImage;
    }

    get altImages(): any[] {
        return this._altImages;
    }

    get availableItems(): number {
        return this._product.availableItems;
    }

    get isSoldOut(): boolean {
        return this.availableItems == 0;
    }

    get availavilityOptions(): any[] {
        return this._availableOptions;
    }

    get randomItems(): ProductModel[] {
        return this._suggested
    }

    get hasTag(): boolean {
        return this._product?.tags?.length > 0 && this._product?.availableItems > 0;
    }

    get isTagPromotion(): boolean {
        return this._product?.tags?.includes(PRODUCT_TAGS.PROMOTION.Key);
    }

    get isTagNew(): boolean {
        return this._product?.tags?.includes(PRODUCT_TAGS.NEW.Key);
    }

    get tagText(): string {
        if (this.isTagPromotion) {
            this._tagMessage = PRODUCT_TAGS.PROMOTION.Value
        } else if (this.isTagNew) {
            this._tagMessage = PRODUCT_TAGS.NEW.Value
        }
        return this._tagMessage;
    }

    get product(): ProductModel {
        return this._product;
    }
}