export default function PublicLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="font-sans">{children}</main>
    </>
  );
}
