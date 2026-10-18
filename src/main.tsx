import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

const container = document.getElementById('root');

if (container) {
  if (container.hasChildNodes()) {
    ReactDOM.hydrateRoot(
      container,
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    ReactDOM.createRoot(container).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
}
