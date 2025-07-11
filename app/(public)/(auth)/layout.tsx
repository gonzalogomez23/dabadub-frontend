import Image from "next/image"
import Link from "next/link"

export default function AuthLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {

    return (
        <div className="relative w-dvw h-dvh flex items-center justify-center">
            <div className="absolute left-[50%] top-[40%] translate-x-[-50%] translate-y-[-50%] w-[500px] max-w-full aspect-square rounded-full bg-light1 blur-2xl opacity-60 z-0"></div>
            <div className="relative flex min-h-dvh w-full flex-col items-center justify-center gap-8 p-4 z-10">
                <Link href="/">
                    <Image
                        src="/dabadub-box.svg"
                        alt="Dabadub logo"
                        width={0}
                        height={0}
                        className="w-36 h-auto relative z-10"
                        priority
                    />
                </Link>
                {children}
            </div>
        </div>
    )
}