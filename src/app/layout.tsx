import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Hazara",
  description: "Handcrafted goods, made with care.",
};

// Every page in this app is personalized (cart/session-aware), so there's no
// benefit to static prerendering — and next-auth's SessionProvider throws
// during build-time prerendering if NEXTAUTH_URL isn't set yet, which is a
// chicken-and-egg problem on a platform like Vercel that only assigns the
// deploy URL after the first successful build.
export const dynamic = "force-dynamic";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Providers>
          <Navbar />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
