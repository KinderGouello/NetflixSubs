$(function() {

	var $urlApi = 'http://remygouello.fr/ApiSubtitles/site/',
	// var $urlApi = 'http://192.168.99.100/ApiSubtitles/site/',
		$key = '',
		$language = window.navigator.userLanguage || window.navigator.language,
		$title,
		$season = '',
		$episode = '',
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
									
									if ($explodes.length !== 0) {
										$season = parseInt($explodes[1].replace(':', ''));
										$episode = parseInt($explodes[3]);
									}
									getSubtitles($title.text(), $season, $episode, $language);
								}
							}
						);
					});
				});
			} else {
				// Si la personne est loggée, alors on lui propose de télécharger les soustitres
				$key = data.value;

				if ($explodes.length > 1) {
					$season = parseInt($explodes[1].replace(':', ''));
					$episode = parseInt($explodes[3]);
				}
				getSubtitles($title.text(), $season, $episode, $language);
			}
		});
	}

	function getSubtitles($title, $season, $episode, $language) {
		$('#netflixSubs').html('').load('html/loader.html', function() {
			$('#messageLoader').text('Recovery subtitles...');
		});

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
		$('#netflixSubs').html('').load('html/loader.html', function() {
			$('#messageLoader').text('No subtitles was already downloaded, recovery attempt subtitles lists...');
		});

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
					$('#netflixSubs').html('').load('html/list.html', function() {
						$.each(data.liste, function(index, val) {
							 $('#netflixSubsSubtitles').append('<option value="' + val.IDSubtitleFile + '">' + val.SubFileName + '</option>');
						});

						$('#netflixSubsChooseSubtitle').off('submit').on('submit', function(event) {
							event.preventDefault();
							$subtitlesSelected = $('#netflixSubsSubtitles').find(':selected').val();

							$('#netflixSubs').html('').load('html/loader.html', function() {
								$('#messageLoader').text('Recovery subtitles...');
							});

							$.get($urlApi + 'soustitres/downloadById',
								{
									title: $title,
									season: $season,
									episode: $episode,
									idserie: data.idserie,
									language: $language,
									idsubtitle: $subtitlesSelected,
									key: $key
								}
							)
							.done(function(data) {
								data = $.parseJSON(data);

								if (data.success === 1 && data.subtitles !== '') {
									downloadPage(data.subtitles, data.name);
								}
							})
							.fail(function(data) {
								getListSubtitles($title, $season, $episode, $language);
							});
						});
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
			$('#subtitlesFilename').text(name);

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

		if ($title === undefined && $explodes === undefined) {
			$('#netflixSubs').html('').load('html/error.html', function() {
				$('.alert').html('<strong>Error,</strong> you’re not in a Netflix video or it isn’t loaded.');
			});
			return false;
		}

		$('#netflixSubs').html('').load('html/loader.html', function() {
			$('#messageLoader').text('Loading...');
		});

		getLogin();
	  }
	});

	window.onload = onWindowLoad;
});