import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const title = "Kamlesh Kumar — AI Engineer & Tech Lead";
const description =
  "Kamlesh Kumar builds AI-native products — LLM applications, RAG pipelines and agentic workflows — on top of a decade of web and blockchain engineering. Creator of ForgeLearn, SecureEnv, RoastMyProd and a suite of free developer tools.";

export const metadata = {
  title,
  description,
  authors: [{ name: "Kamlesh Kumar", url: "https://pro.kaundal.vip" }],
  creator: "Kamlesh Kumar",
  keywords: [
    "Kamlesh Kumar",
    "k-kaundal",
    "AI Engineer",
    "LLM Developer",
    "RAG",
    "AI Agents",
    "Tech Lead",
    "Blockchain Expert",
    "Web3",
    "Software Engineer",
    "Portfolio",
    "Open Source",
    "Next.js",
    "Tailwind CSS",
    "TypeScript",
    "pro.kaundal.vip",
    "free developer tools",
    "forgelearn.dev",
    "secureenv.in",
    "roastmyprod.com",
    "kaundal.vip",
  ],
  openGraph: {
    title,
    description,
    url: "https://pro.kaundal.vip",
    siteName: "Kamlesh Kumar Portfolio",
    images: [
      {
        url: "https://pro.kaundal.vip/kaundal.jpg",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@k_k_kaundal",
    creator: "@k_k_kaundal",
    title,
    description,
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
    <html lang="en" suppressHydrationWarning>
   <head>
    <meta name="google-site-verification" content="4QvZxunc8BdTDPoVCdMLH0gXxqbcSCsgPFWtnv7Sl4E" />
    {/*
      Applies the saved theme before first paint. Without this the page
      renders light, then flips on hydration.
    */}
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark'){document.documentElement.classList.add('dark');}document.documentElement.style.colorScheme=t;}catch(e){}})();`,
      }}
    />
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
