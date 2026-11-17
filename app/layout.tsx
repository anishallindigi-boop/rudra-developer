import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Shree Rudra Developers | RERA-Approved Plots & Townships in Haryana",
    template: "%s | Shree Rudra Developers",
  },
  description:
    "Shree Rudra Developers — full-service real estate development & sales firm in Haryana. RERA-approved residential townships, modern plotted colonies aur high-growth investment opportunities.",
  keywords: [
    "Shree Rudra Developers",
    "plots in Haryana",
    "DDJAY plots Narwana",
    "residential plots Kaithal",
    "RERA approved plots",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
