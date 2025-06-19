import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Kamlesh Kumar — Tech Lead, AI & Blockchain Specialist",
  description:
    "Kamlesh Kumar is a software developer, tech lead, and open source advocate specializing in AI, Blockchain, and Web3. Explore his projects, experience, and connect for collaboration.",
  authors: [{ name: "Kamlesh Kumar", url: "https://pro.kaundal.vip" }],
  creator: "Kamlesh Kumar",
  keywords: [
    "Kamlesh Kumar",
    "k-kaundal",
    "Tech Lead",
    "AI Developer",
    "Blockchain Expert",
    "Web3",
    "Software Engineer",
    "Portfolio",
    "Open Source",
    "Next.js",
    "Tailwind CSS",
    "TypeScript",
    "pro.kaundal.vip",
    "darkevil.club",
    "solidity.today",
  ],
  openGraph: {
    title: "Kamlesh Kumar — Tech Lead, AI & Blockchain Specialist",
    description:
      "Software developer, tech lead, open source advocate. Explore projects, experience, and connect with Kamlesh Kumar.",
    url: "https://pro.kaundal.vip",
    siteName: "Kamlesh Kumar Portfolio",
    images: [
      {
        url: "https://pro.kaundal.vip/kaundal.jpg",
        width: 1200,
        height: 630,
        alt: "Kamlesh Kumar — Tech Lead, AI & Blockchain Specialist",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@k_k_kaundal",
    creator: "@k_k_kaundal",
    title: "Kamlesh Kumar — Tech Lead, AI & Blockchain Specialist",
    description:
      "Software developer, tech lead, open source advocate. Explore projects, experience, and connect with Kamlesh Kumar.",
    images: ["https://pro.kaundal.vip/kaundal.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
   <head>
    <meta name="google-site-verification" content="4QvZxunc8BdTDPoVCdMLH0gXxqbcSCsgPFWtnv7Sl4E" />
    <script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="kaundalkkz" data-description="Support me on Buy me a coffee!" data-message="" data-color="#FF5F5F" data-position="Right" data-x_margin="18" data-y_margin="18"></script>
   </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
