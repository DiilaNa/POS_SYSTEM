import {item_db} from "../DB/db.js";
import ItemModel  from "../Model/ItemModel.js";
import {setCount} from "./HomeController.js";


/*---------------------Load Item ID When The Page is Loading-------------------*/
$(document).ready(function() {
    $('#itemCode').val(generateItemID());
    loadItem();
});

/*-----------------------Load Table Data--------------------------------------------*/
export function loadItem() {
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

/*---------------------------Save Item----------------------------------------*/
$('#item_save').on('click',function () {
    let id = generateItemID();
    $('#itemCode').val(id);
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
        clearForm();
        setCount();
        Swal.fire({
            title: "Data Saved Successfully!",
            icon: "success",
            draggable: true
        });
    }
});

/*--------------------------Generate next Item Id----------------------------*/
function generateItemID() {
    if (item_db.length === 0) {
        return "I001";
    }
    // Get the last Item ID (assuming last added is at the end)
    let lastId = item_db[item_db.length - 1].itemId;
    let numberPart = parseInt(lastId.substring(1));
    let newId = numberPart + 1;
    return "I" + newId.toString().padStart(3, '0');
}

/*---------------------------Clear data in the form--------------------------------------------*/
function clearForm() {
    $('#itemCode').val(generateItemID());
    $('#itemName').val('');
    $('#itemQuantity').val('');
    $('#itemPrice').val('');
}
$('#item_reset').on('click',function () {
    clearForm();
})
/*-----------------------Table Onclick Action-------------------------------------*/
$("#item-body").on('click', 'tr', function(){
    let idx = $(this).index();
    let obj = item_db[idx];

    let id = obj.itemId;
    let name = obj.itemName;
    let qty = obj.itemQty;
    let price = obj.itemPrice

    $("#itemCode").val(id);
    $("#itemName").val(name);
    $("#itemQuantity").val(qty);
    $("#itemPrice").val(price);
});

/*---------------Update Item Details-------------------------------*/
$('#item_update').on('click', function () {
    let id = $('#itemCode').val();
    let name = $('#itemName').val();
    let qty = $('#itemQuantity').val();
    let price = $('#itemPrice').val();

    if (id === '' || name === '' || qty === '' || price === '') {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Select data to update!",
        });
        return;
    }

    /*Find index of Item by ID*/
    const index = item_db.findIndex(c => c.itemId === id);

    if (index !== -1) {
        item_db[index].itemName= name;
        item_db[index].itemQty = qty;
        item_db[index].itemPrice = price;

        loadItem();
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
            text: "Item with ID " + id + " does not exist.",
        });
    }
});

/*--------------------------Delete Item--------------------------*/
$('#item_delete').on('click', function () {
    let id = $('#itemCode').val();

    if (id === '') {
        Swal.fire({
            icon: "warning",
            title: "No ID",
            text: "Please select a item to delete.",
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
            const index = item_db.findIndex(c => c.itemId === id);
            if (index !== -1) {
                item_db.splice(index, 1); // Remove from array
                loadItem();
                clearForm();
                Swal.fire(
                    "Deleted!",
                    "Item has been deleted.",
                    "success"
                );
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Not Found",
                    text: "Item with ID " + id + " does not exist.",
                });
            }
        }
    });
});