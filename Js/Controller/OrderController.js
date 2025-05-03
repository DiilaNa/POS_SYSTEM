import {item_db} from "../DB/db.js";
import {customer_db} from "../DB/db.js";

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

/*----------------Quantity Check---------------------------*/
$('#addToOrder').on('click',function () {
    let quantityOnHand = $('#loadItemQty').val();
    let needQty = $('#quantity').val();
    if (quantityOnHand<needQty){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Not enough Quantity",
        });
    }else {

    }
})

