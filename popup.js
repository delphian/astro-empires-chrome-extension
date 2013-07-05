
// Setup initial values when popup is first opened.
jQuery('document').ready(function($) {
    var background = chrome.extension.getBackgroundPage();
    var ae = background.ae;
    // Fill in the most recent messages.
    var message = jQuery('div.message-container div.content');
    var msg = ae.msgGetLast();
    message.prepend('<div>' + msg.playerName + '</div>' + msg.message);
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
    message.prepend('<div>' + data.message.playerName + '</div>' + data.message.message);
}

/**
 * Updating the popup with what we are currently doing.
 */
function printStatus(data, messageType, ae) {
    var d = new Date();
    var n = d.getTime();
    var status = jQuery('div.ae-status-container div.content');
    status.html(n);
}
