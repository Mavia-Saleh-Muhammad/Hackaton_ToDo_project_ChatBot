import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider } from '../components/providers/ThemeProvider';
import { ToastProvider } from '../components/ui/Toast';
import { ChatProvider, ChatButton, ChatPanel } from '../components/chatbot';

// Configure Inter font with all required weights (T009)
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'The Evolution of Todo',
  description: 'A flagship todo application with AI-powered task management and premium design',
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider defaultTheme="system">
          <AuthProvider>
            <ToastProvider>
              <ChatProvider>
                {children}
                {/* AI Chatbot floating button and panel */}
                <ChatButton />
                <ChatPanel />
              </ChatProvider>
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
