import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.svg"
import LandingPageButton from "./LandingPageButton";

export default function Nav() {
  return (
    <header className="">
      <div className="mx-auto w-full max-w-360 px-6 py-2.5 sm:px-10 lg:px-20">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="Renova home"
          >
            <Image
              src={logo}
              alt=""
              className="size-20 lg:size-auto"
              unoptimized
            />
          </Link>
          <div className="hidden items-center gap-10 text-base leading-6 md:flex">
            <Link href="/" className="font-bold tracking-button">
              Home
            </Link>
            <Link href="#about" className="hover:text-product">
              About
            </Link>
            <Link href="#recyclables" className="hover:text-product">
              Recyclables
            </Link>
          </div>
          <div className="flex items-center gap-2 md:gap-4 ">
            <LandingPageButton variant="ghost" href="/login" size="compact">
            Login
          </LandingPageButton>
            <LandingPageButton href="/signup" size="compact">
            Sign Up
          </LandingPageButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
