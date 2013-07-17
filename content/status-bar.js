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

jQuery('document').ready(function ($) {
    // Move everything that exists into the aece-content-body.
    try {
        $('body').children().wrapAll('<div class="aece-content-body" />');
    } catch (err) {
        // Do nothing. Silly id and class names.
    }
    $('body').prepend('<div class="aece-content-bar"></div>');
});
