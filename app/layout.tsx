import type { Metadata } from 'next';
import { Noto_Sans_KR as FontSans } from 'next/font/google';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

import '@/styles/globals.css';
import { cn } from '@/lib/utils';

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
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div
          className={cn(
            'flex min-h-dvh w-full justify-center bg-background font-sans antialiased',
            fontSans.variable,
          )}
        >
          {children}
        </div>
        <Toaster position="bottom-center" containerClassName="mb-16" />
      </body>
    </html>
  );
}
