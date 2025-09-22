import '~/styles/global.css'
import '~/styles/prism-okaidia.css'
import { Montserrat } from 'next/font/google';

import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'

const montserrat = Montserrat({
  weight: '500',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export default async function RootLayout( { children }: {
  children: React.ReactNode;
}) {

  const locale = await getLocale();

  const messages = await getMessages();

  return (
    <html lang={locale} className={montserrat.className}>
      <body>
        <main>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            themes={['dark', 'light']}
            attribute="class"
            defaultTheme="dark"
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
        </main>
      </body>
    </html>
  )
}
