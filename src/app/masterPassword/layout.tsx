import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DuoPass",
  description: "Password Manager",
};

export default function PlainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-gradient-to-br from-gray-900 via-slate-800 to-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}
