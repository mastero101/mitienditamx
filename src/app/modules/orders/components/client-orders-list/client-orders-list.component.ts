import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort, SortDirection } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { FieldPipe } from '../../../../shared/pipes/field.pipe';
import { CustomPaginatorSpanish } from '../../../../shared/services/custom-paginator-intl.service';
import { OrderModel } from '../../models/order.model';
import { ColumnDefinition } from '../../../../shared/models/mat-table-column-definition';
import { PaginatedResponse } from '../../../../shared/models/paginated-response.model';
import { AddInventoryItemComponent } from '../../../inventory/components/add-item-component/add-item-component';
import { BasicConfirmationComponent } from '../../../../shared/components/basic-confirmation-modal/basic-confirmation.component';
import { OrdersService } from '../../services/orders.service';
import { UpdateOrderComponent } from '../orders-list/update-order/update-order.component';
import { UpdateClientOrderComponent } from './update-order/update-client-order.component';

@Component({
    selector: 'app-client-orders-list',
    standalone: true,
    imports: [
        CurrencyPipe,
        DatePipe,
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
    templateUrl: './client-orders-list.component.html',
    styleUrl: './client-orders-list.component.scss'
})

export class ClientOrdersListComponent implements OnInit {
    constructor(
        private ordersService: OrdersService,
        public dialog: MatDialog
    ) { }
    searchBy = 'statusValue';
    filter = new FormControl();
    items: WritableSignal<OrderModel[]> = signal([]);

    private _totalItemsCount: number = 0;
    private _columns: ColumnDefinition[] = [
        {
            field: 'statusValue', title: 'Estado', type: 'status', align: 'left', maxWidth: 150
        },
        {
            field: 'date', title: 'Fecha', align: 'left', type: 'date'
        },
        {
            field: 'totalAmount', title: 'Total', align: 'left', type: 'currency', hideOnMobile: true
        },
        {
            field: 'options', title: '', align: 'center', type: 'options', maxWidth: 50, sortDisabled: true
        }
    ];

    ngOnInit(): void {
        this.ordersService.getFiltered(this.searchBy, this.filter?.value)
            .subscribe((response: PaginatedResponse) => {
                this._totalItemsCount = response.totalItems;
                this.items.update(() => response.items)
            });
    }

    handlePageEvent(e: PageEvent) {
        this.ordersService.pageIndex = e.pageSize !== this.ordersService.pageSize ? 0 : e.pageIndex;
        this.ordersService.pageSize = e.pageSize;

        this.ordersService.getFiltered(this.searchBy, this.filter?.value)
            .subscribe((response: PaginatedResponse) => {
                this._totalItemsCount = response.totalItems;
                this.items.update(() => response.items)
            });
    }

    sortChange(sort: Sort) {
        this.ordersService.sortProperty = sort.active;
        this.ordersService.sortDirection = sort.direction;

        this.ordersService.getFiltered(this.searchBy, this.filter?.value)
            .subscribe((response: PaginatedResponse) => {
                this._totalItemsCount = response.totalItems;
                this.items.update(() => response.items)
            });
    }

    search() {
        this.ordersService.getFiltered(this.searchBy, this.filter?.value)
            .subscribe((response: PaginatedResponse) => {
                this._totalItemsCount = response.totalItems;
                this.items.update(() => response.items)
            });
    }

    bankTrackCode(element: any) {
        const dialogRef = this.dialog.open(UpdateClientOrderComponent, {
            data: element,
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            this.search();
        });
    }

    get itemsPerPage(): number[] {
        return this.ordersService.itemsPerPage;
    }

    get paginatorLength(): number {
        return this._totalItemsCount;
    }

    get sortActive(): string {
        return this.ordersService.sortProperty;
    }

    get sortDirection(): SortDirection {
        return this.ordersService.sortDirection;
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