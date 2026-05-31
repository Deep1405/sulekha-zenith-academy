import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import SmoothScroll from '@/components/SmoothScroll';
import BackToTop from '@/components/BackToTop';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sulekha Zenith Academy | Personal Guidance, Strong Foundation, Bright Future',
  description: 'Personalized home-based coaching for Classes I–XII in Rajpur Sonarpur, West Bengal. Quality education with personal attention by Ruma Nath.',
  keywords: ['Sulekha Zenith Academy', 'Coaching Centre', 'Home Tutor', 'Bengali Teacher', 'Rajpur Sonarpur Coaching', 'Classes I-XII', 'Ruma Nath', 'West Bengal', 'tuition', 'education'],
  authors: [{ name: 'Ruma Nath' }],
  metadataBase: new URL('https://sulekha-zenith-academy.vercel.app'),
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'Sulekha Zenith Academy',
    description: 'Personalized home-based coaching for Classes I–XII in Rajpur Sonarpur, West Bengal. Personal Guidance, Strong Foundation, Bright Future.',
    type: 'website',
    siteName: 'Sulekha Zenith Academy',
    images: [{ url: '/icon-512.png', width: 512, height: 512, alt: 'Sulekha Zenith Academy Logo' }],
  },
  twitter: {
    card: 'summary',
    title: 'Sulekha Zenith Academy',
    description: 'Personalized home-based coaching for Classes I–XII in Rajpur Sonarpur, West Bengal.',
    images: ['/icon-512.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <SmoothScroll>
            {children}
            <BackToTop />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
