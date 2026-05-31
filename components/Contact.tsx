'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ACADEMY_INFO } from '@/lib/constants';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitResult, setSubmitResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const RECIPIENT = 'rumanath.1996@gmail.com';

  function buildBody() {
    return `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email || 'Not provided'}\n\nMessage:\n${formData.message}`;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(formData.subject || 'Enquiry from Website');
    const body = encodeURIComponent(buildBody());
    window.location.href = `mailto:${RECIPIENT}?subject=${subject}&body=${body}`;
    setSubmitResult({ type: 'success', message: 'Your email application has been opened. Please click Send in your email client.' });
    setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
  }

  function openGmail() {
    const subject = encodeURIComponent(formData.subject || 'Enquiry from Website');
    const body = encodeURIComponent(buildBody());
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${RECIPIENT}&su=${subject}&body=${body}`, '_blank');
    setSubmitResult({ type: 'success', message: 'Gmail has been opened. Please click Send in Gmail.' });
  }

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Ready to start your learning journey? Reach out to us and we will be happy to help.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-field"
                    placeholder="Your phone number"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field"
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="input-field"
                    placeholder="Subject"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="input-field resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="btn-primary flex-1"
                >
                  Send Enquiry
                </button>
                <button
                  type="button"
                  onClick={openGmail}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white bg-red-500 hover:bg-red-600 transition-all duration-300 transform hover:scale-[1.03] active:scale-[0.98] shadow-lg flex-1"
                >
                  Open Gmail
                </button>
              </div>

              {submitResult && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm font-medium text-center text-[var(--success)]"
                >
                  {submitResult.message}
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Quick Contact */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Quick Contact</h3>
              <div className="space-y-4">
                <a
                  href={`tel:${ACADEMY_INFO.phoneRaw}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-input)] hover:bg-[var(--gold-subtle)] transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">Call Us</p>
                    <p className="text-sm text-[var(--text-secondary)]">{ACADEMY_INFO.phone}</p>
                  </div>
                </a>

                <a
                  href={ACADEMY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-input)] hover:bg-green-500/10 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">WhatsApp</p>
                    <p className="text-sm text-[var(--text-secondary)]">Chat with us instantly</p>
                  </div>
                </a>

                <a
                  href={`mailto:${ACADEMY_INFO.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-input)] hover:bg-purple-500/10 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">Email</p>
                    <p className="text-sm text-[var(--text-secondary)]">{ACADEMY_INFO.email}</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Location Info */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">Location</h3>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[var(--gold)] mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-[var(--text-primary)] font-medium">{ACADEMY_INFO.location}</p>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">{ACADEMY_INFO.mapCode}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
