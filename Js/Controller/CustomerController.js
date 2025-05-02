import {customer_db} from "../DB/db";
import CustomerModel  from "../Model/CustomerModel";

function loadCustomers() {
    $('#customer-tbody').empty();
    customer_db.map((customer)=>{
        let id = customer.id;
        let name = customer.name;
        let address = customer.address;
        let phone = customer.phone;

        let  data = `\`<tr>
                            <td>${id}</td>
                            <td>${name}</td>
                            <td>${address}</td>
                            <td>${phone}</td>
                        </tr>`
        $('#customer-tbody').append(data);

    })
}
$('#customer_save').on('click',function () {
    let id = $('')
})
