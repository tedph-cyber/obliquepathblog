import type { Metadata } from "next";
import { Inter, Poppins, Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TechBackground } from "@/components/tech-background";
import { MouseSpotlight } from "@/components/mouse-spotlight";
import { FloatingElements } from "@/components/floating-elements";
import { ScrollWatcher } from "@/components/scroll-watcher";
import { ThemeToggle } from "@/components/theme-toggle";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Oblique Path Blog",
  description: "Oblique Path's blog - insights on automation, web development, and modern tech.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} ${firaCode.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Background Effects Layer */}
          <TechBackground variant="particles" density="medium" opacity={0.05} interactive />
          <MouseSpotlight size={400} opacity={0.07} />
          <FloatingElements count={6} variant="mixed" />
          
          {/* Content Layer */}
          <main className="relative z-10 min-h-screen">
            {children}
          </main>
          
          {/* UI Overlays */}
          <ScrollWatcher 
            showProgress 
            showScrollToTop 
            showPercentage
            progressPosition="top"
            scrollToTopThreshold={300}
          />
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
