import Header from "@components/Header";

export default function InternalLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Header  className="font-sans relative z-20"/>
        <main className="font-sans bg-zinc-100 grow relative z-20">
          <div className="w-full max-w-7xl mx-auto">{children}</div>
        </main>
    </>
  );
}
