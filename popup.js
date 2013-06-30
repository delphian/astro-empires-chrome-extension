
var astroEmpires = new AEObject(localStorage['server'], localStorage['name'], localStorage['password']);

jQuery('document').ready(function ($) {
    // Populate values from local storage.
    printValues();
    // Update values when button is clicked.
    $('button.test').click(function () {
        astroEmpires.aeGetData();
    })
})

function printValues() {
    jQuery('div.credits-value').html(localStorage['credits']);
    jQuery('div.income-value').html(localStorage['income'] + ' per hour');
    jQuery('div.fleetsize-value').html(localStorage['fleetSize']);
    jQuery('div.technology-value').html(localStorage['technology']);
    jQuery('div.level-value').html(localStorage['level']);
    jQuery('div.rank-value').html(localStorage['rank']);  
}
