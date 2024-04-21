import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Noto_Sans_KR as FontSans } from 'next/font/google';

import { cn } from '@/lib/utils';
import { Toaster } from 'react-hot-toast';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Stockaca',
  description: '투자자들을 위한 주식창구',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'flex min-h-dvh w-full justify-center bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
