import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SoundProvider } from './hooks/useSound';
import './styles/room.css';
import './styles/ui.css';
import './styles/screens.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SoundProvider>
      <App />
    </SoundProvider>
  </React.StrictMode>
);
