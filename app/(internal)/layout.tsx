import Header from "@components/Header";

export default function InternalLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
