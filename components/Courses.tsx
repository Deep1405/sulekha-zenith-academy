'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { SCHOOL_COURSES, HIGHER_ED_COURSES, COURSES, ACADEMY_INFO } from '@/lib/constants';

type Filter = 'all' | 'school' | 'higher';

interface Course {
  id: string;
  name: string;
  icon: string;
  description: string;
  classes: string;
  category: 'school' | 'higher';
  color: string;
  overview: string;
  topics: string[];
  method: string;
  examSupport: string;
}

export default function Courses() {
  const [filter, setFilter] = useState<Filter>('all');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const filteredCourses = filter === 'all' ? COURSES : filter === 'school' ? SCHOOL_COURSES : HIGHER_ED_COURSES;

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: 'All Courses' },
    { key: 'school', label: 'School Courses' },
    { key: 'higher', label: 'Higher Education' },
  ];

  return (
    <section id="courses" className="section-padding">
      <div className="container-custom mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Our <span className="text-gradient">Courses</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Comprehensive coaching from school level to college &amp; university — building strong foundations and academic excellence.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                filter === f.key
                  ? 'bg-gradient-to-r from-[var(--gold)] to-yellow-500 text-navy-900 shadow-lg'
                  : 'glass-card text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* School Education Section */}
        {(filter === 'all' || filter === 'school') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            {filter === 'all' && (
              <h3 className="text-xl md:text-2xl font-display font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                🏫 <span>School Education</span>
              </h3>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {(SCHOOL_COURSES as Course[]).map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  className="glass-card p-6 hover:scale-[1.03] transition-transform duration-300 group cursor-pointer"
                  onClick={() => setSelectedCourse(course)}
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    {course.icon}
                  </div>
                  <h4 className="text-lg font-bold text-[var(--text-primary)] mb-2">{course.name}</h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-3 leading-relaxed">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[var(--gold)] bg-[var(--gold-subtle)] px-3 py-1 rounded-full">
                      {course.classes}
                    </span>
                    <span className="text-sm font-medium text-[var(--gold)] hover:underline">Learn More</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Higher Education Section */}
        {(filter === 'all' || filter === 'higher') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {filter === 'all' && (
              <h3 className="text-xl md:text-2xl font-display font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
                🎓 <span>College &amp; University Education</span>
              </h3>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {(HIGHER_ED_COURSES as Course[]).map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  className="glass-card p-6 hover:scale-[1.03] transition-transform duration-300 group cursor-pointer"
                  onClick={() => setSelectedCourse(course)}
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    {course.icon}
                  </div>
                  <h4 className="text-lg font-bold text-[var(--text-primary)] mb-2">{course.name}</h4>
                  <p className="text-sm text-[var(--text-secondary)] mb-3 leading-relaxed">{course.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[var(--gold)] bg-[var(--gold-subtle)] px-3 py-1 rounded-full">
                      {course.classes}
                    </span>
                    <span className="text-sm font-medium text-[var(--gold)] hover:underline">Learn More</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
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

              {/* Course Overview */}
              <div className="mb-5">
                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">📋 Course Overview</h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{selectedCourse.overview}</p>
              </div>

              {/* Topics Covered */}
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

              {/* Eligibility */}
              <div className="mb-5">
                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">🎓 Eligibility</h4>
                <p className="text-sm text-[var(--text-secondary)]">{selectedCourse.classes}</p>
              </div>

              {/* Teaching Methodology */}
              <div className="mb-5">
                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">👩‍🏫 Teaching Methodology</h4>
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
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-green-500 hover:bg-green-600 transition-all duration-300 flex-1"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
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
