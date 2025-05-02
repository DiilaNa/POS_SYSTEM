import {item_db} from "../DB/db.js";
import {customer_db} from "../DB/db.js";

/*---------------------Load Item ID When The Page is Loading-------------------*/
$(document).ready(function() {
    $('#loadCustomerIdInOrder').hide();
    $('#loadOrderIdInOrder').hide();
});