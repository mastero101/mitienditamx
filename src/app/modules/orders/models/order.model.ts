export interface OrderModel {
    id: number;
    orderId: string;
    totalAmount: number;
    itemsTotalAmount: number;
    items: [];
    buyerName: string;
    date: Date;
    statusKey: number;
    statusValue: string;
    bankTrackCode:  string;
    shipmentTrackCode: string;
}