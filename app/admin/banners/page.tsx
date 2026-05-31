'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { ACADEMY_INFO } from '@/lib/constants';

export default function BannersAdminPage() {
  const [bannerData, setBannerData] = useState({
    title: ACADEMY_INFO.name,
    tagline: ACADEMY_INFO.tagline,
    ctaText: 'Enroll Now',
    description: ACADEMY_INFO.description,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      const supabase = createClient();
      await supabase
        .from('settings')
        .upsert([
          { key: 'hero_title', value: bannerData.title },
          { key: 'hero_tagline', value: bannerData.tagline },
          { key: 'hero_cta', value: bannerData.ctaText },
          { key: 'hero_description', value: bannerData.description },
        ]);
      setSaved(true);
    } catch (error) {
      // Handle error
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">Hero Banner</h2>
        <p className="text-[var(--text-secondary)]">Edit hero section content</p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSave}
        className="glass-card p-6 space-y-4 max-w-2xl"
      >
        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Academy Title</label>
          <input
            type="text"
            value={bannerData.title}
            onChange={(e) => setBannerData({ ...bannerData, title: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Tagline</label>
          <input
            type="text"
            value={bannerData.tagline}
            onChange={(e) => setBannerData({ ...bannerData, tagline: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">CTA Button Text</label>
          <input
            type="text"
            value={bannerData.ctaText}
            onChange={(e) => setBannerData({ ...bannerData, ctaText: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Description</label>
          <textarea
            rows={3}
            value={bannerData.description}
            onChange={(e) => setBannerData({ ...bannerData, description: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)] resize-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="btn-primary text-sm">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          {saved && <span className="text-sm text-green-500">Saved successfully!</span>}
        </div>
      </motion.form>

      {/* Preview */}
      <div className="glass-card p-6 max-w-2xl">
        <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-3">Preview</h3>
        <div className="text-center p-6 rounded-xl bg-[var(--bg-primary)]">
          <h4 className="text-2xl font-display font-bold text-gradient mb-2">{bannerData.title}</h4>
          <p className="text-[var(--text-secondary)] mb-4">{bannerData.tagline}</p>
          <span className="btn-primary text-sm">{bannerData.ctaText}</span>
        </div>
      </div>
    </div>
  );
}
