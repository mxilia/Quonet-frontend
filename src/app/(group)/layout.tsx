import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NavbarLayout } from "./_components/navbar-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

const AuthorizedLayout = ({ children, }: Readonly<{ children: React.ReactNode; }>) => {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NavbarLayout>
          { children }
        </NavbarLayout>
      </body>
    </html>
  );
}

export default AuthorizedLayout;