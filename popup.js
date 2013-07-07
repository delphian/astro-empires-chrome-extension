
/**
 * @file
 * @author  Bryan Hazelbaker <bryan.hazelbaker@gmail.com>
 * @version 0.1
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
    if (!localStorage['email']) {
        var body = jQuery('body');
        body.html('<p>Please configure first under chrome settings, extensions</p>');
        return;
    }
    var ae = background.ae;
    // Get statistics.
    printValues(ae);
    // Fill in the most recent messages.
    var message = jQuery('div.message-container div.content');
    var msg = ae.msgGetPrev();
    for(i = 0; i < 6; i++) {
        var date = new Date(msg.time * 1000).toLocaleDateString();
        var time = new Date(msg.time * 1000).toLocaleTimeString();
        message.append(
            '<div class="name msg-' + msg.id + '">' + date + ' ' + time + ' ' + msg.playerName + '</div>' + 
            '<div class="message msg-' + msg.id + '">' + msg.message + '</div>'
        );
        $('div.name.msg-' + msg.id).click(function () {
            var id = AstroEmpires.regex(/msg-([0-9]+)/i, $(this).attr('class'), 1, false);
            if ($('div.message.msg-' + id).css('display') == 'none') {
                $('div.message.msg-' + id).fadeIn();
            }
            else {
                $('div.message.msg-' + id).fadeOut();        
            }
        });
        msg = ae.msgGetPrev(msg.id);
    }
});

/**
 * Update the statistics.
 *
 * This is called directly from the background page.
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
