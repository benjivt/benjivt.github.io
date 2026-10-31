# Portfolio concept: "Benji's Room"

A summary of the portfolio's idea, design and technical approach, written as a starting point for a new project that builds on it.

## The idea in one paragraph

The portfolio is a small, cosy **isometric 3D bedroom** that you explore in the browser. There are no web pages, nav bars or scrolling sections. Every part of the portfolio is an **object in the room** that you would expect to find in that person's real room. Click the laptop and the camera flies onto its screen, which shows a macOS-style career app. Click the TV and a streaming-style "Watching" dashboard fills the glass. Click the Quest 3 on the desk and the camera flies into the lenses, where a Horizon-style VR interface shows the projects. The room *is* the site. Content shows up where it would really live: on a device's screen, on a card next to the object, or on the photos themselves.

## Experience principles

These rules came out of the user's feedback along the way. Keep them in the next project:

1. **No web chrome.** No site header, footer, hamburger or page layout. Every UI either belongs to an object in the room or sits on top of it.
2. **Content lives where it belongs.**
   - Device sections render *on* the device and copy its real OS look: a macOS window on the laptop, a TV dashboard on the TV, an iOS app on the phone, a Meta Horizon UI in the headset.
   - Other sections use a floating card styled to look **made of the room**: cream paper face, wood-plank header, walnut accents, with colours sampled from the 3D materials.
   - Photos go onto the real 3D prints and polaroids in the model. They are never shown as a separate gallery.
   - The resume is a real letter-size sheet of paper lying on the desk.
3. **The camera tells the story.** Every section has a deliberate viewpoint: square-on to a screen, top-down onto paper, into the headset lenses. The camera glides there with a damped spherical lerp, and you can orbit freely only from the overview.
4. **Plain, human copy.** No jargon (no basketball metaphors, no "kicker" labels above headings), no neon glow, and simple ✕ close buttons. Section headers show only the section name.
5. **Real data where possible.** Live Xbox games and Apple Music listening history, actual show posters, and the owner's own photos. Avoid stock filler.
6. **Check orientation and framing yourself.** Every camera view and screen overlay is checked visually at desktop and phone widths. Objects must not block the view, overlays must not overhang, and screens must not slide.
7. **It must degrade well.** Browsers without WebGL get a plain list of the same sections. Escape and the back button always return to the room, and deep links (`/#career`) work.

## Room map (object → section → presentation)

| Object(s) in the room | Section | How it opens |
|---|---|---|
| Laptop | Career | `screen`: macOS app on the laptop display (sidebar, stepper, detail) |
| Quest 3, Raspberry Pi, Arduino on the desk | Projects | `vr`: camera flies into the headset lenses, then a Horizon-style UI (filters, grid, detail) |
| TV | Watching | `screen`: TV dashboard filling the glass, one poster row per category (movies, shows, anime), arrow-key remote navigation |
| Game controller | Gaming | `card`: game library of 2:3 portrait covers, favourites first |
| Turntable, record table, guitar | Music | `card`: recently played (5), heavy rotation (3), public playlists (9) |
| Instant camera and prints on the bed | Film | `photos`: camera looks straight at the prints, owner's photos textured onto them |
| Travel polaroids above the desk | Travel | `photos`: same technique |
| Basketball, soccer ball, ping-pong table, dumbbells | Sports | `card` |
| Skateboard leaning on the wall | Outdoors | `card` |
| Photo frame on the desk | About me | `card` (headshot textured into the frame) |
| Phone | Contact | `screen`: iOS grouped-list app |
| Paper on the desk (HTML, not a model) | Resume | `paper`: top-down onto a real letter-size page |
| Neon wall sign, credits sticky note | n/a | Decorative HTML in the scene: "BENJI'S ROOM / click anything" and model credits |

## Tech stack

- **React 18 + Vite 5**, deployed as a static site to **GitHub Pages**.
- **three.js + @react-three/fiber + @react-three/drei** for the room: `useGLTF` with Draco, `Html`, `OrbitControls`, `useTexture`.
- **framer-motion** for panel transitions and reduced-motion support.
- **Blender** for the room (`art/room.blend` → `public/models/room.glb`, Draco level 7, WebP textures, about 650 KB).
- **Vitest** for unit tests and **Playwright** for end-to-end tests. CI enforces a main-bundle budget of 320 KB raw / 100 KB gzip.
- **Node scripts plus a daily GitHub Action** that refresh live data into `public/data/*.json`.

