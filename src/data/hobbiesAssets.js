import anime from '../../info/hobbies/anime.webp';
import basketball from '../../info/hobbies/basketball.jpg';
import eskating from '../../info/hobbies/eskating.jpg';
import fitness from '../../info/hobbies/fitness.jpg';
import hiking from '../../info/hobbies/hiking.jpg';
import karting from '../../info/hobbies/karting.jpg';
import kayaking from '../../info/hobbies/kayaking.jpg';
import music from '../../info/hobbies/music.jpg';
import pingPong from '../../info/hobbies/ping-pong.jpg';
import running from '../../info/hobbies/running.jpg';
import soccer from '../../info/hobbies/soccer.jpg';
import { hobbiesContent } from './hobbiesContent';

export const hobbyImages = {
  eskating,
  hiking,
  kayaking,
  fitness,
  pingPong,
  basketball,
  soccer,
  karting,
  running,
  music,
  anime,
};

function validateHobbyAssets() {
  for (const hobby of hobbiesContent) {
    if (!hobbyImages[hobby.imageKey]) {
      throw new Error(`Missing hobby image for "${hobby.id}" (${hobby.imageKey}).`);
    }
  }
}

validateHobbyAssets();

export const hobbyImageAttribution =
  'Most hobby photos from Wikimedia Commons (CC-licensed). Anime card uses official Jujutsu Kaisen Cursed Clash promotional art. Replace with personal photos in info/hobbies/ anytime.';
