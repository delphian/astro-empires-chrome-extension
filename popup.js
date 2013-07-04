
var ae = new AstroEmpires.AE(localStorage['server'], localStorage['email'], localStorage['password']);

jQuery('document').ready(function ($) {
    // Populate values from local storage.
    printValues(ae);
    // Update values when button is clicked.
    $('button.test').click(function () {
        ae.getData();
        // @todo This is always going to be 1 click behind.
        printValues(ae);
    });
});

function printValues(ae) {
    jQuery('div.credits-value').html(ae.stats.credits);
    jQuery('div.income-value').html(ae.stats.income + ' per hour');
    jQuery('div.fleetsize-value').html(ae.stats.fleetSize);
    jQuery('div.technology-value').html(ae.stats.technology);
    jQuery('div.level-value').html(ae.stats.level);
    jQuery('div.rank-value').html(ae.stats.rank);
}
