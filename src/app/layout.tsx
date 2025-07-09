/* eslint-disable react/react-in-jsx-scope */
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import './global.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto'
})

export const metadata: Metadata = {
  title: 'SmartATS - Resume Builder That Actually Gets You Hired',
  description: '95% of resumes get rejected by ATS bots. Our AI ensures yours makes it to human eyes.',
  keywords: ['resume builder', 'ATS optimization', 'job search', 'career', 'AI resume'],
  authors: [{ name: 'SmartATS Team' }],
  creator: 'SmartATS',
  publisher: 'SmartATS',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://smartats.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SmartATS - Resume Builder That Actually Gets You Hired',
    description: '95% of resumes get rejected by ATS bots. Our AI ensures yours makes it to human eyes.',
    url: 'https://smartats.com',
    siteName: 'SmartATS',
    images: [
      {
        url: '/horse-logo.png',
        width: 1200,
        height: 630,
        alt: 'SmartATS - Beat the ATS, Get the Job',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmartATS - Resume Builder That Actually Gets You Hired',
    description: '95% of resumes get rejected by ATS bots. Our AI ensures yours makes it to human eyes.',
    images: ['/horse-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Google Analytics
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
        <script async src="https://js.stripe.com/v3/"></script>
      </head>
      <body className={`${inter.className} ${roboto.variable}`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
