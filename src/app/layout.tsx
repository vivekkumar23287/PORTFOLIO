import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vivek Kumar — Developer Portfolio",
  description:
    "Full Stack Developer crafting elegant digital experiences with clean code, thoughtful design, and a passion for bringing ideas to life.",
  keywords: [
    "Vivek Kumar",
    "Developer",
    "Portfolio",
    "Full Stack",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Vivek Kumar" }],
  openGraph: {
    title: "Vivek Kumar — Developer Portfolio",
    description:
      "Full Stack Developer crafting elegant digital experiences.",
    type: "website",
  },
  icons: {
    icon: "/images/Vivek Kumar Logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#09090b" />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen"
        style={{
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        }}
      >
        {/* Prevent flash of unstyled content */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('portfolio-theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
