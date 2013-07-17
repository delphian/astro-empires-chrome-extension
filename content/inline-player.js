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
    data.inlinePlayer.html = '<div>' + 
    '  <div>Player</div>' +
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
                var html = '<div class="aece-player-extra-info"><table>';
                for(index in player) {
                    html = html + '<tr><td>' + index + '</td><td>' + player[index] + '</td></tr>';
                }
                html = html + '</table></div>';
                $(selector).after(html);
                $(selector).hover(function() {
                    if ($(this).next().css('display') == 'none') {
                        $(this).next().fadeIn(100);
                    }
                    else {
                        $(this).next().fadeOut(500);
                    }
                });
            }
        });
    });
});
