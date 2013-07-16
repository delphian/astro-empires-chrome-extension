/**
 * @file watcher.js
 * @author Bryan Hazelbaker <bryan.hazelbaker@gmail.com>
 *
 * @copyright Copyright (c) 2013 Bryan Hazelbaker <bryan.hazelbaker@gmail.com>
 * Released under the MIT license. Read the entire license located in the
 * project root or at http://opensource.org/licenses/mit-license.php
 * 
 * @brief Forward any viewed astro empire pages to the background page.
 */

// Install status bar at bottom of screen.
var bodyCopy = $('body').html();
$('body').html('');
$('body').prepend('<div class="aece-content-bar"></div>');
$('body').prepend('<div class="aece-content-body"></div>');
$('div.aece-content-body').html(bodyCopy);

jQuery('document').ready(function ($) {
    // Forward current page html to background process for parsing.
    var msg = {
        type: 'process_html',
        data: {
            url: document.URL,
            html: $('body').html()
        }
    };
    chrome.extension.sendRequest(msg);
});
