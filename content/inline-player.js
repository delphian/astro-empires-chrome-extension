/**
 * @file watcher.js
 * @author Bryan Hazelbaker <bryan.hazelbaker@gmail.com>
 *
 * @copyright Copyright (c) 2013 Bryan Hazelbaker <bryan.hazelbaker@gmail.com>
 * Released under the MIT license. Read the entire license located in the
 * project root or at http://opensource.org/licenses/mit-license.php
 * 
 * @brief Inline value added content to player DOM elements.
 */

// Add player widgets to the status bar.
AstroEmpiresCE.StatusBar.subscribe('bar_info', function(data, messageType, sb) {
    data.inlinePlayer = {};
    data.inlinePlayer.html = '<div class="widget widget-player-stats">' + 
    '  <div class="title">Player</div>' +
    '  <table><tbody>' +
    '    <tr><td class="name name-name">Name</td><td class="value name-value"></td></tr>' +
    '  </tbody></table>' +
    '</div>';
});

jQuery('document').ready(function ($) {
    // Map solar system page.
    $('div.map-system_ctr div.description a').each(function() {
        var selector = this;
        var id = AstroEmpires.regex(/player=([0-9]+)$/, $(this).attr('href'), 1, null);
        var msg = {
            type: 'get_player',
            id: id,
        };
        chrome.extension.sendRequest(msg, function(player) {
            if (player) {
                $(selector).hover(function() {
                    $('div.widget-player-stats td.name-name').html(player.name);
                });
            }
        });
    });
});
