'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { COURSES, ACADEMY_INFO } from '@/lib/constants';

interface Course {
  id: string;
  name: string;
  icon: string;
  description: string;
  classes: string;
  color: string;
  overview: string;
  topics: string[];
  method: string;
  examSupport: string;
}

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

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
            Comprehensive coaching for Bengali, English, History, Geography, Mathematics, Science &amp; GK from Class I to XII with focus on concept clarity and exam readiness.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {(COURSES as Course[]).map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="glass-card p-6 hover:scale-[1.03] transition-transform duration-300 group cursor-pointer"
              onClick={() => setSelectedCourse(course)}
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
                <span className="text-xs font-medium text-[var(--gold)] bg-[var(--gold-subtle)] px-3 py-1 rounded-full">
                  {course.classes}
                </span>
                <span className="text-sm font-medium text-[var(--gold)] hover:underline">
                  Learn More
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Arts/Humanities Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 text-center"
        >
          <div className="glass-card inline-block px-6 py-3">
            <p className="text-sm text-[var(--text-secondary)]">
              <span className="font-semibold text-[var(--text-primary)]">Arts / Humanities (XI–XII):</span>{' '}
              Bengali, English, History &amp; Geography available for Higher Secondary students.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Learn More Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedCourse(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card p-6 md:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${selectedCourse.color} flex items-center justify-center text-2xl shadow-lg`}>
                  {selectedCourse.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">{selectedCourse.name}</h3>
                  <span className="text-sm font-medium text-[var(--gold)]">{selectedCourse.classes}</span>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="ml-auto p-2 rounded-lg hover:bg-[var(--gold-subtle)] transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Overview */}
              <div className="mb-5">
                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">📋 Subject Overview</h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{selectedCourse.overview}</p>
              </div>

              {/* Topics */}
              <div className="mb-5">
                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2">📚 Topics Covered</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCourse.topics.map((topic) => (
                    <span key={topic} className="text-xs bg-[var(--gold-subtle)] text-[var(--text-primary)] px-3 py-1 rounded-full">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Class Range */}
              <div className="mb-5">
                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">🎓 Class Range</h4>
                <p className="text-sm text-[var(--text-secondary)]">{selectedCourse.classes}</p>
              </div>

              {/* Teaching Method */}
              <div className="mb-5">
                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">👩‍🏫 Teaching Method</h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{selectedCourse.method}</p>
              </div>

              {/* Exam Support */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">📝 Exam Preparation Support</h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{selectedCourse.examSupport}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#contact" onClick={() => setSelectedCourse(null)} className="btn-primary flex-1 text-center">
                  Contact Teacher
                </a>
                <a
                  href={`${ACADEMY_INFO.whatsappUrl}?text=${encodeURIComponent(`Hi, I'm interested in ${selectedCourse.name} (${selectedCourse.classes}). Please share more details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white bg-green-500 hover:bg-green-600 transition-all duration-300 flex-1"
                >
                  WhatsApp Enquiry
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
