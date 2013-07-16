
/**
 * @file
 * @author Bryan Hazelbaker <bryan.hazelbaker@gmail.com>
 * @version 0.8.7
 *
 * @copyright Copyright (c) 2013 Bryan Hazelbaker <bryan.hazelbaker@gmail.com>
 * Released under the MIT license. Read the entire license located in the
 * project root or at http://opensource.org/licenses/mit-license.php
 * 
 * @brief Instantiate the ae object and poll astro empires server for updates.
 *
 * @details Register callbacks on the ae object. These callbacks forward the
 * events to the popup.js which may display information based on the event.
 */

// Dont let the script run if the login information has not been provided.
if (!localStorage['server'] || !localStorage['email'] || !localStorage['password']) {
    throw "Extension not configured yet!";
}

var ae = new AstroEmpires.AE(localStorage['server'], localStorage['email'], localStorage['password']);

/**
 * Listen for messages from content scripts.
 */
chrome.extension.onRequest.addListener(function(msg, sender, sendResponse) {
    var response = null;
    if (msg.type == 'process_html') {
        ae.processData(msg.data.url, msg.data.html);
    }
    if (msg.type == 'get_player') {
        response = ae.players.players[msg.id];
    }
    sendResponse(response);
});

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

// Fetch information every 5 to 8 minutes.
jQuery('document').ready(function ($) {
    // Populate values from local storage.
    loadAE(ae);
    ae.getData();
    // Poll for updates.
    setInterval(function () {
        // From containing interval, waiting another 1 to 180 seconds before
        // polling AE. Actual poll is now between 5 and 8 minutes.
        setTimeout(function() {
            ae.getData();
        }, Math.floor((Math.random()*180)+1) * 1000);
        saveAE(ae);
        printValues(ae);
    }, 5 * 60000);
});

function printValues(ae) {
    if (popup = getPopup()) {
        popup.printValues(ae);
    }
}

/**
 * Save all data in ae object to local storage.
 */
function saveAE(ae) {
    for(index in ae.msgs) {
        localStorage['ae_msgs_' + index] = JSON.stringify(ae.msgs[index].messages);
    }
    localStorage['ae_user'] = JSON.stringify(ae.user);
    localStorage['ae_stats'] = JSON.stringify(ae.stats);
    localStorage['ae_players'] = JSON.stringify(ae.players.players);
}

/**
 * Load local storage data into AE object.
 */
function loadAE(ae) {
    for(index in ae.msgs) {
        if (typeof(localStorage['ae_msgs_' + index]) != 'undefined') {
            ae.msgs[index].messages = JSON.parse(localStorage['ae_msgs_' + index]);
            ae.msgs[index].getLast();
        }
    }
    if (typeof(localStorage['ae_user']) != 'undefined') {
        ae.user = JSON.parse(localStorage['ae_user']);
    }
    if (typeof(localStorage['ae_stats']) != 'undefined') {
        ae.stats = JSON.parse(localStorage['ae_stats']);
    }
    if (typeof(localStorage['ae_players']) != 'undefined') {
        ae.players.players = JSON.parse(localStorage['ae_players']);
    }
}

/**
 * Send OS a notification when we received new guild messages.
 */
function printMessage(data, messageType, ae) {
    var msg = data.message.message;
    // Only display the notification if the message is unread.
    if (data.message.read == 'unread') {
        // Remove any blockquotes.
        msg = msg.replace(/<blockquote>.*<\/blockquote>/gi, '');
        // Remove all html codes.
        msg = msg.replace(/<(?:.|\n)*?>/gm, '');
        // Convert special characters.
        msg = msg.replace(/&#39;/, '\'');
        window.webkitNotifications.createNotification('images/ae-icon-48.png', 'Guild: ' + data.message.playerName, msg).show();
    }
}
ae.msgs.guild.subscribe('msg_add_pre', printMessage);

/**
 * Send OS a notification when we received new guild messages.
 */
function printMailMessage(data, messageType, ae) {
    var msg = data.message.message;
    // Only display the notification if the message is unread.
    if (data.message.read == 'unread') {
        // Remove any blockquotes.
        msg = msg.replace(/<blockquote>.*<\/blockquote>/gi, '');
        // Remove all html codes.
        msg = msg.replace(/<(?:.|\n)*?>/gm, '');
        // Convert special characters.
        msg = msg.replace(/&#39;/, '\'');
        window.webkitNotifications.createNotification('images/ae-icon-48.png', 'Mail: ' + data.message.playerName, msg).show();
    }
}
ae.msgs.mail.subscribe('msg_add_pre', printMailMessage);

/**
 * Updating the popup with what we are currently doing.
 */
function printStatus(data, messageType, ae) {
    if (popup = getPopup()) {
        popup.printStatus(data, messageType, ae);
    }
}
ae.subscribe('ajax', printStatus);
