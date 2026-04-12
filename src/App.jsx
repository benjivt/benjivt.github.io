import { lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';

const Home = lazy(() => import('./pages/Home'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

const pageTransition = {
  initial: { opacity: 0, y: 24, filter: 'blur(10px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -24,
    filter: 'blur(10px)',
    transition: { duration: 0.45, ease: [0.4, 0, 1, 1] },
  },
};

function PageFrame({ children, pageKey }) {
  return (
    <motion.div
      key={pageKey}
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="page-frame"
    >
      {children}
    </motion.div>
  );
}

function RouteLoadingFallback() {
  return (
    <div className="page-frame">
      <main className="section-shell project-detail-shell">
        <div className="glass-panel detail-panel missing-panel">
          <p className="eyebrow">Loading</p>
          <h1 className="section-title">Preparing the page.</h1>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="app-shell">
      <div className="background-orb background-orb-one" />
      <div className="background-orb background-orb-two" />
      <Navbar />
      <Suspense fallback={<RouteLoadingFallback />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageFrame pageKey="home">
                  <Home />
                </PageFrame>
              }
            />
            <Route
              path="/project/:slug"
              element={
                <PageFrame pageKey="project">
                  <ProjectDetail />
                </PageFrame>
              }
            />
            <Route
              path="*"
              element={
                <PageFrame pageKey="fallback">
                  <Home />
                </PageFrame>
              }
            />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </div>
  );
}
