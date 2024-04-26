export interface ProductModel {
    id: number;
    sku: string;
    defaultImageURL: string;
    defaultName: string;
    price: number;
    brand: string;
    availableItems: number;
    altImages: any[];
    tags: string[];
}