import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo2.png";
import FacebookFillIcon from "@iconify-react/ri/facebook-fill";
import InstagramIcon from "@iconify-react/mdi/instagram";
import LinkedinSolidIcon from "@iconify-react/basil/linkedin-solid";
import TwitterXLineIcon from '@iconify-react/ri/twitter-x-line';

const linkGroups = [
  {
    title: "Company",
    links: [{ title: "About", link: "#about" }, { title: "Partners" }],
  },
  {
    title: "Resources",
    links: [{ title: "FAQs" }, { title: "Blog" }, { title: "Help Center" }],
  },
  {
    title: "Legal",
    links: [{ title: "Privacy" }, { title: "Terms & Condition" }],
  },
];

const socials = [
  { label: "Twitter", src: TwitterXLineIcon },
  { label: "Facebook", src: FacebookFillIcon },
  { label: "Instagram", src: InstagramIcon, link:"https://www.instagram.com/renova.africa/" },
  { label: "LinkedIn", src: LinkedinSolidIcon },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-product-800 text-white">
      <div className="mx-auto min-h-172.5 w-full max-w-360 px-6 pb-10 pt-22 sm:px-10 lg:px-20 lg:pt-29.5">
        <div className="grid grid-cols-1 gap-12 lg:gap-20 md:grid-cols-[305px_1fr] lg:grid-cols-[305px_1fr_1fr_1fr] lg:justify-between">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center gap-2"
              aria-label="Renova home"
            >
              <Image src={logo} alt="logo" unoptimized />
            </Link>

            <p className="max-w-76.25 text-base leading-normal">
              A transparent marketplace connecting individuals, businesses,
              collectors, buyers, and recyclers to a cleaner future.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-3 lg:grid-cols-3">
            {linkGroups.map((group) => (
              <div key={group.title} className="flex flex-col gap-5">
                <h2 className="text-base font-bold leading-normal">
                  {group.title}
                </h2>
                <nav className="flex flex-col gap-3 text-sm leading-normal">
                  {group.links.map((link) => (
                    <Link
                      key={link.title}
                      href={link.link ?? "#"}
                      className="transition-opacity hover:opacity-70"
                    >
                      {link.title}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-45 h-0.5 w-full bg-product-200" />

        <div className="mt-18 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-base leading-normal">
            © 2026 Renova. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {socials.map((social) => (
              <Link
                key={social.label}
                href={social.link ?? "#"}
                aria-label={social.label}
                className="flex size-8 items-center justify-center rounded-full border border-surface-subtle transition-opacity hover:opacity-70"
              >
                <social.src className="size-5 text-white" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
