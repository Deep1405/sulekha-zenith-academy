'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';

interface Review {
  id: string;
  name: string;
  rating: number;
  category: string;
  message: string;
  status: string;
  created_at: string;
}

export default function ReviewsAdminPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');

  useEffect(() => {
    fetchReviews();
  }, [filter]);

  async function fetchReviews() {
    try {
      const supabase = createClient();
      let query = supabase.from('reviews').select('*').order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data } = await query;
      if (data) setReviews(data);
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  }

  async function updateReviewStatus(id: string, status: string) {
    const supabase = createClient();
    await supabase.from('reviews').update({ status }).eq('id', id);
    setReviews(reviews.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">Reviews</h2>
        <p className="text-[var(--text-secondary)]">Approve or reject student reviews</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === tab
                ? 'bg-[var(--gold)] text-white'
                : 'glass text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-[var(--text-secondary)]">Loading...</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12 glass-card">
          <span className="text-4xl mb-4 block">⭐</span>
          <p className="text-[var(--text-secondary)]">No reviews found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card p-4 md:p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">{review.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm">{'⭐'.repeat(review.rating)}</span>
                    <span className="text-xs text-[var(--gold)] bg-gold-500/10 px-2 py-0.5 rounded-full">{review.category}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  review.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                  review.status === 'approved' ? 'bg-green-500/10 text-green-500' :
                  'bg-red-500/10 text-red-500'
                }`}>
                  {review.status}
                </span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mb-3">{review.message}</p>
              <div className="flex gap-2">
                {review.status !== 'approved' && (
                  <button
                    onClick={() => updateReviewStatus(review.id, 'approved')}
                    className="px-3 py-1 text-xs rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors"
                  >
                    Approve
                  </button>
                )}
                {review.status !== 'rejected' && (
                  <button
                    onClick={() => updateReviewStatus(review.id, 'rejected')}
                    className="px-3 py-1 text-xs rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                  >
                    Reject
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
