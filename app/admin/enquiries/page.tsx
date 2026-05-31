'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';

interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  subject: string | null;
  message: string;
  status: string;
  created_at: string;
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  async function fetchEnquiries() {
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) setEnquiries(data);
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: string) {
    const supabase = createClient();
    await supabase.from('enquiries').update({ status }).eq('id', id);
    setEnquiries(enquiries.map((e) => (e.id === id ? { ...e, status } : e)));
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">Enquiries</h2>
        <p className="text-[var(--text-secondary)]">Manage contact form submissions</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-[var(--text-secondary)]">Loading...</p>
        </div>
      ) : enquiries.length === 0 ? (
        <div className="text-center py-12 glass-card">
          <span className="text-4xl mb-4 block">📩</span>
          <p className="text-[var(--text-secondary)]">No enquiries yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map((enquiry, index) => (
            <motion.div
              key={enquiry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card p-4 md:p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)]">{enquiry.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{enquiry.phone} {enquiry.email && `| ${enquiry.email}`}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    enquiry.status === 'new' ? 'bg-blue-500/10 text-blue-500' :
                    enquiry.status === 'contacted' ? 'bg-green-500/10 text-green-500' :
                    'bg-gray-500/10 text-gray-500'
                  }`}>
                    {enquiry.status}
                  </span>
                  <span className="text-xs text-[var(--text-secondary)]">
                    {new Date(enquiry.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              {enquiry.subject && (
                <p className="text-sm font-medium text-[var(--text-primary)] mb-1">Subject: {enquiry.subject}</p>
              )}
              <p className="text-sm text-[var(--text-secondary)] mb-3">{enquiry.message}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => updateStatus(enquiry.id, 'contacted')}
                  className="px-3 py-1 text-xs rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors"
                >
                  Mark Contacted
                </button>
                <button
                  onClick={() => updateStatus(enquiry.id, 'resolved')}
                  className="px-3 py-1 text-xs rounded-lg bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 transition-colors"
                >
                  Mark Resolved
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
