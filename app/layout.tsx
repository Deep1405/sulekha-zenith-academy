import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

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
  description: 'Sulekha Zenith Academy - A nurturing home-based learning environment by Ruma Nath. Quality education with personal attention for students from Class I to X in Rajpur Sonarpur, West Bengal.',
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
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
