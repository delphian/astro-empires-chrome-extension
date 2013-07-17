/**
 * @file status-bar.js
 * @author Bryan Hazelbaker <bryan.hazelbaker@gmail.com>
 *
 * @copyright Copyright (c) 2013 Bryan Hazelbaker <bryan.hazelbaker@gmail.com>
 * Released under the MIT license. Read the entire license located in the
 * project root or at http://opensource.org/licenses/mit-license.php
 * 
 * @brief Install the status bar on the screen.
 */

// Namespace.
var AstroEmpiresCE = {};
/**
 * @class AstroEmpiresCE.StatusBar
 *
 * Creates a new status bar element at the same level as supplied dom element.
 * Supplied dom element will be wrapped into a body div.
 *
 * @param string oldBody
 *   String to be used as a jQuery selector.
 * @param object ae
 *   (optional) ae background extension object that this bar is attatched to.
 *
 * @todo Fix random to be something more stable as an identifier.
 */
AstroEmpiresCE.StatusBar = function(oldBody, ae) {
    // Collect any widgets from listeners that should be inserted into the bar
    var info = {};
    var html = '';
    AstroEmpiresCE.StatusBar.publish(info, 'bar_info', this);
    for (index in info) {
        html = html + info[index].html;
    }
    // Generate unique bar class name.
    var random = Math.floor((Math.random()*1000)+1);
    var newBar = '<div class="aece-content-bar aece-content-bar-' + random + '">' + html + '</div>';
    // One last chance for listeners to alter the final version of the bar.
    AstroEmpiresCE.StatusBar.publish(newBar, 'bar_alter', this);
    var newBody = '<div class="aece-content-body aece-content-body-' + random + '" />';
    try {
        // Move everything that exists into the aece-content-body.
        $(oldBody).children().wrapAll(newBody);
    } catch (err) {
        // Do nothing. Could be a bad id or class name.
    }
    $(oldBody).prepend(newBar);

    // A copy of the background's ae object.
    this.ae = ae;
    // Reference the status bar dom element.
    this.tag = {
        bar: newBar,
        body: newBody,
    };

    return this;
}
/**
 * Make the status bar static methods and constructor observable.
 *
 * Declare a new singleton of Observable. Declare static methods that simply
 * forward to the AstroEmpiresCE.StatusBar singleton observable object.
 */
AstroEmpiresCE.StatusBar.ODP = new Observable();
AstroEmpiresCE.StatusBar.subscribe = function(messageType, callback) { AstroEmpiresCE.StatusBar.ODP.subscribe(messageType, callback); };
AstroEmpiresCE.StatusBar.unsubscribe = function(messageType, callback) { AstroEmpiresCE.StatusBar.ODP.subscribe(messageType, callback); };
AstroEmpiresCE.StatusBar.publish = function(data, messageType, observed) { AstroEmpiresCE.StatusBar.ODP.subscribe(data, messageType, observed); };
/**
 * Make the status bar instance observable.
 */
AstroEmpiresCE.StatusBar.prototype = new Observable();
/**
 * Update local variables based on data from the background extension.
 *
 * @param object data
 */
AstroEmpiresCE.StatusBar.prototype.update = function(data) {
    this.ae = (typeof(data.ae) == 'undefined') ? this.ae : data.ae;
    this.element = (typeof(data.element) == 'undefined') ? this.element : data.element;
}
