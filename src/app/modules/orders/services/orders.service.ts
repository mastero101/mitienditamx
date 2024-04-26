import { Injectable } from "@angular/core";
import { SortDirection } from "@angular/material/sort";
import { Observable, of } from "rxjs";
import { PaginatedResponse } from "../../../shared/models/paginated-response.model";
import { PaginatorConfig } from "../../../shared/models/paginator-config.model";
import { SortConfig } from "../../../shared/models/sort-config.model";
import { LocalStorageService } from "../../../shared/services/local-storage.service";
import { UtilsService } from "../../../shared/services/utils.service";
import { OrderModel } from "../models/order.model";

@Injectable({ providedIn: 'root' })

export class OrdersService {
    constructor(
        private localStorageService: LocalStorageService,
        private utilsService: UtilsService
    ) { }

    private _paginatorConfig = <PaginatorConfig>{
        pageIndex: 0,
        pageSize: 25,
        itemsPerPage: [25, 50, 100]
    };

    private _sortConfig = <SortConfig>{
        sortProperty: "id",
        sortDirection: "desc"
    };

    getFiltered(filterBy: string = '', filter: any = null): Observable<PaginatedResponse> {
        const filtered = this._simulateFilter(filterBy, filter);
        const skip = this.pageIndex * this.pageSize;

        return of(<PaginatedResponse>{
            items: filtered.length == 0 ? [] : filtered.slice(skip, skip + this.pageSize),
            totalItems: filtered.length
        });
    }

    addOrder(order: any, items: any[]): Observable<OrderModel> {
        const orderModel = <OrderModel>{
            orderId: this._getUniqueId(4),
            totalAmount: order?.payment?.productsTotal + order?.payment?.shipmentTotal,
            itemsTotalAmount: order?.payment?.productsTotal,
            items: items,
            buyerName: order?.clientInfo?.name,
            date: new Date(),
            statusKey: 1,
            statusValue: 'Creado'
        };

        let orders = this._orders;
        orderModel.id = orders.length + 1;
        orders.push(orderModel);
        this.localStorageService.update('orders', orders);

        return of(orderModel);
    }

    updateOrder(id: number, statusKey: number, trackOrder: string) {
        const orders = this._orders;
        let order = orders.find(c => c.id === id);

        const itemIndex = orders.findIndex(x => x.id === id);
        orders.splice(itemIndex, 1);

        order!.shipmentTrackCode = trackOrder;
        order!.statusKey = statusKey;

        switch (order!.statusKey) {
            case 1:
                order!.statusValue = "Creado";
                break;
            case 2:
                order!.statusValue = "Pendiente";
                break;
            case 3:
                order!.statusValue = "Pago Invalido";
                break;
            case 4:
                order!.statusValue = "Pagado";
                break;
            case 5:
                order!.statusValue = "Enviado";
                break;
            case 6:
                order!.statusValue = "Cancelado";
                break;
        }

        orders.push(order!);
        this.localStorageService.update('orders', orders);
    }

    addBankTrackCode(id: number, bankTrackCode: string) {
        const orders = this._orders;
        let order = orders.find(c => c.id === id);

        const itemIndex = orders.findIndex(x => x.id === id);
        orders.splice(itemIndex, 1);

        order!.bankTrackCode = bankTrackCode;
        order!.statusKey = 2;
        order!.statusValue = "Pendiente";

        orders.push(order!);
        this.localStorageService.update('orders', orders);
    }

    deleteItem(id: number) {
        let inventory = this._orders;

        const itemIndex = inventory.findIndex(x => x.id === id);
        inventory.splice(itemIndex, 1);
        this.localStorageService.update('orders', inventory);
    }

    private _simulateFilter(filterBy: string, filter: string): any[] {
        let results: any[] = [];

        if (filter?.length > 0) {
            filter = filter.toLowerCase();

            switch (filterBy) {
                case "statusValue":
                    results = this._orders.filter(i => i.statusValue?.toLowerCase()?.includes(filter));
                    break;
                case "buyerName":
                    results = this._orders.filter(i => i.buyerName?.toLowerCase()?.includes(filter));
                    break;
            }
        } else {
            results = this._orders;
        }

        if (results.length === 0) {
            return results;
        }

        const sortProperty = this._sortConfig.sortDirection === 'asc' ? `${this._sortConfig.sortProperty}` : `-${this._sortConfig.sortProperty}`
        return results.sort(this.utilsService.dynamicSort(sortProperty));
    }

    //Only for testing remove after backend completed
    private _getUniqueId(parts: number): string {
        const stringArr = [];
        for (let i = 0; i < parts; i++) {
            // tslint:disable-next-line:no-bitwise
            const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            stringArr.push(S4);
        }
        return stringArr.join('-');
    }

    get _orders(): OrderModel[] {
        return this.localStorageService.getAll('orders');
    }

    get pageSize(): number {
        return this._paginatorConfig.pageSize;
    }

    set pageSize(pageSize: number) {
        this._paginatorConfig.pageSize = pageSize;
    }

    get pageIndex(): number {
        return this._paginatorConfig.pageIndex;
    }

    set pageIndex(pageIndex: number) {
        this._paginatorConfig.pageIndex = pageIndex;
    }

    get sortProperty(): string {
        return this._sortConfig.sortProperty;
    }

    set sortProperty(propertyName: string) {
        this._sortConfig.sortProperty = propertyName;
    }

    get sortDirection(): SortDirection {
        return this._sortConfig.sortDirection;
    }

    set sortDirection(direction: SortDirection) {
        this._sortConfig.sortDirection = direction === '' ? 'asc' : direction;
    }

    get itemsPerPage(): number[] {
        return this._paginatorConfig.itemsPerPage;
    }
}