import itsWhatsInside from '../../info/watching/its-whats-inside.jpg';
import tenet from '../../info/watching/tenet.jpg';
import moneyHeist from '../../info/watching/money-heist.jpg';
import breakingBad from '../../info/watching/breaking-bad.jpg';
import lupin from '../../info/watching/lupin.jpg';
import punisher from '../../info/watching/the-punisher.jpg';
import jojo from '../../info/watching/jojos-bizarre-adventure.jpg';
import attackOnTitan from '../../info/watching/attack-on-titan.jpg';

// What's on the TV: movies, shows and anime, one row each.
// Posters are the official title art (films from Wikipedia, series from TVmaze), saved at 400x600 in info/watching/.
// `link` is optional (a trailer or where to watch).
export const watchGroups = [
  {
    id: 'movies',
    name: 'Movies',
    items: [
      {
        id: 'its-whats-inside',
        title: "It's What's Inside",
        year: '2024',
        poster: itsWhatsInside,
        summary: 'A pre-wedding reunion goes sideways when an old friend shows up with a machine that swaps bodies.',
        genres: ['Comedy', 'Sci-fi', 'Thriller'],
      },
      {
        id: 'tenet',
        title: 'Tenet',
        year: '2020',
        poster: tenet,
        summary: 'A secret agent learns to move against the flow of time to stop a war coming from the future.',
        genres: ['Action', 'Sci-fi', 'Thriller'],
      },
    ],
  },
  {
    id: 'shows',
    name: 'Shows',
    items: [
      {
        id: 'money-heist',
        title: 'Money Heist',
        year: '2017',
        poster: moneyHeist,
        summary: "Eight robbers and a mastermind called the Professor take over Spain's Royal Mint.",
        genres: ['Crime', 'Drama', 'Thriller'],
      },
      {
        id: 'breaking-bad',
        title: 'Breaking Bad',
        year: '2008',
        poster: breakingBad,
        summary: 'A chemistry teacher turns to cooking meth, and every decision after that makes it worse.',
        genres: ['Crime', 'Drama', 'Thriller'],
      },
      {
        id: 'lupin',
        title: 'Lupin',
        year: '2021',
        poster: lupin,
        summary: 'A gentleman thief takes his cues from Arsène Lupin to settle a score with the family that framed his father.',
        genres: ['Crime', 'Drama', 'Mystery'],
      },
      {
        id: 'the-punisher',
        title: 'The Punisher',
        year: '2017',
        poster: punisher,
        summary: 'Frank Castle goes after everyone behind the death of his family, one conspiracy layer at a time.',
        genres: ['Action', 'Crime', 'Drama'],
      },
    ],
  },
  {
    id: 'anime',
    name: 'Anime',
    items: [
      {
        id: 'jojos-bizarre-adventure',
        title: "JoJo's Bizarre Adventure",
        year: '2012',
        poster: jojo,
        summary: 'Generation after generation of the Joestar family take on vampires and Stand users, one wild part at a time.',
        genres: ['Action', 'Adventure', 'Supernatural'],
      },
      {
        id: 'attack-on-titan',
        title: 'Attack on Titan',
        year: '2013',
        poster: attackOnTitan,
        summary: "Humanity's last cities hide behind giant walls, and the titans outside are only the start of it.",
        genres: ['Action', 'Dark fantasy', 'Drama'],
      },
    ],
  },
];
