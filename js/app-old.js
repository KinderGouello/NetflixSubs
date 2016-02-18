$(function() {
	
	chrome.runtime.onMessage.addListener(function(request, sender) {
	  if (request.action == "getSource") {
		var html = $.parseHTML(request.source);
			template = /Saison\s(\d+)\s?:\sEp\.\s(\d+)/g;

		$.each(html, function(i, el) {
			var idElement = $(el).attr('id');

			if (idElement === 'appMountPoint') {
				var $title = $(el).find('.player-status-main-title'),
					$explodes = $title.next().text().split(' ');
			}
		});

		chrome.downloads.download({
		  url: 'data:,<?xml version="1.0" encoding="utf-8"?><tt xmlns="http://www.w3.org/2006/10/ttaf1"><body><div><p begin="00:00:05.624" end="00:00:07.966">Foyer pour animaux de Philadelphie, bonjour.</p><p begin="00:21:02.57" end="00:21:04.796">On vire la pute de ton appartement ? 9999 00:00:0,500 --&gt; 00:00:2,00 www.tvsubtitles.net</p></div></body></tt>',
		  filename: 'text.dfxp'
		});

		// download('<?xml version="1.0" encoding="utf-8"?><tt xmlns="http://www.w3.org/2006/10/ttaf1"><body><div><p begin="00:00:05.624" end="00:00:07.966">Foyer pour animaux de Philadelphie, bonjour.</p><p begin="00:21:02.57" end="00:21:04.796">On vire la pute de ton appartement ? 9999 00:00:0,500 --&gt; 00:00:2,00 www.tvsubtitles.net</p></div></body></tt>', 'text.xml');

		// $response = '<?xml version="1.0" encoding="utf-8"?><tt xmlns="http://www.w3.org/2006/10/ttaf1"><body><div><p begin="00:00:05.624" end="00:00:07.966">Foyer pour animaux de Philadelphie, bonjour.</p><p begin="00:21:02.57" end="00:21:04.796">On vire la pute de ton appartement ? 9999 00:00:0,500 --&gt; 00:00:2,00 www.tvsubtitles.net</p></div></body></tt>';

		// window.location.href = "data:text/plain;" + $response;

		// $.event.trigger({
		// 	type: 'keydown',
		// 	ctrlKey: true,
		// 	shiftKey: true,
		// 	altKey: true,
		// 	which: 84
		// });
	  }
	});

	function onWindowLoad() {

		var message = document.querySelector('#message');

		chrome.tabs.executeScript(null, {file: "js/getSources.js"}, function() {
			// If you try and inject into an extensions page or the webstore/NTP you'll get an error
			if (chrome.runtime.lastError) {
			message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
		}});
	}

	window.onload = onWindowLoad;
});