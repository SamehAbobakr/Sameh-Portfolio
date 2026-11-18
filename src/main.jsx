import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
// Arabic font (Cairo) is loaded from Google Fonts in index.html.
import './styles/index.css';
import AppProviders from './app/providers';
import AppRouter from './app/router';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProviders>
      <AppRouter />
    </AppProviders>
  </React.StrictMode>,
);
