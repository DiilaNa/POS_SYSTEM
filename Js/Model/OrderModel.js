export default class OrderModel{
    constructor(customerName,itemName,qty,price,total) {
        this.customerName = customerName;
        this.itemName = itemName;
        this.qty = qty;
        this.price = price;
        this.total = total;
    }
}