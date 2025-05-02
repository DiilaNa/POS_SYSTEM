import {item_db} from "../DB/db.js";
import ItemModel  from "../Model/ItemModel.js";


/*-----------------------Load Table Data--------------------------------------------*/
function loadItem() {
    $('#item-body').empty();
    item_db.map((item)=>{
        let id = item.itemId;
        let name = item.itemName;
        let quantity = item.itemQty;
        let price = item.itemPrice;

        let  data = `<tr>
                            <td>${id}</td>
                            <td>${name}</td>
                            <td>${quantity}</td>
                            <td>${price}</td>
                        </tr>`
        $('#item-body').append(data);

    })
}

/*---------------------------Save Customer----------------------------------------*/
$('#item_save').on('click',function () {
   /* let id = generateCustomerID()*/
    let id = $('#itemCode').val();
    let name = $('#itemName').val();
    let qty = $('#itemQuantity').val();
    let price = $('#itemPrice').val();

    if (id === '' || name === '' || qty === '' || price === ''){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
        });
    }else {
        let item_data = new ItemModel(id,name,qty,price);
        item_db.push(item_data);
        loadItem();
        Swal.fire({
            title: "Data Saved Successfully!",
            icon: "success",
            draggable: true
        });
    }
});