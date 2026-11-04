import type { Metadata } from 'next';
import './globals.css';
import AuthProvider from '@/components/AuthProvider';

export const metadata: Metadata = {
  title: 'SIRDILUM ALUMINUM FITTINGS NIG ENTERPRISE | Precision Architectural Fabrication & Building Materials',
  description: 'Corporate Affairs Commission (CAC) Registered Enterprise (CRBN 716623). Top-grade architectural aluminum fittings, roofing systems, casement windows, sliding doors, toilet cubicles, glass railings, and interior cladding in Ikorodu, Lagos, Nigeria.',
  keywords: [
    'Aluminum fittings Lagos',
    'SIRDILUM ALUMINUM',
    'Ikorodu aluminum fabrication',
    'Casement windows Lagos',
    'Sliding doors Nigeria',
    'Toilet cubicles Lagos',
    'Frameless glass doors',
    'Glass railings balustrades',
    'Aluminum roofing sheets',
    'CAC CRBN 716623'
  ],
  authors: [{ name: 'SIRDILUM ALUMINUM FITTINGS NIG ENTERPRISE' }],
  icons: {
    icon: '/assets/images/sirdilum-official-logo.jpg',
    apple: '/assets/images/sirdilum-official-logo.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
