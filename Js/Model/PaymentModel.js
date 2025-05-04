export default class PaymentModel{
    constructor(Id,date,time,method,total) {
        this.payId = Id;
        this.date = date;
        this.time = time;
        this.method = method;
        this.payTotal = total;
    }
}