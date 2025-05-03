import {item_db, orders_db} from "../DB/db.js";
import {customer_db} from "../DB/db.js";
import OrderModel from "../Model/OrderModel.js";
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
        $('#loadCSalary').val(c.customerSalary);
    }else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Id does not Exist",
        });
    }
}
/*--------------------Reset BTN in Customer---------------------------*/
$('#resetCustomerDetails').on('click',function () {
    $('#searchCustomerInput').val('');
    $('#loadCid').val('');
    $('#loadCName').val('');
    $('#loadCAddress').val('');
    $('#loadCSalary').val('');
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
$('#resetItemDetails').on('click',function () {
    $('#itemIDInput').val('');
    $('#loadItemId').val('');
    $('#loadItemName').val('');
    $('#loadItemQty').val('');
    $('#loadItemPrice').val('');
    $('#quantity').val('');
})

/*----------------Save and Quantity Check---------------------------*/
$('#addToOrder').on('click',function () {
    let itemName = $('#loadItemName').val();
    let price = $('#loadItemPrice').val();
    let quantityOnHand = $('#loadItemQty').val();
    let needQty = $('#quantity').val();
    let total = price*needQty;

    if (quantityOnHand<needQty){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Not enough Quantity",
        });
    } else {
        let order_data = new OrderModel(itemName,needQty,price,total);
        orders_db.push(order_data);
        loadOrderTable();

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
        let itemName = order.itemName;
        let qty = order.qty;
        let price = order.price;
        let total = order.total;
        let data = `<tr>
                            <td>${index + 1}</td>
                            <td>${itemName}</td>
                            <td>${qty}</td>
                            <td>${price}</td>
                             <td>${total}</td>
                        </tr>`
        $('#order-body').append(data);
    })
}

