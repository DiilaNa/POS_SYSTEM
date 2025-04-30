$(document).ready(function () {
    $("section").not("#headerSection-container, #homeSection").hide();
    // Handle navigation clicks
    $("a.nav-link, .dropdown-item").click(function (e) {
        e.preventDefault(); // Prevent the default jump behavior

        const target = $(this).attr("href"); // Get the section id, like #homeSection
        $("section").not("#headerSection-container").hide(); // Hide all other sections
        $(target).show(); // Show the target section
    });
});