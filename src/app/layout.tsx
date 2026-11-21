import { type Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Bricolage_Grotesque, Figtree } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { Toaster } from 'react-hot-toast'


const figtree = Figtree({
  variable: '--font-figtree',
  subsets: ['latin'],
})

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'be2gether',
  description: 'A social media platform for everyone',
  applicationName: 'be2gether',
  icons: { icon: '/icon.svg', apple: '/icon.svg' },
  openGraph: {
    title: 'be2gether',
    description: 'A social media platform for everyone',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${figtree.variable} ${bricolage.variable}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className='min-h-screen'>
              <Navbar />
              <main className='py-6'>
                <div className='max-w-6xl mx-auto px-4'>
                  <div className='grid grid-cols-1 lg:grid-cols-12 gap-5'>
                    <div className='hidden lg:block lg:col-span-3 lg:sticky lg:top-20 lg:self-start'>
                      <Sidebar />
                    </div>
                    <div className='lg:col-span-9'>
                      {children}
                    </div>
                  </div>
                </div>

              </main>

            </div>
            <Toaster
              toastOptions={{
                style: {
                  background: "var(--card)",
                  color: "var(--card-foreground)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                },
              }}
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}