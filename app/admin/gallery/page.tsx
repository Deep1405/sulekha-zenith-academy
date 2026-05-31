'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
  created_at: string;
}

export default function GalleryAdminPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', url: '', category: 'Classroom' });

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (data) setImages(data);
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const supabase = createClient();
    const { data, error } = await supabase
      .from('gallery')
      .insert([{ ...formData, created_at: new Date().toISOString() }])
      .select();

    if (data) {
      setImages([data[0], ...images]);
      setFormData({ title: '', url: '', category: 'Classroom' });
      setShowForm(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this image?')) return;
    const supabase = createClient();
    await supabase.from('gallery').delete().eq('id', id);
    setImages(images.filter((img) => img.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-[var(--text-primary)]">Gallery</h2>
          <p className="text-[var(--text-secondary)]">Manage gallery images</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary text-sm"
        >
          {showForm ? 'Cancel' : '+ Add Image'}
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleAdd}
          className="glass-card p-6 space-y-4"
        >
          <div className="grid sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Image title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="px-4 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)]"
            />
            <input
              type="url"
              placeholder="Image URL"
              required
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="px-4 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)]"
            />
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="px-4 py-2 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--gold)]"
            >
              <option value="Classroom">Classroom</option>
              <option value="Events">Events</option>
              <option value="Achievements">Achievements</option>
              <option value="Activities">Activities</option>
            </select>
          </div>
          <button type="submit" className="btn-primary text-sm">Add Image</button>
        </motion.form>
      )}

      {/* Images Grid */}
      {loading ? (
        <p className="text-center text-[var(--text-secondary)] py-12">Loading...</p>
      ) : images.length === 0 ? (
        <div className="text-center py-12 glass-card">
          <span className="text-4xl mb-4 block">🖼️</span>
          <p className="text-[var(--text-secondary)]">No gallery images yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative group rounded-xl overflow-hidden aspect-square">
              <img src={image.url} alt={image.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
                <p className="text-white text-sm font-medium text-center">{image.title}</p>
                <p className="text-white/70 text-xs">{image.category}</p>
                <button
                  onClick={() => handleDelete(image.id)}
                  className="px-3 py-1 text-xs rounded-lg bg-red-500/80 text-white hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
