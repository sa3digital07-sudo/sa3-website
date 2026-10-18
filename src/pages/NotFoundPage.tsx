import React from 'react';
import { Home, Compass } from 'lucide-react';
import './NotFoundPage.css';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page-view">
      <div className="container not-found-container">
        
        <div className="not-found-card glass-panel">
          <span className="mono-tag">HTTP 404 / NOT FOUND</span>
          <h1 className="not-found-title">Page Not Found</h1>
          <p className="not-found-desc">
            The page you requested could not be located. It may have moved, or the URL might have been typed incorrectly.
          </p>

          <div className="not-found-actions">
            <a href="/" className="btn btn-primary">
              <Home size={16} />
              <span>Return to Homepage</span>
            </a>
            <a href="/services/" className="btn btn-secondary">
              <Compass size={16} />
              <span>Explore Services</span>
            </a>
          </div>

          <div className="quick-directory-block">
            <h4>Quick Directory</h4>
            <div className="quick-links-row">
              <a href="/website-development/">Website Design & Dev</a>
              <a href="/custom-software/">Custom Software</a>
              <a href="/application-development/">App Development</a>
              <a href="/about/">About SA³</a>
              <a href="/contact/">Contact</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
