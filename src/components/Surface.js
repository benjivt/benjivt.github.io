import { createContext, useContext } from 'react';

// Where a section is being drawn: a room card ('card'), a device screen ('laptop' | 'tv' | 'phone'),
// or the view inside the VR headset ('vr').
// Shared pieces like ScreenHeader read it to dress themselves for that screen.
export const SurfaceContext = createContext('card');

export const useSurface = () => useContext(SurfaceContext);
