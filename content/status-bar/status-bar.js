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
 */
AstroEmpiresCE.StatusBar = function(ae, elementBar, elementBody) {
    // A copy of the background's ae object.
    this.ae = ae;
    // Reference the status bar dom element.
    this.tag = {
        bar: elementBar,
        body: elementBody,
    };
}
/**
 * Create a new status bar.
 *
 * Creates a new status bar element at the same level as supplied dom element.
 * Supplied dom element will be wrapped into a body div.
 *
 * @param string oldBody
 *   String to be used as a jQuery selector.
 *
 * @todo Fix random to be something more stable as an identifier.
 */
AstroEmpiresCE.NewStatusBar = function(ae, oldBody) {
    var random = Math.floor((Math.random()*1000)+1);
    var newBar = '<div class="aece-content-bar aece-content-bar-' + random + '"></div>';
    var newBody = '<div class="aece-content-body aece-content-body-' + random + '" />';
    try {
        // Move everything that exists into the aece-content-body.
        $(oldBody).children().wrapAll(newBody);
    } catch (err) {
        // Do nothing. Could be a bad id or class name.
    }
    $(oldBody).prepend(newBar);

    var statusBar = new AstroEmpiresCE.StatusBar(ae, newBar, newBody);

    return statusBar;
}
/**
 * Update local variables based on data from the background extension.
 *
 * @param object data
 */
AstroEmpiresCE.StatusBar.prototype.update = function(data) {
    this.ae = (typeof(data.ae) == 'undefined') ? this.ae : data.ae;
    this.element = (typeof(data.element) == 'undefined') ? this.element : data.element;
}
