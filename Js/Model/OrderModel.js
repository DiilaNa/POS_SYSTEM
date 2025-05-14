export default class OrderModel{
    constructor(orderID,customerName,itemName,qty,price,total) {
        this.orderID = orderID;
        this.customerName = customerName;
        this.itemName = itemName;
        this.qty = qty;
        this.price = price;
        this.total = total;
    }
}