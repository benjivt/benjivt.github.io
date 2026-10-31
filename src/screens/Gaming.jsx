import { useEffect, useRef, useState } from 'react';
import { favorites, nowPlaying, xbox, xboxProfileUrl } from '../data/gaming';
import useMenuKeys from '../hooks/useMenuKeys';
import ScreenHeader from '../components/ScreenHeader';

// Refreshed daily by .github/workflows/live-data.yml (scripts/fetch-xbox.mjs).
const LIVE_DATA_URL = `${import.meta.env.BASE_URL}data/xbox.json`;

function timeAgo(iso) {
  if (!iso) return '';
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return 'played today';
  if (days === 1) return 'played yesterday';
  if (days < 30) return `played ${days} days ago`;
  const months = Math.floor(days / 30);
  return `played ${months} month${months > 1 ? 's' : ''} ago`;
}

function useLiveXbox() {
  const [data, setData] = useState(null);
  useEffect(() => {
    let cancelled = false;
    fetch(LIVE_DATA_URL)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => !cancelled && setData(json))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);
  return data;
}

// Store and Xbox image hosts resize on request; ask for just enough for a library tile.
function sized(url, w, h) {
  if (url.includes('store-images.s-microsoft.com')) return `${url}?w=${w}&h=${h}`;
  if (url.includes('images-eds')) return `${url}&w=${w}&h=${h}`;
  return url;
}

// Portrait poster when there is one; otherwise the square box art on the shelf, or just the title.
function Cover({ game }) {
  if (game.poster) return <img src={sized(game.poster, 300, 450)} alt="" loading="lazy" />;
  if (game.image) return <img className="library-square" src={sized(game.image, 300, 300)} alt="" loading="lazy" />;
  return <span className="library-blank">{game.title}</span>;
}

// A game library shelf of portrait covers; `badge` labels the first one.
function GameShelf({ heading, games, badge }) {
  return (
    <>
      <h2 className="ui-label">{heading}</h2>
      <ul className="library">
        {games.map((game, index) => (
          <li key={game.title} className="library-game">
            <span className="library-cover">
              <Cover game={game} />
              {badge && index === 0 && <span className="library-badge">{badge}</span>}
            </span>
            <span className="library-title">{game.title}</span>
            {game.note && <span className="library-note">{game.note}</span>}
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Gaming({ onBack }) {
  const screenRef = useRef(null);
  useMenuKeys(screenRef, { onBack, autoFocus: false });
  const live = useLiveXbox();

  const gamertag = live?.gamertag ?? xbox.gamertag;
  const recent = live?.recent?.length
    ? live.recent.map((g) => ({
        title: g.name,
        note: timeAgo(g.lastPlayed),
        poster: g.poster,
        image: g.image,
      }))
    : nowPlaying;

  return (
    <section ref={screenRef} className="ui-screen gaming" aria-label="Gaming">
      <ScreenHeader sectionId="gaming" onBack={onBack} />

      <div className="ui-body">
        <div className="ui-sheet gamertag">
          {live?.avatar && <img className="gamertag-avatar" src={live.avatar} alt="" />}
          <span className="gamertag-text">
            <span className="ui-muted">Xbox</span>
            {gamertag ? (
              <a className="gamertag-link" href={xboxProfileUrl(gamertag)} target="_blank" rel="noreferrer">
                {gamertag} ↗
              </a>
            ) : (
              <span className="gamertag-link">[Your gamertag]</span>
            )}
          </span>
          {live?.gamerscore ? (
            <span className="ui-plaque gamertag-score">
              <span className="ui-plaque-value">{live.gamerscore.toLocaleString()}</span>
              <span className="ui-plaque-label">gamerscore</span>
            </span>
          ) : (
            <span className="ui-muted gamertag-hint">Add me if you play.</span>
          )}
        </div>

        <GameShelf heading={live?.recent?.length ? 'Recently played' : 'Now playing'} games={recent} badge="Last played" />
        <GameShelf heading="All-time favorites" games={favorites} />
      </div>
    </section>
  );
}
