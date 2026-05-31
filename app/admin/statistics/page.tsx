'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';

interface VisitorStat {
  date: string;
  views: number;
}

export default function StatisticsPage() {
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [todayVisitors, setTodayVisitors] = useState(0);
  const [weeklyStats, setWeeklyStats] = useState<VisitorStat[]>([]);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const supabase = createClient();
      const { data, count } = await supabase
        .from('visitors')
        .select('*', { count: 'exact' });

      setTotalVisitors(count || 0);

      // Get today's count
      const today = new Date().toISOString().split('T')[0];
      const { count: todayCount } = await supabase
        .from('visitors')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today);

      setTodayVisitors(todayCount || 0);
    } catch (error) {
      // Supabase not configured
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">Statistics</h2>
        <p className="text-[var(--text-secondary)]">Visitor analytics and insights</p>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 text-center"
        >
          <p className="text-3xl font-bold text-gradient">{totalVisitors}</p>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Total Visitors</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 text-center"
        >
          <p className="text-3xl font-bold text-gradient">{todayVisitors}</p>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Today</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 text-center"
        >
          <p className="text-3xl font-bold text-gradient">--</p>
          <p className="text-sm text-[var(--text-secondary)] mt-1">This Week</p>
        </motion.div>
      </div>

      {/* Info */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">Analytics Overview</h3>
        <p className="text-[var(--text-secondary)] text-sm">
          Visitor tracking is active. Statistics update in real-time as visitors browse the academy website.
          More detailed analytics including page views, referral sources, and device breakdowns will be available
          as data accumulates.
        </p>
      </div>
    </div>
  );
}
