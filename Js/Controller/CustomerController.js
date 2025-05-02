import {customer_db} from "../DB/db.js";
import CustomerModel  from "../Model/CustomerModel.js";

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
$('#customer_save').on('click',function () {
    console.log("Click una")
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
    }else {
        let customer_data = new CustomerModel(id,name,address,salary);
        customer_db.push(customer_data);
        loadCustomers();
        Swal.fire({
            title: "Data Saved Successfully!",
            icon: "success",
            draggable: true
        });
    }
});

