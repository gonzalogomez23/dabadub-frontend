import Image from "next/image"
import Link from "next/link"

const Header = () => {
  return (
    <header className="w-full flex items-center justify-between bg-white border-b border-t border-primary/15 px-12 py-6">
        <Link href="/">
            <div>
                <Image
                    src="/dabadub-logo.svg"
                    alt="Dabadub logo"
                    width={0}
                    height={0}
                    className="w-15 h-auto"
                    priority
                />
            </div>
        </Link>
    </header>
  )
}

export default Header
