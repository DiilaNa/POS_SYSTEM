export default class OrderModel{
    constructor(orderId,itemName,qty,price,total) {
        this.orderId = orderId;
        this.itemName = itemName;
        this.qty = qty;
        this.price = price;
        this.total = total;
    }
}