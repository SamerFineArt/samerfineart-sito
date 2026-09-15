// Root layout richiesto da Next.js: il vero <html>/<body> vive in
// app/[locale]/layout.tsx, questo passa solo i children.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
