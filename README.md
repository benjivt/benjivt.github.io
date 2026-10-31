# benjivt.github.io

Benji Adjepong's portfolio: a 3D room you click around in. The laptop holds the career roadmap, the TV is the project library, the phone has contact info, and the records, balls, skateboard and photo frames open notes about music, sports, the outdoors and me.

The previous site lives on the `v1-portfolio` branch.

## Run it

```bash
npm install
npm run dev
```

- `npm test` runs the unit tests, `npm run test:e2e` the Playwright tests (`npx playwright install chromium` once first).
- Pushing to `main` deploys to GitHub Pages after tests and a main-bundle size check pass.

## How it fits together

- `public/models/room.glb` is the room, exported from `art/room.blend` (Draco-compressed; the decoder lives in `public/draco/`).
- Clickable objects are nodes named `prop_*`; `src/data/sections.js` maps them to sections.
- `src/room/placements.js` says where each section's content appears: on a device screen (laptop, TV, phone) or as a card beside the object, plus the camera viewpoint for each.
- Section content is in `src/screens/` and the copy in `src/data/`.
- Browsers without WebGL get a plain list of the same sections.

## Editing the room in Blender

1. Open `art/room.blend`. Keep each clickable prop under a single empty named `prop_<name>`.
2. Export **glTF Binary** to `public/models/room.glb` with *Compression* (Draco) on and images as WebP.
3. If you move the laptop, TV or phone, update their screen positions in `src/room/placements.js` (Blender `x, y, z` = three.js `x, z, -y`).

## Credits

3D models are CC0 / CC-BY from Poly Pizza and Sketchfab; the full list (with authors and licences) is in `src/data/credits.js` and on the sticky note in the room.
