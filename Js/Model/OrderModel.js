export default class OrderModel {
    constructor(orderID,customerName/*,itemName,qty,*/,method,amount) {
        this.orderID = orderID;
        this.customerName = customerName;
       /* this.itemName = itemName;
        this.qty = qty;*/
        this.method = method;
        this.amount = amount;
    }
}