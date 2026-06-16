import { useSyncExternalStore } from 'react';

// Tiny module-level store so the navbar (rendered in App) and the
// section pill (rendered in Home) stay in sync without prop drilling.
let currentSection = '';
const listeners = new Set();

export function publishActiveSection(sectionId) {
  if (sectionId === currentSection) {
    return;
  }

  currentSection = sectionId;
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return currentSection;
}

export default function useActiveSection() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
