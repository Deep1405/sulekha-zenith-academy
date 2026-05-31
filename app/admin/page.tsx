'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';

interface DashboardStats {
  totalEnquiries: number;
  pendingReviews: number;
  galleryItems: number;
  totalVisitors: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalEnquiries: 0,
    pendingReviews: 0,
    galleryItems: 0,
    totalVisitors: 0,
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      const supabase = createClient();

      const [enquiriesRes, reviewsRes, galleryRes] = await Promise.all([
        supabase.from('enquiries').select('*', { count: 'exact', head: true }),
        supabase.from('reviews').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('gallery').select('*', { count: 'exact', head: true }),
      ]);

      setStats({
        totalEnquiries: enquiriesRes.count || 0,
        pendingReviews: reviewsRes.count || 0,
        galleryItems: galleryRes.count || 0,
        totalVisitors: 0,
      });

      // Fetch recent enquiries as activity
      const { data: recentEnquiries } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (recentEnquiries) {
        setRecentActivity(recentEnquiries);
      }
    } catch (error) {
      // Supabase not configured
    }
  }

  const statCards = [
    { label: 'Total Enquiries', value: stats.totalEnquiries, icon: '📩', color: 'bg-blue-500/10 text-blue-500' },
    { label: 'Pending Reviews', value: stats.pendingReviews, icon: '⭐', color: 'bg-yellow-500/10 text-yellow-500' },
    { label: 'Gallery Items', value: stats.galleryItems, icon: '🖼️', color: 'bg-purple-500/10 text-purple-500' },
    { label: 'Total Visitors', value: stats.totalVisitors, icon: '👥', color: 'bg-green-500/10 text-green-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">Dashboard</h2>
        <p className="text-[var(--text-secondary)]">Overview of your academy</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center text-lg`}>
                {card.icon}
              </span>
            </div>
            <p className="text-2xl font-bold text-[var(--text-primary)]">{card.value}</p>
            <p className="text-sm text-[var(--text-secondary)]">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Recent Activity</h3>
        {recentActivity.length > 0 ? (
          <div className="space-y-3">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-primary)]">
                <span className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-sm">📩</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)] truncate">{item.name}</p>
                  <p className="text-xs text-[var(--text-secondary)] truncate">{item.message}</p>
                </div>
                <span className="text-xs text-[var(--text-secondary)] whitespace-nowrap">
                  {new Date(item.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-[var(--text-secondary)] py-8">No recent activity</p>
        )}
      </div>
    </div>
  );
}
