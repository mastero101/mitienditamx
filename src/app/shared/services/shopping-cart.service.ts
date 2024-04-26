import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { LocalStorageService } from "./local-storage.service";
import { SnackBarService } from "./snackbar.service";

@Injectable({ providedIn: 'root' })

export class ShoppingCartService {
    constructor(
        private localStorageService: LocalStorageService,
        private snackBarService: SnackBarService
    ) { }

    private _deletedItem = new Subject<boolean>();
    onDeletedItem$ = this._deletedItem.asObservable();

    addItem(name: string, price: number, url: string, id: number, count: number = 1): void {
        const cartItems = this._cartItems;
        const existingItem = cartItems.find(c => c.id === id);

        if (existingItem) {
            existingItem.count += count;
        } else {
            cartItems.push({
                name,
                price,
                url,
                count,
                id
            });
        }
        this._updateInventoryAvailability(count, id);
        this.localStorageService.update('cart', cartItems);
    }

    private _updateInventoryAvailability(count: number, id: number, isDelete = false) {
        const inventory = this._inventory;
        const inventoryItem = inventory.find(c => c.id === id);

        if (isDelete) {
            inventoryItem.availableItems += count;
        } else {
            inventoryItem.availableItems -= count;
        }

        if (inventoryItem.availableItems < 0) {
            inventoryItem.availableItems = 0;
        }

        this.localStorageService.update('inventory', inventory);
        if (isDelete) {
            this._deletedItem.next(true);
        }
    }

    deleteItem(id: number): void {
        const cartItems = this._cartItems;
        const cartItem = cartItems.find(c => c.id == id);

        const itemIndex = cartItems.findIndex(x => x.id === id);
        cartItems.splice(itemIndex, 1);

        this.localStorageService.update('cart', cartItems);

        this._updateInventoryAvailability(cartItem.count, id, true);
    }

    updateShoppingCartItemCount(id: number, operation: string = 'add') {
        const inventory = this._inventory;
        const inventoryItem = inventory.find(c => c.id === id);

        const cartItems = this._cartItems;
        const cartItem = cartItems.find(c => c.id == id);

        if (operation === 'add') {
            if(inventoryItem.availableItems >= 1){
                cartItem.count++;
            } else {
                this.snackBarService.displayError('No hay más productos disponibles');
                return;
            }
           
        } else {
            cartItem.count--;

            if (cartItem.count <= 0) {
                this.deleteItem(id);
                return;
            }
        }

        this.localStorageService.update('cart', cartItems);
        this._updateInventoryAvailability(cartItem.count, id, operation != 'add');
    }

    clearAll(): void {
        this.localStorageService.clearAll("cart");
    }

    get cartItems(): any[] {
        return this._cartItems;
    }

    get cartItemsCount(): number {
        return this._cartItems?.reduce(function (a, b) {
            return a + b['count'];
        }, 0) ?? 0;
    }

    get _cartItems(): any[] {
        return this.localStorageService.getAll('cart');
    }

    get _inventory(): any[] {
        return this.localStorageService.getAll('inventory');
    }
}