import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useReducedMotion } from 'motion/react';
import './Hero3DCenterpiece.css';

export const Hero3DCenterpiece: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Smooth springs for cursor tilt
  const springConfig = { damping: 25, stiffness: 120, mass: 0.6 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Constrain tilt to gentle, premium range
    const maxTilt = 14;
    const tiltX = -(mouseY / (rect.height / 2)) * maxTilt;
    const tiltY = (mouseX / (rect.width / 2)) * maxTilt;

    rotateX.set(tiltX);
    rotateY.set(tiltY);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div
      ref={containerRef}
      className="hero-3d-wrapper"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    >
      <motion.div
        className="hero-3d-stage"
        style={{
          rotateX: shouldReduceMotion ? 10 : rotateX,
          rotateY: shouldReduceMotion ? -15 : rotateY,
        }}
      >
        {/* Ambient Floating Motion Container */}
        <div className={`hero-3d-scene ${!shouldReduceMotion && !isHovered ? 'ambient-float' : ''}`}>
          
          {/* Dimensional Light Glow Core */}
          <div className="cube-core-glow" />

          {/* 3D Glass Prism Sculpture */}
          <div className="glass-prism">
            <div className="prism-face face-front">
              <span className="face-label">SA³ / CORE</span>
              <div className="face-corner-mark mark-tl" />
              <div className="face-corner-mark mark-br" />
            </div>
            <div className="prism-face face-back">
              <div className="face-grid" />
            </div>
            <div className="prism-face face-right">
              <span className="face-coord">Z: +100</span>
            </div>
            <div className="prism-face face-left">
              <span className="face-coord">X: -100</span>
            </div>
            <div className="prism-face face-top" />
            <div className="prism-face face-bottom" />
          </div>

          {/* Layered Floating Telemetry Plane (Z: +65px) */}
          <div className="floating-plane plane-front">
            <div className="plane-header">
              <span className="plane-dot active" />
              <span className="plane-title">PRECISION ENGINE</span>
            </div>
            <div className="plane-data-row">
              <span className="data-metric">01 IDEATE</span>
              <span className="data-arrow">→</span>
              <span className="data-metric highlight">02 REALIZE</span>
            </div>
            <div className="plane-bar">
              <div className="plane-bar-fill" />
            </div>
          </div>

          {/* Layered Architectural Blueprint Grid (Z: -60px) */}
          <div className="floating-plane plane-back">
            <div className="blueprint-lines" />
            <div className="blueprint-tag">SYSTEM SPEC: 100% CRAWLABLE</div>
          </div>

          {/* Layered Performance Badge Plane (Z: +110px) */}
          <div className="floating-plane plane-badge">
            <div className="badge-content">
              <span className="badge-status">EST. ARCHITECTURE</span>
              <span className="badge-value">SSR / PRERENDERED</span>
            </div>
          </div>

          {/* 3D Orbital Geometry Rings */}
          <div className="orbital-ring ring-primary">
            <div className="orbit-node node-1" />
          </div>
          <div className="orbital-ring ring-secondary">
            <div className="orbit-node node-2" />
          </div>
          <div className="orbital-ring ring-tertiary" />

          {/* Coordinate Crosshairs */}
          <div className="crosshair crosshair-x" />
          <div className="crosshair crosshair-y" />
        </div>
      </motion.div>

      {/* Centerpiece Base Shadow */}
      <div className="stage-base-shadow" />
    </div>
  );
};
