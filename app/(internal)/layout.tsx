import Header from "@components/Header";

export default function InternalLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header  className="font-sans"/>
      <main className="font-sans">{children}</main>
    </>
  );
}
