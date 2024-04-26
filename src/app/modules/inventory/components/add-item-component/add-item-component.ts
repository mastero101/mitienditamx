import { Component, Inject, OnInit } from '@angular/core';
import { ProductService } from '../../../products/services/products.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CurrencyMaskModule } from "ng2-currency-mask";

@Component({
    selector: 'app-add-inventory-item',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        CurrencyMaskModule
    ],
    templateUrl: './add-item-component.html',
    styleUrl: './add-item-component.scss'
})

export class AddInventoryItemComponent implements OnInit {
    constructor(
        private productService: ProductService,
        private matDialogRef: MatDialogRef<AddInventoryItemComponent>,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    newItemForm!: FormGroup
    url: string = '';

    ngOnInit() {
        if (this.data?.defaultImageURL) {
            this.url = this.data.defaultImageURL;
        }
        else {
            const type: number = Math.floor(Math.random() * 4) + 1;
            switch (type) {
                case 1:
                    this.url = "https://m.media-amazon.com/images/I/61ogqwPRWQL._AC_SX569_.jpg";
                    break;
                case 2:
                    this.url = "https://m.media-amazon.com/images/I/61PEw9hQdZL._AC_SL1053_.jpg";
                    break;
                case 3:
                    this.url = "https://m.media-amazon.com/images/I/31PV5USdBHL._AC_SL1000_.jpg";
                    break;
                case 4:
                    this.url = "https://m.media-amazon.com/images/I/61GsL2psIZL._AC_SL1200_.jpg";
                    break;
            }
        }
        this._initForm(this.data);
    }

    saveItem() {
        const value: any = this.newItemForm.getRawValue();
        this.productService.addItem(
            value.defaultName,
            value.availableItems,
            value.brand,
            this.url,
            value.price,
            value.id
        );
        this.matDialogRef.close();
    }

    get isInvalid() {
        return this.newItemForm.invalid;
    }

    private _initForm(data: any) {
        this.newItemForm = this.fb.group({
            id: new FormControl<number | undefined>(data?.id ?? undefined, []),
            defaultName: new FormControl<string | undefined>(data?.defaultName ?? undefined, [Validators.required]),
            brand: new FormControl<string | undefined>(data?.brand ?? undefined, [Validators.required]),
            price: new FormControl<number | undefined>(data?.price ?? undefined, [Validators.required]),
            defaultImageURL: new FormControl<string>(data?.defaultImageURL ?? this.url, []),
            availableItems: new FormControl<number | undefined>(data?.availableItems ?? undefined, []),
        });
    }
}