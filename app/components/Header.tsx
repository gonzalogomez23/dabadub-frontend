import Image from "next/image"
import Link from "next/link"
import AuthArea from "./AuthArea"

const Header = ({className = ''}) => {

  return (
    <header className={`w-full flex items-center justify-between bg-zinc-50 border-b border-t border-primary/15 px-4 lg:px-12 py-4 ${className}`}>
        <div className="px-3">
            <Link href="/">
                <Image
                    src="/dabadub-logo.svg"
                    alt="Dabadub logo"
                    width={0}
                    height={0}
                    className="w-15 h-auto"
                    priority
                />
            </Link>
        </div>
        <AuthArea />
    </header>
  )
}

export default Header
