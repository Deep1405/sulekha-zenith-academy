'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { COURSES } from '@/lib/constants';

interface Course {
  id: string;
  name: string;
  description: string;
  classes: string;
  icon: string;
  active: boolean;
}

export default function CoursesAdminPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', description: '', classes: '' });

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      const supabase = createClient();
      const { data } = await supabase.from('courses').select('*').order('name');

      if (data && data.length > 0) {
        setCourses(data);
      } else {
        // Use default courses from constants
        setCourses(COURSES.map((c) => ({ ...c, active: true })));
      }
    } catch (error) {
      setCourses(COURSES.map((c) => ({ ...c, active: true })));
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(id: string) {
    const supabase = createClient();
    await supabase.from('courses').update(editForm).eq('id', id);
    setCourses(courses.map((c) => (c.id === id ? { ...c, ...editForm } : c)));
    setEditingId(null);
  }

  async function toggleActive(id: string, active: boolean) {
    const supabase = createClient();
    await supabase.from('courses').update({ active: !active }).eq('id', id);
    setCourses(courses.map((c) => (c.id === id ? { ...c, active: !active } : c)));
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">Courses</h2>
        <p className="text-[var(--text-secondary)]">Manage your course offerings</p>
      </div>

      {loading ? (
        <p className="text-center text-[var(--text-secondary)] py-12">Loading...</p>
      ) : (
        <div className="space-y-4">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card p-4 md:p-6"
            >
              {editingId === course.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)]"
                  />
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)] resize-none"
                    rows={2}
                  />
                  <div className="flex gap-2">
                    <button onClick={() => handleUpdate(course.id)} className="px-3 py-1 text-xs rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20">Save</button>
                    <button onClick={() => setEditingId(null)} className="px-3 py-1 text-xs rounded-lg bg-gray-500/10 text-gray-500 hover:bg-gray-500/20">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{course.icon}</span>
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)]">{course.name}</h3>
                      <p className="text-sm text-[var(--text-secondary)]">{course.description}</p>
                      <span className="text-xs text-[var(--gold)]">{course.classes}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingId(course.id);
                        setEditForm({ name: course.name, description: course.description, classes: course.classes });
                      }}
                      className="px-3 py-1 text-xs rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => toggleActive(course.id, course.active)}
                      className={`px-3 py-1 text-xs rounded-lg ${
                        course.active ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                      }`}
                    >
                      {course.active ? 'Active' : 'Inactive'}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
