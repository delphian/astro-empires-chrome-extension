
var ae = new AstroEmpires.AE(localStorage['server'], localStorage['email'], localStorage['password']);

/**
 * Return a reference to the popup window object.
 *
 * @return object|bool
 *   The window object if it exists (open), false otherwise.
 */
function getPopup() {
    var popup = false,
        popups = chrome.extension.getViews({type: "popup"});
    if (popups.length > 0) {
        popup = popups[0];
    }
    return popup;
}

jQuery('document').ready(function ($) {
    // Populate values from local storage.
    ae.getData();
    $('')
    // Poll for updates.
    setInterval(function () {
        ae.getData();
        printValues(ae);
    }, 10000);
});

function printValues(ae) {
    if (popup = getPopup()) {
        popup.printValues(ae);
    }
}

/**
 * Update popup with new messages received.
 */
function printMessage(data, messageType, ae) {
    if (popup = getPopup()) {
        popup.printMessage(data, messageType, ae);
    }
    window.webkitNotifications.createNotification('images/icon.png', 'Guild Message', data.message.message).show();
}
ae.subscribe('msg_add_pre', printMessage);

/**
 * Updating the popup with what we are currently doing.
 */
function printStatus(data, messageType, ae) {
    if (popup = getPopup()) {
        popup.printStatus(data, messageType, ae);
    }
}
ae.subscribe('ajax', printStatus);
