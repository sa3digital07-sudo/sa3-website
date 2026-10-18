import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import './PageHeader.css';

interface PageHeaderProps {
  badge: string;
  title: string;
  description: string;
  breadcrumb?: { label: string; href?: string }[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  description,
  breadcrumb
}) => {
  return (
    <div className="page-header-wrapper">
      <div className="container">
        
        {breadcrumb && (
          <nav className="breadcrumb-nav" aria-label="Breadcrumb">
            <a href="/">Home</a>
            {breadcrumb.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight size={14} className="breadcrumb-separator" />
                {crumb.href ? (
                  <a href={crumb.href}>{crumb.label}</a>
                ) : (
                  <span aria-current="page">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        <div className="page-header-content">
          <motion.span
            className="mono-tag"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {badge}
          </motion.span>

          <motion.h1
            className="page-title"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {title}
          </motion.h1>

          <motion.p
            className="page-desc"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {description}
          </motion.p>
        </div>

      </div>
    </div>
  );
};
