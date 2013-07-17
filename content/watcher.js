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

var sb = null;

jQuery('document').ready(function ($) {
    sb = AstroEmpiresCE.NewStatusBar(null, 'body');
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
