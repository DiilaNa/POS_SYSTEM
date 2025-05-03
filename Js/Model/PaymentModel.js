export default class PaymentModel{
    constructor(Id,date,method,total) {
        this.payId = Id;
        this.date = date;
        this.method = method;
        this.payTotal = total;
    }
}