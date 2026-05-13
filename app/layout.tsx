import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome · Personal Portfolio",
  description: "Personal portfolio and contact APIs (Next.js).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
