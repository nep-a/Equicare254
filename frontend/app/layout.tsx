import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Equicare - Clinical Engineering Management System',
  description: 'Enterprise platform for managing medical equipment lifecycles, maintenance, and clinical engineering operations.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
