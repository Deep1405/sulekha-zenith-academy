'use client';

import { motion } from 'framer-motion';
import { FEATURES } from '@/lib/constants';

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="section-padding bg-[var(--bg-secondary)]">
      <div className="container-custom mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Why Choose <span className="text-gradient">Us</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Discover what makes Sulekha Zenith Academy the preferred choice for quality education.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gold-500/10 flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 group-hover:bg-gold-500/20 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
