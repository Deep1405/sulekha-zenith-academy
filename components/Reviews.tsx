'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';

interface Review {
  id: string;
  name: string;
  rating: number;
  category: string;
  message: string;
  created_at: string;
}

function StarRating({ rating, onRate, interactive = false }: {
  rating: number;
  onRate?: (rating: number) => void;
  interactive?: boolean;
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => interactive && onRate?.(star)}
          className={`text-xl ${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
          disabled={!interactive}
        >
          {star <= rating ? '⭐' : '☆'}
        </button>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    category: 'teaching',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from('reviews')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(6);

      if (data) {
        setReviews(data);
      }
    } catch (error) {
      // Supabase not configured yet, use empty array
    }
  }

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage('');

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('reviews')
        .insert([{
          ...formData,
          status: 'pending',
          created_at: new Date().toISOString(),
        }]);

      if (error) throw error;

      setSubmitMessage('Thank you! Your review has been submitted for approval.');
      setFormData({ name: '', rating: 5, category: 'teaching', message: '' });
      setShowForm(false);
    } catch (error) {
      setSubmitMessage('Unable to submit review. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="reviews" className="section-padding bg-[var(--bg-secondary)]">
      <div className="container-custom mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Student <span className="text-gradient">Reviews</span>
          </h2>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-4xl font-bold text-[var(--gold)]">{averageRating}</div>
            <div>
              <StarRating rating={Math.round(Number(averageRating))} />
              <p className="text-sm text-[var(--text-secondary)]">{reviews.length} reviews</p>
            </div>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        {reviews.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="glass-card p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-[var(--text-primary)]">{review.name}</h4>
                  <StarRating rating={review.rating} />
                </div>
                <span className="text-xs font-medium text-[var(--gold)] bg-[var(--gold-subtle)] px-2 py-1 rounded-full">
                  {review.category}
                </span>
                <p className="text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
                  {review.message}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {reviews.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-12 glass-card mb-8"
          >
            <span className="text-4xl mb-4 block">✨</span>
            <p className="text-[var(--text-secondary)]">Be the first to share your experience!</p>
          </motion.div>
        )}

        {/* Submit Review Button / Form */}
        <div className="text-center">
          {!showForm && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              Write a Review
            </motion.button>
          )}

          {showForm && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="glass-card p-6 md:p-8 max-w-lg mx-auto text-left"
            >
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Share Your Experience</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Rating</label>
                  <StarRating
                    rating={formData.rating}
                    onRate={(rating) => setFormData({ ...formData, rating })}
                    interactive
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input-field"
                  >
                    <option value="teaching">Teaching Quality</option>
                    <option value="environment">Learning Environment</option>
                    <option value="results">Results & Progress</option>
                    <option value="communication">Communication</option>
                    <option value="overall">Overall Experience</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Your Review</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input-field resize-none"
                    placeholder="Share your experience..."
                  />
                </div>

                <div className="flex gap-3">
                  <button type="submit" disabled={submitting} className="btn-primary flex-1">
                    {submitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.form>
          )}

          {submitMessage && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-sm text-green-500 font-medium"
            >
              {submitMessage}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
