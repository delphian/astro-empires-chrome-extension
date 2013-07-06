
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

// Fetch information every 10 seconds.
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
 * Send OS a notification when we received new guild messages.
 */
function printMessage(data, messageType, ae) {
    var msg = data.message.message.replace(/<(?:.|\n)*?>/gm, '');
    window.webkitNotifications.createNotification('images/icon.png', 'Guild Message', msg).show();
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
