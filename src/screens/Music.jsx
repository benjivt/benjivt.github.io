import { useEffect, useRef, useState } from 'react';
import useMenuKeys from '../hooks/useMenuKeys';
import ScreenHeader from '../components/ScreenHeader';

// Refreshed daily by .github/workflows/live-data.yml (scripts/fetch-music.mjs).
const LIVE_DATA_URL = `${import.meta.env.BASE_URL}data/music.json`;

function useLiveMusic() {
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

// A row that links out to Apple Music when the track has a URL.
function Track({ track }) {
  const content = (
    <>
      {track.artwork ? <img className="ui-row-art" src={track.artwork} alt="" loading="lazy" /> : <span className="ui-row-art" />}
      <span className="ui-row-text">
        <span className="ui-row-title">{track.name}</span>
        <span className="ui-row-sub">{track.artist}</span>
      </span>
    </>
  );
  return (
    <li>
      {track.url ? (
        <a className="ui-row" href={track.url} target="_blank" rel="noreferrer">
          {content}
        </a>
      ) : (
        <div className="ui-row">{content}</div>
      )}
    </li>
  );
}

// A sleeve in the crate: the album or playlist cover, or Apple's 2x2 mosaic of album covers when it has none.
function Sleeve({ item, subtitle }) {
  return (
    <li>
      <a href={item.url ?? undefined} target="_blank" rel="noreferrer" className="crate-sleeve">
        {item.artwork ? (
          <img src={item.artwork} alt="" loading="lazy" />
        ) : (
          <span className="crate-mosaic" aria-hidden="true">
            {(item.mosaic ?? []).map((src) => (
              <img key={src} src={src} alt="" loading="lazy" />
            ))}
          </span>
        )}
        <span className="crate-name">{item.name}</span>
        {subtitle && <span className="crate-sub">{subtitle}</span>}
      </a>
    </li>
  );
}

const songCount = (playlist) => `${playlist.trackCount}${playlist.moreTracks ? '+' : ''} songs`;

export default function Music({ onBack }) {
  const screenRef = useRef(null);
  useMenuKeys(screenRef, { onBack, autoFocus: false });
  const live = useLiveMusic();
  const playlists = live?.playlists ?? [];

  return (
    <section ref={screenRef} className="ui-screen music" aria-label="Music">
      <ScreenHeader sectionId="music" onBack={onBack} />

      <div className="ui-body">
        {live?.recent?.length > 0 && (
          <>
            <h2 className="ui-label">Recently played</h2>
            <ul className="ui-rows">
              {live.recent.map((track) => (
                <Track key={`${track.name}|${track.artist}`} track={track} />
              ))}
            </ul>
          </>
        )}

        {live?.heavyRotation?.length > 0 && (
          <>
            <h2 className="ui-label">Heavy rotation</h2>
            <ul className="crate">
              {live.heavyRotation.map((item) => (
                <Sleeve key={item.name} item={item} subtitle={item.trackCount ? songCount(item) : item.artist} />
              ))}
            </ul>
          </>
        )}

        {playlists.length > 0 && (
          <>
            <h2 className="ui-label">My playlists</h2>
            <ul className="crate">
              {playlists.map((playlist) => (
                <Sleeve key={playlist.url ?? playlist.name} item={playlist} subtitle={songCount(playlist)} />
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
