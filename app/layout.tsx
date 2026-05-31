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
  description: 'Sulekha Zenith Academy - A nurturing home-based learning environment by Ruma Nath. Quality education with personal attention for students from Class I to XII in Rajpur Sonarpur, West Bengal.',
  keywords: ['tuition', 'home tuition', 'Rajpur Sonarpur', 'education', 'Ruma Nath', 'Sulekha Zenith Academy', 'West Bengal'],
  authors: [{ name: 'Ruma Nath' }],
  openGraph: {
    title: 'Sulekha Zenith Academy',
    description: 'Personal Guidance, Strong Foundation, Bright Future',
    type: 'website',
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
