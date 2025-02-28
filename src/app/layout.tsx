import '~/styles/global.css'
import '~/styles/prism-okaidia.css'

import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'

export default async function RootLayout( { children }: {
  children: React.ReactNode;
}) {

  const locale = await getLocale();

  const messages = await getMessages();

  return (
    <html lang={locale}>
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