## Architecture

```
src/
  App.jsx               hash routing, WebGL check, error boundary → RoomCanvas or FallbackSite
  room/
    RoomCanvas.jsx      the scene: Room (GLB + hotspots), CameraRig, DeviceScreen, VrView,
                        NoteCard, PhotoWall/PhotoViewer, ResumePaper, WallSign, CreditsNote
    placements.js       per-section presentation + camera view (the "stage directions")
  data/
    sections.js         id, label, hint, accent colour, objects (GLB node names) per section
    *.js                all copy and content (career, projects, watching, gaming, profile, credits…)
  screens/              one component per section; they adapt to the surface they render on
  components/
    Surface.js          SurfaceContext: 'card' | 'laptop' | 'tv' | 'phone' | 'vr'
    ScreenHeader.jsx    header per surface (mac traffic lights, TV top bar, iOS nav, VR title bar, card ✕)
  sectionContent.jsx    lazy-loaded screen per section, preloaded once the room is ready
  hooks/                useHashSection (URL ↔ open section), useMenuKeys (arrow nav), useSound
  styles/               room.css (tokens + in-scene), ui.css (room-style cards), screens.css (device UIs)
scripts/                fetch-music.mjs, fetch-xbox.mjs, music-auth.mjs, render-resume-page.mjs
public/models/room.glb  the room;  public/draco/  decoder;  public/data/  live JSON
```

### The three data-driven layers

1. **`sections.js`**: *what* exists. Each section has an id, label, accent and the `prop_*` node names that open it.
2. **`placements.js`**: *where and how* it appears. One of five kinds:
   - `screen`: an `Html transform` surface with position, rotation, CSS size and `distanceFactor`, plus a camera `view` (azimuth, polar, world size, fill).
   - `card`: zooms toward the object's bounding box and frames it left of centre so the card gets the right half of the screen.
   - `photos`: photo slots found by material name, and the camera framed square-on to them.
   - `vr`: flies to a target with a very short camera distance, so the camera ends up inside the headset.
   - `paper`: a top-down view of an HTML page laid on the desk.
3. **`screens/*`**: *what it says*. Each screen calls `useSurface()` and renders the right UI for where it is shown. The same component works as a TV dashboard, a room card, or the no-WebGL fallback.

### Key techniques worth reusing

