import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CustomPaginatorSpanish } from '../../../../shared/services/custom-paginator-intl.service';
import { ProductService } from '../../../products/services/products.service';
import { ProductModel } from '../../../products/models/product.model';
import { PaginatedResponse } from '../../../../shared/models/paginated-response.model';
import { MatSortModule, Sort, SortDirection } from '@angular/material/sort';
import { ColumnDefinition } from '../../../../shared/models/mat-table-column-definition';
import { FieldPipe } from '../../../../shared/pipes/field.pipe';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddInventoryItemComponent } from '../add-item-component/add-item-component';
import { BasicConfirmationComponent } from '../../../../shared/components/basic-confirmation-modal/basic-confirmation.component';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'app-inventory-list',
    standalone: true,
    imports: [
        CurrencyPipe,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        FieldPipe,
        MatInputModule,
        MatRadioModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        MatMenuModule
    ],
    providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorSpanish }],
    templateUrl: './inventory-list.component.html',
    styleUrl: './inventory-list.component.scss'
})

export class InventoryListComponent implements OnInit {
    constructor(
        private productService: ProductService,
        public dialog: MatDialog
    ) { }
    searchBy = '';
    filter = new FormControl();
    items: WritableSignal<ProductModel[]> = signal([]);

    private _totalItemsCount: number = 0;
    private _columns: ColumnDefinition[] = [
        {
            field: 'defaultName', title: 'Nombre', align: 'left'
        },
        {
            field: 'brand', title: 'Marca', align: 'left'
        },
        {
            field: 'price', title: 'Precio', align: 'left', type: 'currency', maxWidth: 150
        },
        {
            field: 'availableItems', title: '#', align: 'left', maxWidth: 75
        },
        {
            field: 'options', title: '', align: 'center', type: 'options', maxWidth: 50, sortDisabled: true
        }
    ];

    ngOnInit(): void {
        this.productService.getFiltered(this.searchBy, this.filter?.value)
            .subscribe((response: PaginatedResponse) => {
                this._totalItemsCount = response.totalItems;
                this.items.update(() => response.items)
            });
    }

    handlePageEvent(e: PageEvent) {
        this.productService.pageIndex = e.pageSize !== this.productService.pageSize ? 0 : e.pageIndex;
        this.productService.pageSize = e.pageSize;

        this.productService.getFiltered(this.searchBy, this.filter?.value)
            .subscribe((response: PaginatedResponse) => {
                this._totalItemsCount = response.totalItems;
                this.items.update(() => response.items)
            });
    }

    sortChange(sort: Sort) {
        this.productService.sortProperty = sort.active;
        this.productService.sortDirection = sort.direction;

        this.productService.getFiltered(this.searchBy, this.filter?.value)
            .subscribe((response: PaginatedResponse) => {
                this._totalItemsCount = response.totalItems;
                this.items.update(() => response.items)
            });
    }

    search() {
        this.productService.getFiltered(this.searchBy, this.filter?.value)
            .subscribe((response: PaginatedResponse) => {
                this._totalItemsCount = response.totalItems;
                this.items.update(() => response.items)
            });
    }

    addItem() {
        const dialogRef = this.dialog.open(AddInventoryItemComponent, {
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            this.search();
        });
    }

    editItem(element: any) {
        const dialogRef = this.dialog.open(AddInventoryItemComponent, {
            data: element,
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            this.search();
        });
    }

    deleteItem(id: number) {
        const dialogRef = this.dialog.open(BasicConfirmationComponent, {
            data: {
                message: "¿Desea eliminar el item?"
            },
            disableClose: true
        });

        dialogRef.afterClosed().subscribe((response) => {
            if (response) {
                this.productService.deleteItem(id)
                this.search();
            }
        });
    }

    get itemsPerPage(): number[] {
        return this.productService.itemsPerPage;
    }

    get paginatorLength(): number {
        return this._totalItemsCount;
    }

    get sortActive(): string {
        return this.productService.sortProperty;
    }

    get sortDirection(): SortDirection {
        return this.productService.sortDirection;
    }

    get columns(): ColumnDefinition[] {
        return this._columns;
    }

    get columnNames(): string[] {
        return this.columns.map((col) => col.field);
    }

    get isSearchDisabled(): boolean {
        return this.searchBy == '';
    }
}