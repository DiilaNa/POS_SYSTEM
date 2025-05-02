import {customer_db} from "../DB/db.js";
import CustomerModel  from "../Model/CustomerModel.js";

/*Load Customer Id When The Page is Loading*/
$(document).ready(function() {
    $('#customerId').val(generateCustomerID());
});

/*Generate next Customer Id*/
function generateCustomerID() {
    if (customer_db.length === 0) {
        return "C001";
    }

    // Get the last customer ID (assuming last added is at the end)
    let lastId = customer_db[customer_db.length - 1].customerID; // e.g., "C005"

    let numberPart = parseInt(lastId.substring(1)); // Remove 'C' and convert to int, e.g., 5
    let newId = numberPart + 1;

    return "C" + newId.toString().padStart(3, '0'); // e.g., "C006"
}
/*Load Table Data */
function loadCustomers() {
    $('#customer-tbody').empty();
    customer_db.map((customer,index)=>{
        let id = customer.customerID;
        let name = customer.customerName;
        let address = customer.address;
        let salary = customer.customerSalary;

        let  data = `<tr>
                            <td>${id}</td>
                            <td>${name}</td>
                            <td>${address}</td>
                            <td>${salary}</td>
                        </tr>`
        $('#customer-tbody').append(data);

    })
}

/*Save Customer*/
$('#customer_save').on('click',function () {
    let id = generateCustomerID()
    $('#customerId').val(id);
    let name = $('#customerName').val();
    let address = $('#customerAddress').val();
    let salary = $('#customerSalary').val();

    if (id === '' || name === '' || address === '' || salary === ''){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
        });
    }else {
        let customer_data = new CustomerModel(id,name,address,salary);
        customer_db.push(customer_data);
        loadCustomers();
        clearForm();
        Swal.fire({
            title: "Data Saved Successfully!",
            icon: "success",
            draggable: true
        });
    }
});
/*Clear data*/
function clearForm() {
    $('#customerId').val(generateCustomerID());
    $('#customerName').val('');
    $('#customerAddress').val('');
    $('#customerSalary').val('');
}
$('#customer_reset').on('click',function () {
    clearForm();
})

/*Onclick*/
$("#customer-tbody").on('click', 'tr', function(){
    let idx = $(this).index();
    let obj = customer_db[idx];

    let id = obj.customerID;
    let name = obj.customerName;
    let address = obj.address;
    let salary = obj.customerSalary

    $("#customerId").val(id);
    $("#customerName").val(name);
    $("#customerAddress").val(address);
    $("#customerSalary").val(salary);
});

