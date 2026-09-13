import OutlineVerifiedIcon from '@iconify-react/ic/outline-verified';
import MoneyIcon from '@iconify-react/mdi/money';
import SecureOutlineIcon from '@iconify-react/mdi/secure-outline';
import HandPackageOutlineIcon from '@iconify-react/material-symbols/hand-package-outline';
import MapPinLineIcon from '@iconify-react/mingcute/map-pin-line';
import EnergyProgramTimeUsedOutlineIcon from '@iconify-react/material-symbols/energy-program-time-used-outline';

const benefits = [
  {
    title: "Verified Ecosystem",
    description:
      "Every collector, buyer, and recycler is identity-verified before they can transact.",
    icon: OutlineVerifiedIcon,
  },
  {
    title: "Transparent Pricing",
    description:
      "Live market prices for every material, with no hidden fees or negotiation games.",
    icon: MoneyIcon,
  },
  {
    title: "Secure Payments",
    description:
      "Payments are held and released automatically once a pickup is confirmed.",
    icon: SecureOutlineIcon,
  },
  {
    title: "Convenient Collection",
    description:
      "Schedule a pickup in minutes and track your collector on the way",
    icon: HandPackageOutlineIcon,
  },
  {
    title: "Real-Time Tracking",
    description:
      "Follow every listing from pickup to payment with live status updates",
    icon: MapPinLineIcon,
  },
  {
    title: "Sustainability Impact",
    description:
      "See the carbon and landfill impact of every material you recover.",
    icon: EnergyProgramTimeUsedOutlineIcon,
  },
];

export default function WhyRenova() {
  return (
    <section id="why-renova" className="bg-surface">
      <div className="mx-auto w-full max-w-360 px-6 pb-23.5 pt-33 sm:px-10 lg:px-20">
        <div className="mx-auto flex w-full max-w-157.5 flex-col items-center gap-1 text-center">
          <div className="rounded-full bg-surface-subtle px-4 py-2">
            <span className="text-sm font-bold leading-normal text-product-700">
              WHY RENOVA
            </span>
          </div>

          <div className="flex w-full flex-col items-center gap-4 text-ink">
            <h2 className="w-full text-section-title font-bold leading-normal tracking-section-title">
              Why Choose Renova?
            </h2>
            <p className="w-full text-base leading-6">
              Why should you ever think of choosing Renova
            </p>
          </div>
        </div>

        <div className="mt-30 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="flex min-h-31.25 flex-col items-center gap-5.5 rounded-2xl bg-surface-subtle p-4 text-center"
            >
              <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-product p-3">
                <benefit.icon className="size-6 text-white" />
              </div>

              <div className="flex w-full flex-col items-center gap-2 text-ink-strong">
                <h3 className="w-full text-base font-bold leading-6">
                  {benefit.title}
                </h3>
                <p className="w-full text-sm leading-normal">
                  {benefit.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
