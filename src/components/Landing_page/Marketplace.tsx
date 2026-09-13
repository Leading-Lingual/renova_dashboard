import Image, { StaticImageData } from "next/image";
import SharpStarRateIcon from '@iconify-react/ic/sharp-star-rate';
import petBottles from "../../../public/Image1.png"
import aluminiumCans  from "../../../public/Image2.png"
import electronicWaste from "../../../public/Image3.png"
import cardboard  from "../../../public/Image4.png"
import NairaIcon from '@iconify-react/mdi/naira';
import LandingPageButton from "./LandingPageButton";

const listings = [
  { name: "Pet Bottles", seller: "Demola", image: petBottles },
  { name: "Aluminium Cans", seller: "Yusuf", image: aluminiumCans },
  { name: "Electronic Waste", seller: "Charity", image: electronicWaste },
  { name: "Cardboard", seller: "Faith", image: cardboard },
];

function ListingCard({
  name,
  seller,
  image,
}: {
  name: string;
  seller: string;
  image: StaticImageData;
}) {
  return (
    <article className="relative flex flex-col gap-5.5 rounded-2xl bg-surface p-4 shadow-[0_1px_2px_rgba(12,12,13,0.1),0_1px_2px_rgba(12,12,13,0.05)]">
      <div className="relative h-39.75 w-full overflow-hidden rounded-lg bg-surface-card">
        <Image src={image} alt={name} fill className="object-cover" unoptimized />
        <span className="absolute right-2 top-2 rounded-full bg-product px-2.5 py-1 text-xs font-medium leading-normal text-white">
          In Stock
        </span>
      </div>

      <div className="flex w-full flex-col gap-1 text-ink-strong">
        <h3 className="w-full text-base font-bold leading-6">{name}</h3>
        <div className="flex w-full gap-2 text-xs leading-normal">
          <span className="flex-1">2,440 KG</span>
          <span className="flex-1">Lagos, NG</span>
          <span className="flex-1">By {seller}</span>
        </div>
      </div>

      <div className="flex w-full items-center justify-between">
        <div className="flex flex-1 items-center gap-1">
          <NairaIcon className="size-4 text-product" />
          <span className="text-sm font-bold leading-normal text-product">
            125
          </span>
          <span className="text-sm font-bold leading-normal text-product">
            /KG
          </span>
        </div>

        <div className="flex items-center gap-1">
          <SharpStarRateIcon className="size-4 text-accent"/>
          <span className="text-xs font-bold leading-normal text-ink-muted">
            4.8
          </span>
        </div>
      </div>

      <LandingPageButton size="compact" className="w-full">
        Buy Now
      </LandingPageButton>
    </article>
  );
}

export default function Marketplace() {
  return (
    <section id="marketplace" className="bg-surface">
      <div className="mx-auto w-full max-w-360 px-6 pb-7.5 pt-33 sm:px-10 lg:px-20">
        <div className="mx-auto flex w-full max-w-157.5 flex-col items-center gap-1 text-center">
          <div className="rounded-full bg-surface-subtle px-4 py-2">
            <span className="text-sm font-bold leading-normal text-product-700">
              MARKETPLACE
            </span>
          </div>

          <div className="flex w-full flex-col items-center gap-4 text-ink">
            <h2 className="w-full text-section-title font-bold leading-normal tracking-section-title">
              Buy and sell recyclable materials
            </h2>
            <p className="w-full text-base leading-6">
              A snapshot of what&apos;s on the marketplace right now. Verified
              listings with transparent pricing, live availability, and seller
              ratings.
            </p>
          </div>
        </div>

        <div className="mt-26 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {listings.map((listing) => (
            <ListingCard key={listing.name} {...listing} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <LandingPageButton className="w-full max-w-76.25">Explore Marketplace</LandingPageButton>
        </div>
      </div>
    </section>
  );
}
