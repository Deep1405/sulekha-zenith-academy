'use client';

import { motion } from 'framer-motion';
import { ACADEMY_INFO } from '@/lib/constants';

const highlights = [
  { icon: '🎯', label: 'Personal Attention' },
  { icon: '👥', label: 'Small Batches' },
  { icon: '🏠', label: 'Home-Based Learning' },
  { icon: '📱', label: 'Parent Communication' },
  { icon: '📝', label: 'Regular Assessments' },
];

export default function About() {
  return (
    <section id="about" className="section-padding bg-[var(--bg-secondary)]">
      <div className="container-custom mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Meet Your <span className="text-gradient">Educator</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Dedicated to nurturing young minds with patience, passion, and personalized guidance.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden glass-card flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-24 h-24 rounded-full gold-gradient flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">👩‍🏫</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-[var(--text-primary)]">{ACADEMY_INFO.owner}</h3>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">Founder & Lead Educator</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gold-500/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-navy-500/20 rounded-full blur-xl" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-display font-bold mb-4 text-[var(--text-primary)]">
              {ACADEMY_INFO.owner}
            </h3>
            <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
              With over a decade of teaching experience, Ruma Nath has dedicated her career to providing 
              quality education with personal attention. At Sulekha Zenith Academy, every student is 
              treated as unique, with customized learning approaches that build concept clarity and 
              confidence.
            </p>
            <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
              The academy focuses on creating a warm, supportive environment where students feel 
              comfortable asking questions and exploring ideas. Small batch sizes ensure that no student 
              is left behind, and regular parent communication keeps families informed about their 
              child&apos;s progress.
            </p>

            {/* Highlight Badges */}
            <div className="flex flex-wrap gap-3">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  className="glass-card px-4 py-2 flex items-center gap-2 text-sm font-medium"
                >
                  <span>{item.icon}</span>
                  <span className="text-[var(--text-primary)]">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
