import {customer_db} from "../DB/db.js";
import CustomerModel  from "../Model/CustomerModel.js";
import {setCount} from "./HomeController.js"

/*---------------------Load Customer ID When The Page is Loading-------------------*/
$(document).ready(function() {
    $('#customerId').val(generateCustomerID());
    loadCustomers();
});

/*------Real time Validation For input fields--------*/
const namePattern = /^[A-Za-z\s]{3,}$/; // Only letters and spaces, at least 3 characters
const addressPattern = /^[A-Za-z\s]{3,}$/;
const phonePattern = /^(\+94|0)?7\d{8}$/; // Sri Lankan mobile format

$('#customerName').on('input', function () {
    if (!namePattern.test($(this).val())) {
        $(this).addClass('is-invalid').removeClass('is-valid');
    } else {
        $(this).addClass('is-valid').removeClass('is-invalid');
    }
});

$('#customerAddress').on('input', function () {
    if (!addressPattern.test($(this).val())) {
        $(this).addClass('is-invalid').removeClass('is-valid');
    } else {
        $(this).addClass('is-valid').removeClass('is-invalid');
    }
});
$('#customerPhone').on('input', function () {
    if (!phonePattern.test($(this).val())) {
        $(this).addClass('is-invalid').removeClass('is-valid');
    } else {
        $(this).addClass('is-valid').removeClass('is-invalid');
    }
});

/*--------------------------Generate next Customer Id----------------------------*/
function generateCustomerID() {
    if (customer_db.length === 0) {
        return "C001";
    }
    // Get the last customer ID (assuming last added is at the end)
    let lastId = customer_db[customer_db.length - 1].customerID;
    let numberPart = parseInt(lastId.substring(1));
    let newId = numberPart + 1;
    return "C" + newId.toString().padStart(3, '0');
}
/*-----------------------Load Table Data--------------------------------------------*/
function loadCustomers() {
    $('#customer-tbody').empty();
    customer_db.map((customer,index)=>{
        let id = customer.customerID;
        let name = customer.customerName;
        let address = customer.address;
        let phone = customer.customerPhone;

        let  data = `<tr>
                            <td>${id}</td>
                            <td>${name}</td>
                            <td>${address}</td>
                            <td>${phone}</td>
                        </tr>`
        $('#customer-tbody').append(data);

    })
}

/*---------------------------Save Customer----------------------------------------*/
$('#customer_save').on('click',function () {
    let id = generateCustomerID()
    $('#customerId').val(id);
    let name = $('#customerName').val();
    let address = $('#customerAddress').val();
    let phone = $('#customerPhone').val();

    if (!namePattern.test(name) || !addressPattern.test(address) || !phonePattern.test(phone)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Input",
            text: "Please enter valid customer details.",
        });
    }else {
        let customer_data = new CustomerModel(id,name,address,phone);
        customer_db.push(customer_data);
        loadCustomers();
        clearForm();
        setCount();
        Swal.fire({
            title: "Data Saved Successfully!",
            icon: "success",
            draggable: true
        });
    }
});
/*---------------------------Clear data in the form--------------------------------------------*/
function clearForm() {
    $('#customerId').val(generateCustomerID());
    $('#customerName').val('');
    $('#customerAddress').val('');
    $('#customerPhone').val('');
}
$('#customer_reset').on('click',function () {
    clearForm();
})

/*-----------------------Table Onclick Action-------------------------------------*/
$("#customer-tbody").on('click', 'tr', function(){
    let idx = $(this).index();
    let obj = customer_db[idx];

    let id = obj.customerID;
    let name = obj.customerName;
    let address = obj.address;
    let phone = obj.customerPhone;

    $("#customerId").val(id);
    $("#customerName").val(name);
    $("#customerAddress").val(address);
    $("#customerPhone").val(phone);
});

/*---------------Update Customer Details-------------------------------*/
$('#customer_update').on('click', function () {
    let id = $('#customerId').val();
    let name = $('#customerName').val();
    let address = $('#customerAddress').val();
    let phone = $('#customerPhone').val();

    if (id === '' || name === '' || address === '' || phone === '') {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Select data to update!",
        });
        return;
    }

    /*Find index of customer by ID*/
    const index = customer_db.findIndex(c => c.customerID === id);

    if (index !== -1) {
        customer_db[index].customerName = name;
        customer_db[index].address = address;
        customer_db[index].customerPhone = phone;

        loadCustomers();
        clearForm();

        Swal.fire({
            title: "Updated Successfully!",
            icon: "success",
            draggable: true
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Not Found",
            text: "Customer with ID " + id + " does not exist.",
        });
    }
});

/*--------------------------Delete Customer--------------------------*/
$('#customer_delete').on('click', function () {
    let id = $('#customerId').val();

    if (id === '') {
        Swal.fire({
            icon: "warning",
            title: "No ID",
            text: "Please select a customer to delete.",
        });
        return;
    }

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            const index = customer_db.findIndex(c => c.customerID === id);
            if (index !== -1) {
                customer_db.splice(index, 1); // Remove from array
                loadCustomers();
                clearForm();
                Swal.fire(
                    "Deleted!",
                    "Customer has been deleted.",
                    "success"
                );
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Not Found",
                    text: "Customer with ID " + id + " does not exist.",
                });
            }
        }
    });
});


