import PrimaryButton from "@/app/components/PrimaryButton";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <Image
            className="mx-auto w-44 h-auto"
            src="/dabadub-box.svg"
            alt="Dabadub logo"
            width={0}
            height={0}
            priority
        />
        {/* <Link href="/posts" className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-primary hover:bg-secondary text-background gap-2 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto">Posts</Link> */}
        <Link href="/posts">
          <PrimaryButton>
            Posts
          </PrimaryButton>
        </Link>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
