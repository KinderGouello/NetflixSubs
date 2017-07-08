export const LOAD_INFORMATIONS = 'LOAD_INFORMATIONS';
export const loadNetflixInformations = (informations) => ({
  type: LOAD_INFORMATIONS,
  informations,
});

export const CHOOSE_SUBTITLES = 'CHOOSE_SUBTITLES';
export const chooseSubtitles = (subtitle) => ({
  type: CHOOSE_SUBTITLES,
  subtitle,
});

export const DOWNLOAD_SUBTITLE = 'DOWNLOAD_SUBTITLE';
export const downloadSubtitle = (subtitle) => ({
  type: DOWNLOAD_SUBTITLE,
  subtitle,
});
