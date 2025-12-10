import '~/styles/global.css'
import '~/styles/prism-okaidia.css'
import { Montserrat } from 'next/font/google';


import {getLocale, getMessages} from "next-intl/server";
import {NextIntlClientProvider} from "next-intl";

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
    <html lang={locale}>
      <body className={montserrat.variable}>
        <main>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        </main>
      </body>
    </html>
  )
}
