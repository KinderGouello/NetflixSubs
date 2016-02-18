$(function() {

	// var $urlApi = 'http://remygouello.fr/ApiSubtitles/site/';
	var $urlApi = 'http://192.168.99.100/ApiSubtitles/site/',
		$key = '',
		$language = window.navigator.userLanguage || window.navigator.language,
		$title,
		$explodes;

	function getLogin() {
		// Si la personne ne s'est pas loggé
		// alors on affiche le formulaire pour logger
		chrome.cookies.get({url: $urlApi, 'name': 'loggedIn'}, function(data) {
			if (data === null) {
				$('#netflixSubs').html('').load('html/login.html', function() {
					$('#netflixSubsLogin').off('submit').on('submit', function(event) {
						var $user = $('#username').val(),
							$pass = $('#password').val();

						event.preventDefault();

						$.post($urlApi + 'users/login',
							{
								username: $user,
								password: $pass
							},
							function(data) {
								data = $.parseJSON(data);

								if (data.success == 1 && data.key !== '') {
									chrome.cookies.set({
										url: $urlApi,
										name: 'loggedIn',
										value: data.key
									});

									// Si la personne est loggée, alors on lui propose de télécharger les soustitres
									$key = data.key;
									// getSubtitles($title.text(), $explodes[1], $explodes[3], $language);
									getSubtitles($title.text(), parseInt($explodes[1].replace(':', '')), parseInt($explodes[3]), $language);
								}
							}
						);
					});
				});
			} else {
				// Si la personne est loggée, alors on lui propose de télécharger les soustitres
				$key = data.value;
				// getSubtitles($title.text(), $explodes[1], $explodes[3], $language);
				getSubtitles($title.text(), parseInt($explodes[1].replace(':', '')), parseInt($explodes[3]), $language);
			}
		});
	}

	function getSubtitles($title, $season, $episode, $language) {
		$('#netflixSubs').html('').load('html/loader.html');

		$.get($urlApi + 'soustitres/download',
			{
				title: $title,
				season: $season,
				episode: $episode,
				language: $language,
				key: $key
			},
			function(data) {
				data = $.parseJSON(data);

				if (data.success === 1 && data.subtitles !== '') {
					downloadPage(data.subtitles, data.name);
				} else {
					getListSubtitles($title, $season, $episode, $language);
				}
			}
		);
	}

	function getListSubtitles($title, $season, $episode, $language) {
		$('#netflixSubs').html('').load('html/loader.html');

		// Si pas de soustitres enregistrés en BDD
		$.get($urlApi + 'soustitres/liste',
			{
				title: $title,
				season: $season,
				episode: $episode,
				language: $language,
				key: $key
			},
			function(data) {
				data = $.parseJSON(data);

				if (data.success === 1) {
					$('#netflixSubs').html('<form id="netflixSubsChooseSubtitle" class="form-horizontal"><select class="form-control" name="subtitles" id="netflixSubsSubtitles"></select><button type="submit" class="btn btn-default">Choose</button></form>');
					$.each(data.liste, function(index, val) {
						 $('#netflixSubs select').append('<option value="' + val.IDSubtitleFile + '">' + val.SubFileName + '</option>');
					});

					$('#netflixSubsChooseSubtitle').off('submit').on('submit', function(event) {
						event.preventDefault();

						$.get($urlApi + 'soustitres/downloadById',
							{
								title: $title,
								season: $season,
								episode: $episode,
								idserie: data.idserie,
								language: $language,
								idsubtitle: $('#netflixSubsSubtitles option:selected').val(),
								key: $key
							},
							function(data) {
								data = $.parseJSON(data);

								if (data.success === 1 && data.subtitles !== '') {
									downloadPage(data.subtitles, data.name);
								}	
							}
						);
					});
				}
			}
		);
	}

	function synchroSubtitles() {
		// body...
	}

	function downloadPage(subtitles, name) {
		$('#netflixSubs').html('').load('html/download.html', function() {
			$('#DownloadSubtitles').off('click').on('click', function(event) {
				chrome.downloads.download({
				  url: 'data:,' + subtitles,
				  filename: name
				});
			});
		});
	}

	function onWindowLoad() {
		chrome.tabs.executeScript(null, {file: "js/getSources.js"});
	}
	
	chrome.runtime.onMessage.addListener(function(request, sender) {
	  if (request.action == "getSource") {
		var html = $.parseHTML(request.source);

		$.each(html, function(i, el) {
			var idElement = $(el).attr('id');

			if (idElement === 'appMountPoint') {
				$title = $(el).find('.player-status-main-title');
				$explodes = $title.next().text().split(' ');
			}
		});

		$('#netflixSubs').html('').load('html/loader.html');

		getLogin();
	  }
	});

	window.onload = onWindowLoad;
});