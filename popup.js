
/**
 * @file popup.js
 * @author Bryan Hazelbaker <bryan.hazelbaker@gmail.com>
 *
 * @copyright Copyright (c) 2013 Bryan Hazelbaker <bryan.hazelbaker@gmail.com>
 * Released under the MIT license. Read the entire license located in the
 * project root or at http://opensource.org/licenses/mit-license.php
 *
 * @brief Populate fields from background page information.
 *
 * @details Communicates with the background page ae object to use acquire
 * data to be filled into the popup's DOM structure. Mainly concerned with
 * the display of information to the viewer.
 */

// Setup initial values when popup is first opened.
jQuery('document').ready(function($) {
    var background = chrome.extension.getBackgroundPage();
    var AstroEmpires = background.AstroEmpires;
    if (!localStorage['server'] || !localStorage['email'] || !localStorage['password']) {
        var body = jQuery('body');
        body.html('<p>Please configure first under chrome settings, extensions</p><p>After saving configuration it may take up to 60 seconds for data to display.</p>');
        return;
    }
    // No need to alter the message pointers in the ae object, make a copy
    // instead.
    var ae = jQuery.extend(true, {}, background.ae);
    // Get statistics.
    printValues(ae);
    // Fill in the most recent messages.
    printGuildMessages(ae);
});

/**
 * Update the statistics.
 */
function printValues(ae) {
    jQuery('div.credits-value').html(ae.stats.credits);
    jQuery('div.income-value').html(ae.stats.income + ' per hour');
    jQuery('div.fleetsize-value').html(ae.stats.fleetSize);
    jQuery('div.technology-value').html(ae.stats.technology);
    jQuery('div.level-value').html(ae.stats.level);
    jQuery('div.rank-value').html(ae.stats.rank);
}

/**
 * Update the guild messages.
 */
function printGuildMessages(ae) {
    // Fill in the most recent messages.
    var message = jQuery('div.message-container div.content');
    var msg = ae.msgs.guild.getLast();
    for(i = 0; i < 6; i++) {
        var moment = new Date(msg.time * 1000);
        var date = moment.getMonth() + '/' + moment.getDay();
        var time = moment.getHours() + ':' + moment.getMinutes();
        message.append(
            '<div class="name msg-' + msg.id + '">' + date + ' ' + time + ' ' + msg.playerName + '</div>' + 
            '<div class="message msg-' + msg.id + '">' + msg.message + '</div>'
        );
        $('div.name.msg-' + msg.id).click(function () {
            //var id = AstroEmpires.regex(/msg-([0-9]+)/i, $(this).attr('class'), 1, false);
            var msg_body = $(this).next();
            if ($(msg_body).css('display') == 'none') {
                $(msg_body).fadeIn();
            }
            else {
                $(msg_body).fadeOut();        
            }
        });
        ae.msgs.guild.getPrev();
    }
}

/**
 * Updating the popup with what we are currently doing.
 *
 * This is called directly from the background page.
 */
function printStatus(data, messageType, ae) {
    var d = new Date();
    var n = d.getTime();
    var status = jQuery('div.ae-status-container div.content');
    status.html(n);
}
