// The controller on the bed. Fill these in; anything left null/empty is hidden or shown as a placeholder.
export const xbox = {
  // Your public Xbox gamertag, e.g. 'benjivt'. Links to your profile on xbox.com.
  gamertag: null,
};

export const nowPlaying = [
  { title: '[Game you are playing right now]', note: '[What hooked you]' },
];

// Portrait library art (Microsoft Store poster, or Steam's 600x900 library art); without a `poster` the tile shows the title.
const steamPoster = (appId) => `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/library_600x900.jpg`;

export const favorites = [
  {
    title: 'SpeedRunners 2',
    poster:
      'https://store-images.s-microsoft.com/image/apps.34223.14327242010981927.a5495c37-2e09-4b3f-82a1-e015a8eb734a.ba1ba654-43f4-494c-af69-2f04015448e2',
  },
  { title: 'Rocket League', poster: steamPoster(252950) },
  { title: 'Trackmania', poster: steamPoster(2225070) },
];

export const xboxProfileUrl = (gamertag) => `https://www.xbox.com/en-US/play/user/${encodeURIComponent(gamertag)}`;
