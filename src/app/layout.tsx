import type { Metadata } from 'next';
import { Poppins, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rahardi Salim - Data Science & AI Engineer',
  description: 'Portfolio of Rahardi Salim, Data Science & AI Engineer specializing in machine learning, NLP, and computer vision.',
  keywords: ['Data Science', 'Machine Learning', 'AI', 'NLP', 'Computer Vision', 'Portfolio'],
  authors: [{ name: 'Rahardi Salim' }],
  openGraph: {
    title: 'Rahardi Salim - Data Science & AI Engineer',
    description: 'Portfolio showcasing projects in machine learning, data science, and artificial intelligence.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans dark:bg-gray-900 dark:text-white">
        {children}
      </body>
    </html>
  );
}
