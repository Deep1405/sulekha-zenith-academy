'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { ACADEMY_INFO, TEACHING_START_YEAR } from '@/lib/constants';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    name: ACADEMY_INFO.name,
    owner: ACADEMY_INFO.owner,
    phone: ACADEMY_INFO.phone,
    email: ACADEMY_INFO.email,
    location: ACADEMY_INFO.location,
    mapCode: ACADEMY_INFO.mapCode,
    description: ACADEMY_INFO.description,
    studentsTaught: '10',
    teachingStartYear: String(TEACHING_START_YEAR),
    satisfactionRate: '95',
    dedication: '100',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      const supabase = createClient();
      const entries = Object.entries(settings).map(([key, value]) => ({
        key: `academy_${key}`,
        value,
      }));
      await supabase.from('settings').upsert(entries);
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
        <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">Settings</h2>
        <p className="text-[var(--text-secondary)]">Academy information settings</p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSave}
        className="glass-card p-6 space-y-4 max-w-2xl"
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Academy Name</label>
            <input
              type="text"
              value={settings.name}
              onChange={(e) => setSettings({ ...settings, name: e.target.value })}
              className="w-full px-4 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Owner Name</label>
            <input
              type="text"
              value={settings.owner}
              onChange={(e) => setSettings({ ...settings, owner: e.target.value })}
              className="w-full px-4 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)]"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Phone</label>
            <input
              type="tel"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full px-4 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-4 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Location</label>
          <input
            type="text"
            value={settings.location}
            onChange={(e) => setSettings({ ...settings, location: e.target.value })}
            className="w-full px-4 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Google Maps Code</label>
          <input
            type="text"
            value={settings.mapCode}
            onChange={(e) => setSettings({ ...settings, mapCode: e.target.value })}
            className="w-full px-4 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Description</label>
          <textarea
            rows={3}
            value={settings.description}
            onChange={(e) => setSettings({ ...settings, description: e.target.value })}
            className="w-full px-4 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)] resize-none"
          />
        </div>

        {/* Achievement Stats */}
        <div className="border-t border-[var(--border-color)] pt-4 mt-4">
          <h3 className="text-lg font-display font-bold text-[var(--text-primary)] mb-3">🏆 Achievement Stats</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Students Taught</label>
              <input
                type="number"
                value={settings.studentsTaught}
                onChange={(e) => setSettings({ ...settings, studentsTaught: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Teaching Start Year</label>
              <input
                type="number"
                value={settings.teachingStartYear}
                onChange={(e) => setSettings({ ...settings, teachingStartYear: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)]"
              />
              <p className="text-xs text-[var(--text-muted)] mt-1">
                Years Experience = Current Year - Start Year (auto-calculated: {new Date().getFullYear() - Number(settings.teachingStartYear)} Years)
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Satisfaction Rate (%)</label>
              <input
                type="number"
                value={settings.satisfactionRate}
                onChange={(e) => setSettings({ ...settings, satisfactionRate: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Dedication (%)</label>
              <input
                type="number"
                value={settings.dedication}
                onChange={(e) => setSettings({ ...settings, dedication: e.target.value })}
                className="w-full px-4 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)]"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="btn-primary text-sm">
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
          {saved && <span className="text-sm text-green-500">Settings saved!</span>}
        </div>
      </motion.form>
    </div>
  );
}
