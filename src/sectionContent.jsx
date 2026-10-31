import { lazy } from 'react';
import { filmPhotos, travelPhotos } from './data/photos';

// Section content is split out of the first load; shared by the in-room screens and the no-WebGL fallback.
const loaders = {
  Roadmap: () => import('./screens/Roadmap'),
  About: () => import('./screens/About'),
  Projects: () => import('./screens/Projects'),
  Watching: () => import('./screens/Watching'),
  Hobbies: () => import('./screens/Hobbies'),
  Contact: () => import('./screens/Contact'),
  Music: () => import('./screens/Music'),
  ResumeViewer: () => import('./screens/ResumeViewer'),
  Gaming: () => import('./screens/Gaming'),
  Photos: () => import('./screens/Photos'),
};

// Warm every section once the room is up, so the first click doesn't wait on a download.
export function preloadSections() {
  Object.values(loaders).forEach((load) => load());
}

const Roadmap = lazy(loaders.Roadmap);
const About = lazy(loaders.About);
const Projects = lazy(loaders.Projects);
const Watching = lazy(loaders.Watching);
const Hobbies = lazy(loaders.Hobbies);
const Contact = lazy(loaders.Contact);
const Music = lazy(loaders.Music);
const ResumeViewer = lazy(loaders.ResumeViewer);
const Gaming = lazy(loaders.Gaming);
const Photos = lazy(loaders.Photos);

export const sectionContent = {
  career: (props) => <Roadmap {...props} />,
  projects: (props) => <Projects {...props} />,
  watching: (props) => <Watching {...props} />,
  music: (props) => <Music {...props} />,
  sports: (props) => <Hobbies {...props} sectionId="sports" hobbyIds={['basketball', 'soccer', 'ping-pong', 'fitness', 'running']} />,
  outdoors: (props) => <Hobbies {...props} sectionId="outdoors" hobbyIds={['eskating', 'karting', 'hiking', 'kayaking']} />,
  about: (props) => <About {...props} />,
  contact: (props) => <Contact {...props} />,
  resume: (props) => <ResumeViewer {...props} />,
  gaming: (props) => <Gaming {...props} />,
  film: (props) => (
    <Photos
      {...props}
      sectionId="film"
      label="Film photos"
      photos={filmPhotos}
      emptyText="Still developing. Film photos are on the way."
      emptyCaption="developing…"
    />
  ),
  travel: (props) => (
    <Photos
      {...props}
      sectionId="travel"
      label="Travel photos"
      photos={travelPhotos}
      emptyText="Travel photos are on the way."
      emptyCaption="somewhere…"
    />
  ),
};
