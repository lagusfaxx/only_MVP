import type { Metadata } from "next";
export const metadata: Metadata = { title: "Only MVP" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html><body>{children}</body></html>;
}
