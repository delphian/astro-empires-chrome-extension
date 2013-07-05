
var ae = new AstroEmpires.AE(localStorage['server'], localStorage['email'], localStorage['password']);

jQuery('document').ready(function ($) {
    // Populate values from local storage.
    ae.getData();
    // Poll for updates.
    setInterval(function () {
        ae.getData();
        printValues(ae);
    }, 5000);
});

function printValues(ae) {
    jQuery('div.credits-value').html(ae.stats.credits);
    jQuery('div.income-value').html(ae.stats.income + ' per hour');
    jQuery('div.fleetsize-value').html(ae.stats.fleetSize);
    jQuery('div.technology-value').html(ae.stats.technology);
    jQuery('div.level-value').html(ae.stats.level);
    jQuery('div.rank-value').html(ae.stats.rank);
}

/**
 * Update popup with new messages received.
 */
function printMessage(data, messageType, ae) {
    var message = jQuery('div.message-container div.content');
    chrome.browserAction.setTitle({title: data.message.message.replace(/<(?:.|\n)*?>/gm, '')});
    message.html(data.message.message);
}
ae.subscribe('msg_add_pre', printMessage);

/**
 * Updating the popup with what we are currently doing.
 */
function printStatus(data, messageType, ae) {
    var d = new Date();
    var n = d.getTime();
    var status = jQuery('div.ae-status-container div.content');
    status.html(n);
}
ae.subscribe('ajax', printStatus);
