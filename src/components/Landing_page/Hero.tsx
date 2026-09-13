import Image from "next/image";
import phone from "../../../public/Phone.svg"
import LandingPageButton from "./LandingPageButton";

export default function Hero() {
  return (
    <section className="overflow-hidden bg-surface">
      <div className="mx-auto flex w-full max-w-340 items-center p-6  lg:p-15">
        <div className="grid w-full grid-cols-1 items-center gap-14 lg:hero-grid lg:justify-between">
          <div className="flex flex-col gap-10 lg:gap-15.75">
            <div className="flex flex-col">
              <div className="mb-4 flex w-fit items-center justify-center gap-4 rounded-full bg-surface-subtle px-4 py-2">
                <span className="size-6 shrink-0 rounded-full border-6 border-product bg-surface" />
                <span className="text-xl font-bold leading-6 tracking-tight text-product-700">
                  Digital Recycling Ecosystem
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="text-display-mobile font-bold leading-display tracking-hero sm:text-display-tablet lg:text-display lg:leading-normal">
                  Turn Your <span className="text-product">Waste</span> Into{" "}
                  <span className="text-product">Value</span>. Create Measurable
                  Impact.
                </h1>
                <p className="max-w-157.5 text-base leading-6">
                  Renova connects individuals, businesses, collectors,
                  recyclers, NGOs, and sustainability partners in one digital
                  ecosystem, transforming waste into value through seamless
                  collection, trading, recycling, and measurable environmental
                  impact.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
              <LandingPageButton href="/signup" className="flex-1">
                Get Started
              </LandingPageButton>
              <LandingPageButton href="#marketplace" variant="outline" className="flex-1">
                Explore Marketplace
              </LandingPageButton>
            </div>
          </div>
              <Image
                src={phone}
                alt="Renova mobile application"
                
                className="h-125 lg:h-full w-full "
                unoptimized
              />
        </div>
      </div>
    </section>
  );
}
