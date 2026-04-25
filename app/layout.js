import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://mamun-hossain.vercel.app"),
  title: "Mamun Hossain - Full Stack Web Developer",
  description:
    "Mamun Hossain is a Full-Stack Web Developer building scalable, high-performance web applications with React, Next.js, and Node.js.",
  keywords: [
    "Mamun Hossain",
    "Full Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "Prisma",
    "MongoDB",
    "Firebase",
    "Portfolio",
    "Bangladesh",
    "JavaScript",
    "MERN Stack",
    "Frontend",
    "Backend",
    "SEO",
    "Web Application",
  ],
  openGraph: {
    title: "Mamun Hossain - Full Stack Web Developer",
    description:
      "Full-Stack Web Developer building scalable, high-performance web applications with React, Next.js, and Node.js.",
    url: "https://mamun-hossain.vercel.app",
    siteName: "Mamun Hossain's Portfolio",
    images: [
      {
        url: "/images/mamun.jpg",
        width: 800,
        height: 600,
      },
      {
        url: "/images/mamun.jpg",
        width: 1800,
        height: 1600,
        alt: "Mamun Hossain Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mamun Hossain - Full Stack Web Developer",
    description:
      "Full-Stack Web Developer building scalable, high-performance web applications with React, Next.js, and Node.js.",
    images: ["/images/mamun.jpg"],
  },
};

export default function RootLayout({ children }) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <head>
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
