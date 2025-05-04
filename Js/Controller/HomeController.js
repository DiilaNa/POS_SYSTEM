import {customer_db,orders_db,item_db} from "../DB/db.js";

$(document).ready(() => {
    f();
});

export function f() {
    let customerCount = customer_db.length;
    $('#setCustomerCount').text(customerCount === 0 ? "0" : customerCount);
    let orderCount = orders_db.length;
    $('#setOrdersCount').text(orderCount === 0 ? "0" : orderCount);
    let itemCount = item_db.length;
    $('#setItemCount').text(itemCount === 0 ? "0" : itemCount);
}
