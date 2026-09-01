import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata = {
  title: "Mamun Hossain — Backend-Focused Full Stack Developer",
  description:
    "Mamun Hossain is a backend-focused full-stack developer building event-driven, production-grade systems with Node.js, NestJS, PostgreSQL, Redis, and RabbitMQ.",
  keywords: [
    "Mamun Hossain",
    "Backend Developer",
    "Full Stack Developer",
    "Node.js",
    "NestJS",
    "PostgreSQL",
    "RabbitMQ",
    "Redis",
    "Prisma",
    "Portfolio",
    "Bangladesh",
  ],
  openGraph: {
    title: "Mamun Hossain — Backend-Focused Full Stack Developer",
    description:
      "Building event-driven, production-grade systems with Node.js, NestJS, PostgreSQL, Redis, and RabbitMQ.",
    siteName: "Mamun Hossain",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Mamun Hossain — Backend-Focused Full Stack Developer",
    description:
      "Building event-driven, production-grade systems with Node.js, NestJS, PostgreSQL, Redis, and RabbitMQ.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
