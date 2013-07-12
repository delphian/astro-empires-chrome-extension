/**
 * @file location.js
 * @author  Bryan Hazelbaker <bryan.hazelbaker@gmail.com>
 *
 * @copyright Copyright (c) 2013 Bryan Hazelbaker <bryan.hazelbaker@gmail.com>
 * Released under the MIT license. Read the entire license located in the
 * project root or at http://opensource.org/licenses/mit-license.php
 * 
 * @brief Record astro empire locations and associated data.
 */

jQuery('document').ready(function ($) {
	// Looking at a solar system.
	if ($('div.map-system_content').length) {
		$('div.map-system_content div.astro_container').each(function(index) {
			var html = $(this).html();
			var msg = {
				type: 'planet',
				action: 'set',
			    id: AstroEmpires.regex(/[^\()]\(([^\)]+)\)/i, $('a img', this).attr('title'), 1, null),
  			    planet: {
				    type: AstroEmpires.regex(/([a-z]+)/i, $('a img', this).attr('title'), 1, null),
				    player: AstroEmpires.regex(/player=([0-9]+)/i, $('div.description a', this).attr('href'), 1, null)
				}
			};
			chrome.extension.sendRequest(msg);
  		});
	}
});
