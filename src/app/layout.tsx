import '@/styles/globals.css';
import { cn } from '@/lib/utils';
import { aclonica, roboto, saraban } from '@/styles/font';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'antialiased',
          roboto.variable,
          saraban.variable,
          aclonica.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
