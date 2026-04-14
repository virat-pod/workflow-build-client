import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SessionWrapper from "@/components/auth/sessionWrapper";
import Copilot from "@/components/wrapper/copilot";
import { NotificationProvider } from "@/lib/contexts/serviceContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Workflow Builder | Automate works",
  description: "Workflows Builder based on automate work with gamify function",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SessionWrapper>
          <NotificationProvider>
            <Navbar />
            <div className="min-h-[80vh]">
              <Copilot>{children}</Copilot>
            </div>
            <Footer />
          </NotificationProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
