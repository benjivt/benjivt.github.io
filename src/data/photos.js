// Photo walls in the room. Drop images (jpg, png or webp) into the folder and they appear in that card
// in file-name order; the name becomes the caption ("02-blacksburg-snow.jpg" → "blacksburg snow").
// - info/film/   → Film, from the instant camera on the bed
// - info/travel/ → Travel, from the polaroids pinned above the desk
// (import.meta.glob needs literal paths, hence one call per folder.)
const toPhotos = (files) =>
  Object.entries(files)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([path, src]) => {
      const name = path.split('/').pop().replace(/\.[^.]+$/, '');
      return { id: name, src, caption: name.replace(/^\d+[-_ ]*/, '').replace(/[-_]+/g, ' ').trim() };
    });

export const filmPhotos = toPhotos(import.meta.glob('../../info/film/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }));

export const travelPhotos = toPhotos(import.meta.glob('../../info/travel/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }));
