'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Courses from '@/components/Courses';
import WhyChooseUs from '@/components/WhyChooseUs';
import StudentSuccess from '@/components/StudentSuccess';
import Reviews from '@/components/Reviews';
import Gallery from '@/components/Gallery';
import Contact from '@/components/Contact';
import MapSection from '@/components/MapSection';
import Footer from '@/components/Footer';
import AdminLoginModal from '@/components/AdminLoginModal';
import { useState } from 'react';

export default function Home() {
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-300">
      <Header onAdminTrigger={() => setShowAdminLogin(true)} />
      <Hero />
      <About />
      <Courses />
      <WhyChooseUs />
      <StudentSuccess />
      <Reviews />
      <Gallery />
      <Contact />
      <MapSection />
      <Footer />
      <AdminLoginModal
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
      />
    </main>
  );
}
