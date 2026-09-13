import Image from "next/image";
import RocketLaunchOutlineIcon from '@iconify-react/material-symbols/rocket-launch-outline';
import lineDiagonal from "../../../public/Line.svg"

const nodes = [
  { label: "Individuals", className: "left-1/2 top-0 -translate-x-1/2" },
  { label: "Buyers", className: "right-0 top-[8.9%]" },
  { label: "Businesses", className: "right-[-1.5%] top-1/2 -translate-y-1/2" },
  { label: "Recyclers", className: "right-0 bottom-[8.9%]" },
  { label: "Collectors", className: "left-1/2 bottom-0 -translate-x-1/2" },
  { label: "Partners", className: "left-0 bottom-[8.9%]" },
  { label: "NGO", className: "left-[-1.5%] top-1/2 -translate-y-1/2" },
  { label: "Volunters", className: "left-0 top-[8.9%]" },
];

function Participant({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <div className={`absolute flex w-15.25 flex-col items-center ${className}`}>
      <div className="flex items-center rounded-full bg-surface-subtle p-2.5">
        <RocketLaunchOutlineIcon className="size-6 text-product"/>
      </div>
      <span className="whitespace-nowrap text-center text-sm font-medium leading-normal text-ink">
        {label}
      </span>
    </div>
  );
}

export default function WhatIsRenova() {
  return (
    <section
      id="about"
      className="relative min-h-155 overflow-hidden lg:p-20 bg-white"
    >
      <div className="absolute -left-48.5 -top-85 size-133.5">
        <div className="rounded-full size-133.5 bg-product-400/50"></div>
      </div>
      <div className="mx-auto grid min-h-155 w-full max-w-295 grid-cols-1 items-center gap-14 px-6 py-20 lg:grid-cols-[1fr_1fr] lg:gap-12 lg:px-0 lg:py-0">
        <div className="relative z-1 w-full max-w-130.5">
          <div className="mb-1 flex w-fit items-center justify-center rounded-full bg-surface-subtle px-4 py-2">
            <span className="text-sm font-bold leading-normal text-product-700">
              WHAT IS RENOVA
            </span>
          </div>
          <div className="flex flex-col gap-4 text-ink">
            <h2 className="text-4xl font-bold leading-normal tracking-[-0.64px]">
              A complete circular economy ecosystem
            </h2>
            <p className="text-base leading-6">
              Renova is more than a recycling platform. It&apos;s a digital
              ecosystem where waste generators, businesses, collectors, buyers,
              recyclers, NGOs, volunteers, and environmental partners
              collaborate to recover resources, create economic opportunities,
              and drive environmental change.
            </p>
            <p className="text-base leading-6">
              Every action - a listing, a pickup, a campaign, a donation - flows
              through one transparent hub, turning individual effort into
              measurable collective impact.
            </p>
          </div>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-154">
          <Image
            src={lineDiagonal}
            alt=""
            width={1}
            height={1}
            className="absolute left-[11%] top-1/2 w-[23%] -translate-y-1/2"
            unoptimized
          />
          <Image
            src={lineDiagonal}
            alt=""
            width={1}
            height={1}
            className="absolute right-[11%] top-1/2 w-[23%] -translate-y-1/2 rotate-180"
            unoptimized
          />
          <Image
            src={lineDiagonal}
            alt=""
            width={1}
            height={1}
            className="absolute left-12.5 top-[40%] w-[28%] rotate-45 origin-right"
            unoptimized
          />
          <Image
            src={lineDiagonal}
            alt=""
            width={1}
            height={1}
            className="absolute right-12.5 top-[40%] w-[23%] -rotate-45 origin-left"
            unoptimized
          />
          <Image
            src={lineDiagonal}
            alt=""
            width={1}
            height={1}
            className="absolute bottom-[20%] right-[20%] w-[23%] rotate-45 origin-right"
            unoptimized
          />
          <Image
            src={lineDiagonal}
            alt=""
            width={1}
            height={1}
            className="absolute bottom-[19%] left-[18%] w-[23%] -rotate-45 origin-left"
            unoptimized
          />
          <Image
            src={lineDiagonal}
            alt=""
            width={1}
            height={1}
            className="absolute right-[38%] top-[25%] w-[23%] rotate-90 origin-center"
            unoptimized
          />
          <Image
            src={lineDiagonal}
            alt=""
            width={1}
            height={1}
            className="absolute bottom-[25%] right-[38%] w-[23%] rotate-90 origin-center"
            unoptimized
          />
          <div className="absolute left-1/2 top-1/2 flex size-35 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-product p-2.5">
            <span className="text-2xl font-bold leading-normal tracking-[-0.48px] text-white">
              RENOVA
            </span>
          </div>
          {nodes.map((node) => (
            <Participant key={node.label} {...node} />
          ))}
        </div>
      </div>
    </section>
  );
}
