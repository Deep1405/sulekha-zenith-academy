'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ACADEMY_INFO } from '@/lib/constants';

const qualifications = [
  { degree: 'Bachelor of Education (B.Ed.)', institution: 'Baba Saheb Ambedkar Education University (BSAEU)', year: '2025' },
  { degree: 'Master of Arts (M.A.) in Bengali', institution: 'University of Calcutta', year: '2021', achievement: 'First Class' },
  { degree: "Bachelor's Degree (Graduation)", institution: 'Asutosh College', year: '2019', achievement: 'First Class' },
  { degree: 'Higher Secondary Education', institution: 'WBCHSE', year: '2016' },
  { degree: 'Secondary Education', institution: 'WBBSE', year: '2014' },
];

const focusAreas = [
  'Personalized Student Guidance',
  'Bengali Language & Literature',
  'Concept-Based Learning',
  'Academic Excellence',
  'Regular Assessment & Feedback',
  'Parent-Teacher Communication',
  'Confidence Building',
  'Strong Educational Foundation',
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

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Educator Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative group">
              <div className="w-72 h-[400px] md:w-80 md:h-[500px] lg:w-[340px] lg:h-[550px] rounded-2xl overflow-hidden glass-card border border-[var(--gold)]/20 p-2 transition-transform duration-300 group-hover:scale-[1.02]"
                style={{ boxShadow: '0 8px 40px rgba(212, 175, 55, 0.15)' }}
              >
                <Image
                  src="/images/owner.png"
                  alt={ACADEMY_INFO.owner}
                  width={400}
                  height={600}
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
              {/* Decorative glow */}
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-[var(--gold)] opacity-[0.06] rounded-full blur-xl" />
              <div className="absolute -bottom-3 -left-3 w-14 h-14 bg-[var(--navy)] opacity-[0.06] rounded-full blur-xl" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-display font-bold mb-2 text-[var(--text-primary)]">
              {ACADEMY_INFO.owner}
            </h3>
            <p className="text-sm text-[var(--gold)] font-medium mb-4">Founder & Educator, Sulekha Zenith Academy</p>
            <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
              A passionate and dedicated educator committed to helping students achieve academic excellence 
              through personalized guidance, conceptual learning, and continuous progress monitoring.
            </p>

            {/* Qualifications */}
            <h4 className="text-lg font-display font-bold mb-3 text-[var(--text-primary)]">📚 Academic Qualifications</h4>
            <div className="space-y-3 mb-6">
              {qualifications.map((q, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  className="glass-card px-4 py-3"
                >
                  <p className="font-semibold text-sm text-[var(--text-primary)]">🎓 {q.degree}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{q.institution} • {q.year}</p>
                  {q.achievement && <p className="text-xs text-[var(--gold)] font-medium mt-1">⭐ {q.achievement}</p>}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Teaching Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <h4 className="text-lg font-display font-bold mb-4 text-[var(--text-primary)]">🌟 Teaching Philosophy</h4>
          <blockquote className="glass-card px-8 py-6 max-w-3xl mx-auto italic text-[var(--text-secondary)] leading-relaxed">
            &ldquo;My goal is to create a supportive learning environment where every student receives personal attention, 
            develops strong conceptual understanding, and gains the confidence needed to succeed academically and beyond.&rdquo;
          </blockquote>
        </motion.div>

        {/* Areas of Focus */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12"
        >
          <h4 className="text-lg font-display font-bold mb-6 text-center text-[var(--text-primary)]">💡 Areas of Focus</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {focusAreas.map((area, index) => (
              <motion.span
                key={area}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                className="glass-card px-4 py-2 text-sm font-medium text-[var(--text-primary)]"
              >
                {area}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
