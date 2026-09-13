import RocketLaunchOutlineIcon from '@iconify-react/material-symbols/rocket-launch-outline';
import CheckFillIcon from '@iconify-react/mingcute/check-fill';

type Role = {
  title: string;
  description: string;
  features: string[];
};

const roles: Role[] = [
  {
    title: "Individuals",
    description:
      "Turn recyclables into income. Source verified recyclable materials.",
    features: [
      "List Waste",
      "Request pickup",
      "Marketplace access",
      "Bulk purchasing",
      "Track earning",
      "Sustainability reporting",
    ],
  },
  {
    title: "Businesses",
    description:
      "Manage waste efficiently. connect with reliable buyers/seller.",
    features: [
      "Bulk listings",
      "Bulk purchasing",
      "Collection scheduling",
      "Marketplace access",
      "Track earning",
      "Sustainability reporting",
    ],
  },
  {
    title: "Collectors",
    description: "Find recyclable materials and earn from collection.",
    features: [
      "Pickup request",
      "Route management",
      "Earnings dashboard",
      "Sustainability reporting",
    ],
  },
  {
    title: "NGOs",
    description: "Launch and manage sustainability initiatives.",
    features: [
      "Campaign creation",
      "Donations & sponsorship",
      "Impact tracking",
      "Sustainability reporting",
    ],
  },
];

function RoleCard({ title, description, features }: Role) {
  return (
    <article className="flex min-w-0 flex-1 flex-col gap-5.5 rounded-2xl bg-surface-subtle p-4">
      <div className="flex size-12 items-center justify-center rounded-full bg-product p-2.5">
        <RocketLaunchOutlineIcon className="size-6 text-white"/>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-base font-bold leading-6 text-ink-strong">
          {title}
        </h3>
        <p className="text-sm leading-normal text-ink-strong">{description}</p>
      </div>

      <ul className="flex flex-col gap-2">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <CheckFillIcon className="size-4 shrink-0 text-product"/>
            <span className="text-sm leading-normal text-ink-strong">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function BuiltForEveryRole() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-360 px-6 pb-7.5 pt-23.5 sm:px-10 lg:px-20">
        <div className="mx-auto flex w-full max-w-157.5 flex-col items-center gap-1 text-center">
          <div className="rounded-full bg-surface-subtle px-4 py-2">
            <span className="text-sm font-bold leading-normal text-product-700">
              BUILT FOR EVERY ROLE
            </span>
          </div>

          <div className="flex w-full flex-col items-center gap-4 text-ink">
            <h2 className="text-section-title font-bold leading-normal tracking-section-title">
              Designed for Everyone in the Loop
            </h2>
            <p className="text-base leading-6">
              Whether you&apos;re clearing out recyclables or sourcing them at scale,
              Renova has a workflow built for you.Whichever role you play in the
              circular economy, Renova gives you the tools to act.
            </p>
          </div>
        </div>

        <div className="mt-18 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((role) => (
            <RoleCard key={role.title} {...role} />
          ))}
        </div>
      </div>
    </section>
  );
}
