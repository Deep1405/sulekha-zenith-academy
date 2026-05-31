'use client';

import { motion } from 'framer-motion';
import { COURSES } from '@/lib/constants';

export default function Courses() {
  return (
    <section id="courses" className="section-padding">
      <div className="container-custom mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Our <span className="text-gradient">Courses</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Comprehensive coaching for all major subjects from Class I to X with focus on concept clarity and exam readiness.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {COURSES.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-card p-6 hover:scale-105 transition-transform duration-300 group cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                {course.icon}
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                {course.name}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-3 leading-relaxed">
                {course.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--gold)] bg-gold-500/10 px-3 py-1 rounded-full">
                  {course.classes}
                </span>
                <button className="text-sm font-medium text-[var(--gold)] hover:underline">
                  Learn More
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
