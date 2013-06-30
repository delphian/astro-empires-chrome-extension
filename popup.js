
var astroEmpires = new AEObject(localStorage['server'], localStorage['email'], localStorage['password']);

jQuery('document').ready(function ($) {
    // Populate values from local storage.
    printValues(astroEmpires);
    // Update values when button is clicked.
    $('button.test').click(function () {
        astroEmpires.aeGetData();
        // @todo This is always going to be 1 click behind.
        printValues(astroEmpires);
    })
})

function printValues(ae) {
    jQuery('div.credits-value').html(ae.aeStats.credits);
    jQuery('div.income-value').html(ae.aeStats.income + ' per hour');
    jQuery('div.fleetsize-value').html(ae.aeStats.fleetSize);
    jQuery('div.technology-value').html(ae.aeStats.technology);
    jQuery('div.level-value').html(ae.aeStats.level);
    jQuery('div.rank-value').html(ae.aeStats.rank);  
}