- **Hotspots by naming convention.** Each clickable prop sits under one Blender empty named `prop_<name>`. At load, its meshes get cloned materials (so highlights don't leak to other objects) and bounding boxes. Hovering sets an emissive tint in the section's accent colour.
- **Orthographic isometric camera with a spherical lerp.** The rig interpolates target, azimuth (along the shortest arc), polar, zoom and distance using `1 - exp(-dt*5)`, and treats it as settled within 0.2 %. It starts each flight from wherever the visitor had orbited to. The near plane is 0.005 so the VR fly-in can sit inside the headset strap.
- **Sizing HTML screens exactly to 3D glass.** In drei's `Html transform`, 1 CSS px = `distanceFactor / 400` world units, so `df(worldWidth, cssWidth) = worldWidth / cssWidth * 400`. Measure the glass in Blender, choose a CSS resolution, and the UI fits the glass exactly.
- **Stopping focus-scroll drift.** Wrap `Html transform` screens with `wrapperClass="device-wrapper"` and `.device-wrapper { overflow: clip !important }`. Do *not* clip a non-transform or fullscreen `Html` wrapper, because those are zero-size anchors and clipping hides them.
- **Fullscreen overlays anchored to the scene.** `Html fullscreen` centres on its projected position, so give it `position = camera target`. The VR UI uses this.
- **Photo slots found at runtime.** Find the meshes whose material name matches, keep the triangles facing the camera, join them into rectangles with union-find, align the axes to the edges, sort into reading order, then lay textured planes 0.6 mm above each face. Photos come from `import.meta.glob` over `info/film` and `info/travel`, so you add photos by dropping files in a folder.
- **Coordinate conversion.** three.js `(x, y, z)` = Blender `(x, z, −y)`.

## Visual system

- **Room tokens** (sampled from the model):
  - paper `#efe7d6` / `#fff8ea`
  - line `#dccfb6`
  - wood `#d9843f` / `#a85a24`
  - walnut `#3a2420`
  - ink `#2e2129`
  - background `#1b1420`
- **Fonts:** Chakra Petch for the wall sign, Fraunces for titles, Nunito for body text.
- **Each section has its own accent colour**, used for the hover glow and small highlights.
- **Device UIs use their platform's look**, through surface variables (`--s-bg`, `--s-ink`, `--s-accent`, `--s-radius`, `--s-font`…) that default to the room-paper values:
  - macOS: `#f5f5f7`, system blue, hairlines
  - TV: near-black gradient, white focus rings
  - iOS: `#f2f2f7` grouped lists, coloured icon squares
  - Horizon: dark glass panels, dock, title bar

## Content and data pipeline

- **3D models:** CC0 / CC-BY assets from Poly Pizza and Sketchfab, assembled and edited in Blender. Credits are in `src/data/credits.js` and on a sticky note in the room. The Blender MCP add-on (socket `127.0.0.1:9876`, `execute_code`) can script scene edits and re-export.
- **Live data:** a GitHub Action runs daily at 09:17 UTC.
  - `fetch-xbox.mjs` uses OpenXBL plus Microsoft's display catalog for cover art.
  - `fetch-music.mjs` uses the Apple Music API for recently played songs including library songs, heavy rotation, and public library playlists with mosaic artwork as a fallback.
  - Changed JSON is committed and the deploy is re-dispatched.
  - Secrets are supplied through GitHub secrets (`OPENXBL_KEY`, `APPLE_TEAM_ID`, `APPLE_KEY_ID`, `APPLE_MUSIC_PRIVATE_KEY`, `APPLE_MUSIC_USER_TOKEN`) and a git-ignored `.env.local`. Keys are never committed.
- **Posters:** resized to 400×600 and stored in the repo. They come from the Wikipedia REST summary API and TVmaze.
- **Resume:** rendered from the PDF into an HTML page that the desk paper shows.

## Testing and CI

- Unit tests: `vitest run`.
- End-to-end: Playwright serves the **built** `dist`, so always run `npm run build` first. It opens every section through the room and checks headings, device surfaces, links and close behaviour.
- The deploy workflow runs, in order: unit tests → build → bundle-size budget → Playwright → GitHub Pages.

## Starting a new project from this

1. **Choose the space and its objects.** Pick a place that says something about the person or product, such as a studio, garage, office or workshop. List the sections, then give each one a *believable* object and a presentation kind (`screen`, `card`, `photos`, `vr`, `paper`, or a new one).
2. **Build the scene in Blender.** Put each clickable prop under one empty named `prop_<name>`. Give materials meaningful names wherever content will be projected onto a surface (photo faces, screens). Export a Draco GLB with WebP textures.
3. **Copy the skeleton:** `App.jsx`, `RoomCanvas.jsx` (Room, CameraRig, DeviceScreen, NoteCard), `sections.js`, `placements.js`, `Surface.js` and `ScreenHeader.jsx`, `useHashSection` and `useMenuKeys`, the three stylesheets, and the Playwright spec pattern.
4. **Measure each screen** in Blender (centre, rotation, glass width and height) and compute `distanceFactor` with `df()`. Tune each `view` until nothing blocks it.
5. **Write the content as data** in `src/data/`. Screens stay presentational and adapt to `useSurface()`.
6. **Keep the guard rails:** the no-WebGL fallback, Escape and back-button behaviour, reduced motion, lazy-loaded screens with preload, the bundle budget, and a visual check at 1280 px and 390 px.

### Ideas for extending the concept

- Day and night lighting tied to the visitor's local time.
- Ambient sound per object, such as the record player crackling.
- More objects that live data drives, for example the Xbox showing its own "now playing" screen.
- A guided "tour" mode that walks the camera through every section.
- The same engine reused for a second room, or a hallway linking rooms (one room per area of life).

## Open items in the current portfolio

- More "Watching" titles, film and travel photos, and gaming placeholder content.
- A purpose for the bookshelf photo frame (`prop_frame_2`).
- Final copy for the current role and contact details.
- The README still describes the TV as the project library. Projects have since moved to the Quest 3.
