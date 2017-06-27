export const LOAD_INFORMATIONS = 'LOAD_INFORMATIONS';
export const loadNetflixInformations = (informations) => ({
  type: LOAD_INFORMATIONS,
  informations,
});

export const CHOOSE_SUBTITLES = 'CHOOSE_SUBTITLES';
export const chooseSubtitles = (subtitles) => ({
  type: 'CHOOSE_SUBTITLES',
  subtitles,
});
