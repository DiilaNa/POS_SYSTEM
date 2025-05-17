import {customer_db,orders_db,item_db} from "../DB/db.js";

$(document).ready(function () {
    $("section").not("#headerSection-container, #homeSection").hide();
    // Handle navigation clicks
    $("a.nav-link, .dropdown-item").click(function (e) {
        e.preventDefault(); // Prevent the default jump behavior

        const target = $(this).attr("href"); // Get the section id, like #homeSection
        if (!target || target === "#") return;

        $("section").not("#headerSection-container").hide(); // Hide all other sections
        $(target).show(); // Show the target section
    });

    $('#getStarted').click(function () {
        $("section").not("#headerSection-container").hide();
        $("#customerSection").show();
    })
    setCount();
});

export function setCount() {
    let customerCount = customer_db.length;
    $('#setCustomerCount').text(customerCount === 0 ? "0" : customerCount);
    let orderCount = orders_db.length;
    $('#setOrdersCount').text(orderCount === 0 ? "0" : orderCount);
    let itemCount = item_db.length;
    $('#setItemCount').text(itemCount === 0 ? "0" : itemCount);
}
