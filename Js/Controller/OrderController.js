import {item_db, orders_db, payment_db} from "../DB/db.js";
import {customer_db} from "../DB/db.js";
import {loadItem} from "./ItemController.js";
import OrderModel from "../Model/OrderModel.js";
import PaymentModel from "../Model/PaymentModel.js";
import {setCount} from "./HomeController.js";

/*-----------------Load Page---------------------------*/
$(document).ready(function() {
    $('#invoiceNo').val(generatePayID())
    $('#generateOrderId').val(generateOrderID())
    loadOrderTable();
    loadDateAndTime();
});

/*--------------------Load date and Time -------------------------*/
function loadDateAndTime() {
    const now = new Date();

    const date = now.toISOString().split('T')[0];
    $('#invoiceDate').val(date);

    const time = now.toTimeString().split(' ')[0].substring(0,5);
    $('#invoiceTime').val(time);
}
/*--------------------Search Customer In the DB--------------------------------*/
$('#searchCustomer').on('click',function () {
    searchCustomer();
})

function searchCustomer() {
    let id = $('#searchCustomerInput').val().trim();
    if (!id){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Search an ID first",
        });
        return
    }
    const c = customer_db.find(cust => cust.customerID === id);
    if (c){
        $('#loadCid').val(c.customerID);
        $('#loadCName').val(c.customerName);
        $('#loadCAddress').val(c.address);
        $('#loadCPhone').val(c.customerPhone);
    }else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Id does not Exist",
        });
    }
}
/*--------------------Reset BTN in Customer---------------------------*/
function resetCustomer() {
    $('#generateOrderId').val(generateOrderID())
    $('#searchCustomerInput').val('');
    $('#loadCid').val('');
    $('#loadCName').val('');
    $('#loadCAddress').val('');
    $('#loadCPhone').val('');
}
$('#resetCustomerDetails').on('click',function () {
    resetCustomer();
})

/*--------------------Search Item In the DB--------------------------------*/
$('#searchItem').on('click',function () {
    searchItem();
})

function searchItem() {
    let id = $('#itemIDInput').val().trim();
    if (!id){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Search an ID first",
        });
        return
    }
    const c = item_db.find(item => item.itemId === id);
    if (c){
        $('#loadItemId').val(c.itemId);
        $('#loadItemName').val(c.itemName);
        $('#loadItemQty').val(c.itemQty);
        $('#loadItemPrice').val(c.itemPrice);
    }else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Id does not Exist",
        });
    }
}

/*-------------------Reset BTN in Item------------------------*/
function resetItem() {
    $('#itemIDInput').val('');
    $('#loadItemId').val('');
    $('#loadItemName').val('');
    $('#loadItemQty').val('');
    $('#loadItemPrice').val('');
    $('#quantity').val('');
}
$('#resetItemDetails').on('click',function () {
    resetItem();
})

/*----------------Save and Quantity Check---------------------------*/
$('#addToOrder').on('click',function () {
    let orderID = $('#generateOrderId').val();
    let itemID = $('#loadItemId').val();
    let itemName = $('#loadItemName').val();
    let customerName = $('#loadCName').val();
    let price = parseFloat($('#loadItemPrice').val());
    let needQty = parseInt($('#quantity').val());
    let item = item_db.find(item => item.itemId === itemID )

    if (!item) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No Item Found",
        });
        return
    }

    if (item.itemQty<needQty){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Not enough Quantity",
        });
    } else {
            item.itemQty -= needQty;
            let total = price*needQty;
            $('#loadTotal').text(total)
            loadItem();
            let order_data = new OrderModel(orderID,customerName,itemName,needQty,price,total);
            orders_db.push(order_data);

            loadOrderTable();
            resetItem();
            resetCustomer();
            setCount();

            Swal.fire({
                title: "Data Saved Successfully!",
                icon: "success",
                draggable: true
            });
        }
})

/*---------------------Load table--------------------*/
function loadOrderTable() {
    $('#order-body').empty();
    orders_db.map((order,index) => {
        let orderID = order.orderID;
        let customerName = order.customerName;
        let itemName = order.itemName;
        let qty = order.qty;
        let price = order.price;
        let total = order.total;
        let data = `<tr>
                            <td>${orderID}</td>
                            <td>${customerName}</td>
                            <td>${itemName}</td>
                            <td>${qty}</td>
                            <td>${price}</td>
                             <td>${total}</td>
                        </tr>`
        $('#order-body').append(data);
    })
}

/*--------------------------Generate next PayId----------------------------*/
function generatePayID() {
    if (payment_db.length === 0) {
        return "PAY001";
    }
    // Get the last Item ID (assuming last added is at the end)
    let lastId = payment_db[payment_db.length - 1].payId;
    let numberPart = parseInt(lastId.substring(3));
    let newId = numberPart + 1;
    return "PAY" + newId.toString().padStart(3, '0');
}
/*--------------------------Generate next Order Id----------------------------*/
function generateOrderID() {
    if (orders_db.length === 0) {
        return "OID-001";
    }
    // Get the last Item ID (assuming last added is at the end)
    let lastId = orders_db[orders_db.length - 1].orderID;
    let numberPart = parseInt(lastId.substring(4));
    let newId = numberPart + 1;
    return "OID-" + newId.toString().padStart(4, '0');
}
/*------------------------Save Payment-----------------------------*/
$('#addPayment').on('click',function () {
    let id = generatePayID()
    $('#invoiceNo').val(id);
    let date = $('#invoiceDate').val();
    let time = $('#invoiceTime').val();
    let method = $('#paymentMethod').val();
    let total2 = $('#loadTotal').text();
    let total = parseFloat(total2);

    if (id === '' || date === '' || time === '' || method === '' || total<=0 || isNaN(total)){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
        });
    }else {
        let payment_data = new PaymentModel(id,date,time,method,total);
        payment_db.push(payment_data);
        resetPayment();
        Swal.fire({
            title: "Data Saved Successfully!",
            icon: "success",
            draggable: true
        });
        console.log(payment_data)
    }
    console.log(payment_db)
});

/*-------------Reset Payment----------------------*/
$('#resetPaymentDetails').on('click',function () {
    resetPayment();
})
function resetPayment() {
    let id = generatePayID();
    $('#invoiceNo').val(id)
    $('#paymentMethod, #loadTotal,#loadTotal').val('');
    loadDateAndTime();
}

