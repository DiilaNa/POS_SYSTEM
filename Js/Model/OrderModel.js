export default class OrderModel {
    constructor(orderID,customerID,paymentID,amount) {
        this.orderID = orderID;
        this.customerID = customerID;
        this.paymentID = paymentID;
        this.amount = amount;
    }
}