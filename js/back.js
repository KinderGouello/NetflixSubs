$(function() {
	function download(fileContents, fileName) {
	    var link = document.createElement('a');
	    link.download = fileName;
	    link.href = 'data:,' + fileContents;
	    link.click();
	}

	function init() {
		$('#netflix-player').append('<div id="netflixSubs"><a class="netflixSubsIcon"></a></div>');

		$('.netflixSubsIcon').click(function() {
			if ($('.netflixSubsDiv').length) {
				$('.netflixSubsDiv').remove();
				return false;
			}

			var $title = $('#appMountPoint .player-status-main-title'),
				$explodes = $title.next().text().split(' ');

			// var press = $.Event('keydown');
			// press.ctrlKey = true;
			// press.shiftKey = true;
			// press.altKey = true;
			// press.which = 84;
			// $(".player-video-wrapper").trigger(press);

			// e = jQuery.Event("keydown");
			// fake = $.extend({}, e, {which: 84, ctrlKey: true, shiftKey: true, altKey: true});
			// console.log(fake);
			// $("iframe").trigger(fake);

			// $('#netflixSubs').append('<div class="netflixSubsDiv"><p class="info"></p><button id="netflixSubsDownload">Télécharger les sous-titres</button></div>');
			// $('#netflixSubs').append('<div class="netflixSubsDiv"><p>Attente...</p></div>');
			$('#netflixSubs').append('<div class="netflixSubsDiv"><select name="dsfsdf" id="zaezaeza"><option value="1">dfdsf</option><option value="3">ezuoic</option></select></div>');
			
			$.get(
				'http://remygouello.fr/ApiSubtitles/site/soustitres/download',
				{
					title: $title,
					season: $explodes[1],
					episode: $explodes[3]
				},
				function(data) {
					console.log(data);
					// download('<?xml version="1.0" encoding="utf-8"?><tt xmlns="http://www.w3.org/2006/10/ttaf1"><body><div><p begin="00:00:05.624" end="00:00:07.966">Foyer pour animaux de Philadelphie, bonjour.</p><p begin="00:21:02.57" end="00:21:04.796">On vire la pute de ton appartement ? 9999 00:00:0,500 --&gt; 00:00:2,00 www.tvsubtitles.net</p></div></body></tt>', 'text.xml');
				}
			);

			// $('#netflixSubsDownload').off('click').on('click', function() {
			// 	$('.netflixSubsDiv p.info').html('');

			// 	if ($explodes[0] === "") {
			// 		$('.netflixSubsDiv p.info').text('Les sous-titres ne peuvent pas être récupérés. Peut-être que la vidéo n’est pas encore chargée...');
			// 		return false;
			// 	}

			// 	console.log($title);
			// 	console.log($explodes);

			// 	// download('<?xml version="1.0" encoding="utf-8"?><tt xmlns="http://www.w3.org/2006/10/ttaf1"><body><div><p begin="00:00:05.624" end="00:00:07.966">Foyer pour animaux de Philadelphie, bonjour.</p><p begin="00:21:02.57" end="00:21:04.796">On vire la pute de ton appartement ? 9999 00:00:0,500 --&gt; 00:00:2,00 www.tvsubtitles.net</p></div></body></tt>', 'text.xml');
			// });
		});
	}

	$(document).arrive(".player-status-main-title", function() {
	    init();
	    Arrive.unbindAllArrive();
	});
});