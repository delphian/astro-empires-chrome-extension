/**
 * @file player.js
 * @author Bryan Hazelbaker <bryan.hazelbaker@gmail.com>
 *
 * @copyright Copyright (c) 2013 Bryan Hazelbaker <bryan.hazelbaker@gmail.com>
 * Released under the MIT license. Read the entire license located in the
 * project root or at http://opensource.org/licenses/mit-license.php
 * 
 * @brief Record astro empire players and associated data.
 *
 * @details Examine each page load and see if any player data can be found
 * in the page.
 */

jQuery('document').ready(function ($) {
	// Looking at a solar system.
	if ($('div.map-system_content').length) {
		$('div.map-system_content div.astro_container div.description a').each(function(index) {
			var msg = {
				type: 'player',
				action: 'set',
                id: AstroEmpires.regex(/player=([0-9]+)/i, $(this).attr('href'), 1, null),
  			    player: {
				    id: AstroEmpires.regex(/player=([0-9]+)/i, $(this).attr('href'), 1, null),
				    name: AstroEmpires.regex(/(\[[^\]]*\][\s]+)?([a-z0-9 ]+)/i, $(this).html(), 2, null),
				}
			};
			chrome.extension.sendRequest(msg);
  		});
	}
});
