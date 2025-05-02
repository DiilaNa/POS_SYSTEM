import {item_db} from "../DB/db.js";
import {customer_db} from "../DB/db.js";

/*---------------------Load Item ID When The Page is Loading-------------------*/
$(document).ready(function() {
    $('#loadCustomerIdInOrder').css('visibility','hidden');
    $('#loadOrderIdInOrder').css('visibility','hidden');
});

/*--------------------Search Customer In the DB--------------------------------*/
$('#searchCustomer').on('click',function () {
    search();
})

function search() {
    let id = $('#searchCustomerInput').val().trim();
    if (!id){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Search an ID first",
        });
        return
    }
    console.log("Customer DB at search time:", customer_db);
    console.log("Searching ID :" , id)

    const c = customer_db.find(cust => cust.customerID === id);
    if (c){
        $('#loadCustomerIdInOrder').css('visibility','visible');
        $('#loadCid').text(c.customerID)
        $('#loadCName').text(c.customerName)
        $('#loadCAddress').text(c.address)
        $('#loadCSalary').text(c.customerSalary)
    }else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Id does not Exist",
        });
    }
}

