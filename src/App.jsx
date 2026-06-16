import { lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollAtmosphere from './components/ScrollAtmosphere';
import { ENABLE_PROJECT_DETAILS } from './config/features';

const Home = lazy(() => import('./pages/Home'));
const ProjectDetail = ENABLE_PROJECT_DETAILS
  ? lazy(() => import('./pages/ProjectDetail'))
  : null;

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
      <main className="section-shell route-loading-shell" aria-live="polite" aria-busy="true">
        <div className="route-loading-copy">
          <p className="eyebrow">Loading</p>
          <p className="section-title route-loading-title">Loading portfolio.</p>
        </div>
      </main>
    </div>
  );
}

function CatchAllRedirect() {
  const location = useLocation();

  return (
    <Navigate
      to={{ pathname: '/', search: location.search, hash: location.hash }}
      replace
    />
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="app-shell">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <ScrollAtmosphere />
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
            {ENABLE_PROJECT_DETAILS && ProjectDetail ? (
              <Route
                path="/project/:slug"
                element={
                  <PageFrame pageKey="project">
                    <ProjectDetail />
                  </PageFrame>
                }
              />
            ) : (
              <Route path="/project/:slug" element={<Navigate to="/#projects" replace />} />
            )}
            <Route path="*" element={<CatchAllRedirect />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </div>
  );
}
