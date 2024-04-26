import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class LocalStorageService {
    constructor() { }

    clearAll(key: string): void {
        localStorage.removeItem(key);
    }

    update(key: string, items: any[] | any): void {
        localStorage.removeItem(key);
        localStorage.setItem(key, JSON.stringify(items));
    }

    getAll(key: string): any[] {
        const items = localStorage.getItem(key);
        return items ? JSON.parse(items) : [];
    }

    getItem(key: string): any {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    getItemById(key: string, id: number): any {
        const items = this.getAll(key);
        return items.find(c => c.id == id);
    }

    resetAllKeys(){
        localStorage.removeItem('cart');
        localStorage.removeItem('orders');
        localStorage.removeItem('inventory');
    }
}