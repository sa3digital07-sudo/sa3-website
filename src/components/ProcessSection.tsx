import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { PROCESS_STEPS } from '../data/siteData';
import { Search, Compass, Layers, CheckCircle2 } from 'lucide-react';
import './ProcessSection.css';

const stepIcons = [Search, Compass, Layers, CheckCircle2];

export const ProcessSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 75%']
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={sectionRef} className="process-section" id="process">
      <div className="container">
        
        <div className="section-header-center">
          <span className="mono-tag">ENGINEERING METHODOLOGY</span>
          <h2 className="section-title">A disciplined 4-step delivery pipeline</h2>
          <p className="section-subtitle">
            From initial alignment to code handover, every phase has concrete deliverables
            and review checkpoints so projects move with speed and clarity.
          </p>
        </div>

        <div className="process-timeline-wrapper">
          {/* Central Animated Timeline Line for Desktop */}
          <div className="timeline-track-rail">
            <motion.div
              className="timeline-track-fill"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="process-steps-list">
            {PROCESS_STEPS.map((step, idx) => {
              const IconComponent = stepIcons[idx];
              const isEven = idx % 2 === 1;

              return (
                <motion.div
                  key={step.step}
                  className={`process-step-row ${isEven ? 'row-reverse' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  {/* Step Card Content */}
                  <div className="process-card glass-panel">
                    <div className="step-badge-row">
                      <span className="step-num">{step.step}</span>
                      <span className="step-focus-pill">{step.focus}</span>
                    </div>
                    <h3 className="step-name">{step.name}</h3>
                    <p className="step-desc">{step.description}</p>
                  </div>

                  {/* Node Connector Icon in Center */}
                  <div className="process-node-anchor">
                    <div className="process-node-icon-box">
                      <IconComponent size={20} className="node-icon" />
                    </div>
                  </div>

                  {/* Empty balancing space for desktop grid */}
                  <div className="process-spacer" />
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
