import { Injectable } from "@angular/core";
import { SortDirection } from "@angular/material/sort";
import { Observable, of } from "rxjs";
import { PaginatedResponse } from "../../../shared/models/paginated-response.model";
import { PaginatorConfig } from "../../../shared/models/paginator-config.model";
import { SortConfig } from "../../../shared/models/sort-config.model";
import { LocalStorageService } from "../../../shared/services/local-storage.service";
import { UtilsService } from "../../../shared/services/utils.service";
import { ProductModel } from "../models/product.model";

@Injectable({ providedIn: 'root' })

export class ProductService {
    constructor(
        private localStorageService: LocalStorageService,
        private utilsService: UtilsService
    ) {
        this._generateMockData();
    }

    private _paginatorConfig = <PaginatorConfig>{
        pageIndex: 0,
        pageSize: 25,
        itemsPerPage: [25, 50, 100]
    };
    private _sortConfig = <SortConfig>{
        sortProperty: "id",
        sortDirection: "desc"
    };

    getFiltered(filterBy: string = '', filter: any = null, tags: string[] | null = null, sortBy: number | undefined = undefined, fromProducts = false): Observable<PaginatedResponse> {
        const filtered = this._simulateFilter(filterBy, filter, tags, sortBy, fromProducts);
        const skip = this.pageIndex * this.pageSize;

        return of(<PaginatedResponse>{
            items: filtered.length == 0 ? [] : filtered.slice(skip, skip + this.pageSize),
            totalItems: filtered.length
        });
    }

    addItem(defaultName: string, availableItems: number, brand: string, defaultImageURL: string, price: number, id: number | undefined = undefined) {
        const item = <ProductModel>{
            defaultName,
            availableItems,
            brand,
            defaultImageURL,
            price
        };

        let inventory = this._inventory;

        if (id) {
            const itemIndex = inventory.findIndex(x => x.id === id);
            inventory.splice(itemIndex, 1);
            item.id = id;
            inventory.push(item);
        } else {
            item.id = inventory.length + 1;
            inventory.push(item);
        }

        this.localStorageService.update('inventory', inventory);;
    }

    deleteItem(id: number) {
        let inventory = this._inventory;

        const itemIndex = inventory.findIndex(x => x.id === id);
        inventory.splice(itemIndex, 1);
        this.localStorageService.update('inventory', inventory);
    }

    private _simulateFilter(filterBy: string, filter: string, tags: string[] | null = null, sortBy: number | undefined = undefined, fromProducts = false): any[] {
        let results: any[] = [];
        if (filter?.length > 0) {
            filter = filter.toLowerCase();

            switch (filterBy) {
                case "defaultName":
                    results = this._inventory.filter(i => i.defaultName?.toLowerCase()?.includes(filter));
                    break;
                case "brand":
                    results = this._inventory.filter(i => i.brand?.toLowerCase()?.includes(filter));
                    break;
            }

        } else {
            results = this._inventory;
        }

        if (tags && tags.length > 0) {
            results = results.filter(c => {
                return c.tags?.length > 0 && this.utilsService.hasSubArray(c.tags as string[], tags)
            });
        }

        if (results.length === 0) {
            return results;
        }

        if (fromProducts) {
            switch (sortBy) {
                case 1:
                    return results.sort(this._dynamicSort('price'));
                case 2:
                    return results.sort(this._dynamicSort('-price'));
                default:
                    return results.sort(this._dynamicSort('-id'));
            }
        } else {
            const sortProperty = this._sortConfig.sortDirection === 'asc' ? `${this._sortConfig.sortProperty}` : `-${this._sortConfig.sortProperty}`
            return results.sort(this._dynamicSort(sortProperty));
        }
    }

    private _dynamicSort(property: string) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a: any, b: any) {
            /* next line works with strings and numbers, 
             * and you may want to customize it to your needs
             */
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    private _generateMockData() {
        if (this.localStorageService.getAll('inventory')?.length > 0) {
            return;
        }

        const _mockDataTemp = <ProductModel[]>[]

        for (let i = 1; i <= 130; i++) {
            const randomItem = <ProductModel>{
                id: i
            };

            const type: number = Math.floor(Math.random() * 4) + 1;
            const available: number = Math.floor(Math.random() * 4);
            switch (type) {
                case 1:
                    randomItem.defaultName = `Camisa Polo ${i}`
                    randomItem.availableItems = available;
                    randomItem.brand = "Toching Stone";
                    randomItem.defaultImageURL = "https://m.media-amazon.com/images/I/61ogqwPRWQL._AC_SX569_.jpg";
                    randomItem.price = Math.random() * 100;
                    break;
                case 2:
                    randomItem.defaultName = `Llanta para nieve ${i}`
                    randomItem.availableItems = available;
                    randomItem.brand = "All Paths";
                    randomItem.defaultImageURL = "https://m.media-amazon.com/images/I/61PEw9hQdZL._AC_SL1053_.jpg";
                    randomItem.price = Math.random() * 100;
                    break;
                case 3:
                    randomItem.defaultName = `Termo para agua ${i}`
                    randomItem.availableItems = available;
                    randomItem.brand = "Mi Termito";
                    randomItem.defaultImageURL = "https://m.media-amazon.com/images/I/31PV5USdBHL._AC_SL1000_.jpg";
                    randomItem.price = Math.random() * 100;
                    break;
                case 4:
                    randomItem.defaultName = `Reloj inteligente ${i}`
                    randomItem.availableItems = available;
                    randomItem.brand = "Right Time";
                    randomItem.defaultImageURL = "https://m.media-amazon.com/images/I/61GsL2psIZL._AC_SL1200_.jpg";
                    randomItem.price = Math.random() * 100;
                    break;
            }

            switch (available) {
                case 1:
                    randomItem.tags = ['nuevo'];
                    break;
                case 2:
                    randomItem.tags = ['promocion'];
                    break;
            }

            _mockDataTemp.push(randomItem);
        }

        this.localStorageService.update('inventory', _mockDataTemp);
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

    get itemsPerPage(): number[] {
        return this._paginatorConfig.itemsPerPage;
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

    get _inventory(): ProductModel[] {
        return this.localStorageService.getAll('inventory');
    }
}