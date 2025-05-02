import {customer_db} from "../DB/db";
import CustomerModel  from "../Model/CustomerModel";

function loadCustomers() {
    $('#customer-tbody').empty();
    customer_db.map((customer)=>{
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
$('#customer_save').on('click',function () {
    let id = $('#customerId').val();
    let name = $('#customerName').val();
    let address = $('#customerAddress').val();
    let salary = $('#customerSalary').val();

    if (id === '' || name === '' || address === '' || salary === ''){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
        });
    }
})
