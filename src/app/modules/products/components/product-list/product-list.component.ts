import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { ProductService } from '../../services/products.service';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PaginatedResponse } from '../../../../shared/models/paginated-response.model';
import { CustomPaginatorSpanish } from '../../../../shared/services/custom-paginator-intl.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { tap } from 'rxjs';
import { CardItemComponent } from '../../../../shared/components/card-item/card-item.component';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [
        MatPaginatorModule,
        CardItemComponent,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule
    ],
    providers: [
        { provide: MatPaginatorIntl, useClass: CustomPaginatorSpanish },
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                subscriptSizing: 'dynamic'
            }
        }
    ],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss'
})

export class ProductListComponent implements OnInit {
    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
    ) { }

    filter = new FormControl();
    sortBy = new FormControl();
    items: WritableSignal<ProductModel[]> = signal([]);

    private _tags: string[] = [];
    private _tagsMap: ParamMap | undefined;
    private _totalItemsCount = 0;

    ngOnInit(): void {
        this.route.queryParamMap
            .pipe(
                tap((tags) => this._tagsMap = tags)
            )
            .subscribe(() => {
                this._tags = [];
                if (this._tagsMap?.has('tags')) {
                    this._tags = this._tagsMap.get('tags')?.split(',') as string[];
                }
                this._triggerSearch();
            });

        this.sortBy?.valueChanges
            .subscribe(() => {
                this._triggerSearch();
            });
    }

    handlePageEvent(e: PageEvent) {
        this.productService.pageIndex = e.pageSize !== this.productService.pageSize ? 0 : e.pageIndex;
        this.productService.pageSize = e.pageSize;
        this._triggerSearch();
    }

    search() {
        this._triggerSearch();
    }

    clearSort(event: Event) {
        event.stopPropagation();
        this.sortBy.reset();
        this.sortBy.updateValueAndValidity();
    }

    private _triggerSearch() {
        this.productService.getFiltered("defaultName", this.filter.value, this._tags, this.sortBy.value, true)
            .subscribe((response: PaginatedResponse) => {
                this._totalItemsCount = response.totalItems;
                this.items.update(() => response.items)
            });
    }

    get itemsPerPage(): number[] {
        return this.productService.itemsPerPage;
    }

    get paginatorLength(): number {
        return this._totalItemsCount;
    }
}