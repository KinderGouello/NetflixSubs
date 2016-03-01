$(function() {

	// var $urlApi = 'http://remygouello.fr/ApiSubtitles/site/',
	var $urlApi = 'http://192.168.99.100/ApiSubtitles/site/',
		$key = '',
		$language = window.navigator.userLanguage || window.navigator.language,
		$title,
		$season = '',
		$episode = '',
		$idsubtitle = '',
		$idserie = '',
		$subtitles = '',
		$name = '',
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
									$title = $title.text();

									getSubtitles();
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
				$title = $title.text();

				getSubtitles();
			}
		});
	}

	function getSubtitles() {
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
				$subtitles = data.subtitles;
				$name = data.name;
				$idserie = data.idserie;

				if (data.success === 1 && $subtitles !== '') {
					downloadPage();
				} else {
					getListSubtitles();
				}
			}
		);
	}

	function getListSubtitles() {
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
							$idsubtitle = $('#netflixSubsSubtitles').find(':selected').val();
							$idserie = data.idserie;

							$('#netflixSubs').html('').load('html/loader.html', function() {
								$('#messageLoader').text('Recovery subtitles...');
							});

							$.get($urlApi + 'soustitres/downloadById',
								{
									title: $title,
									season: $season,
									episode: $episode,
									idserie: $idserie,
									language: $language,
									idsubtitle: $idsubtitle,
									key: $key
								}
							)
							.done(function(data) {
								data = $.parseJSON(data);
								$subtitles = data.subtitles;
								$name = data.name;

								if (data.success === 1 && $subtitles !== '') {
									downloadPage();
								}
							})
							.fail(function(data) {
								getListSubtitles();
							});
						});
					});
				}
			}
		);
	}

	function downloadPage() {
		$('#netflixSubs').html('').load('html/download.html', function() {
			// Activation des tabs
			$('a[data-toggle="tab"]').click(function(e) {
			  e.preventDefault();
			  $(this).tab('show');
			});

			$('#subtitlesFilename').text($name);

			$('#DownloadSubtitles').off('click').on('click', function(event) {
				chrome.downloads.download({
				  url: 'data:,' + $subtitles,
				  filename: $name
				});
			});

			$('#formResync').off('submit').on('submit', function(event) {
				event.preventDefault();
				$.get($urlApi + 'soustitres/resync',
					{
						title: $title,
						season: $season,
						episode: $episode,
						idserie: $idserie,
						language: $language,
						key: $key,
						direction: $('#selectDirection').find(':selected').val(),
						time: $('#inputResync').val()
					}
				)
				.done(function(data) {
					console.log(data);
					data = $.parseJSON(data);
					$subtitles = data.subtitles;

					if (data.success === 1 && data.subtitles !== '') {
						downloadPage(data.name);
					}
				})
				.fail(function(data) {
					downloadPage();
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