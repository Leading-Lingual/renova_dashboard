import Image from "next/image";
import image from "../../../public/howItWorksImage.png"

const steps = [
  {
    title: "Create an account",
    description:
      "Choose the role that fits you - list, collect, buy, or recycle.",
  },
  {
    title: "List and discover materials",
    description:
      "Post what you have, or browse listings by type, quantity, and location near you.",
  },
  {
    title: "Match and connect",
    description:
      "Renova matches listings with the right collector or buyer based on price, material, and proximity.",
  },
  {
    title: "Collection and verification",
    description:
      "Materials are weighed, graded, and verified at pickup so every party can trust the numbers.",
  },
  {
    title: "Payments and rewards",
    description:
      "Funds are released instantly once collection is confirmed - no chasing payment.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute -right-36.25 -top-73 size-133.5">
        <div className="rounded-full size-133.5 bg-accent-strong/30"></div>
      </div>

      <div className="relative mx-auto max-w-360 px-6 pb-20 pt-21.5 sm:px-10 lg:px-20 lg:pb-23.75 lg:pt-30">
        <div className="mx-auto flex w-full max-w-157.5 flex-col items-center gap-1 text-center">
          <div className="flex items-center justify-center rounded-full bg-surface-subtle px-4 py-2">
            <span className="text-sm font-bold leading-normal text-product-700">
              THE PROCESS
            </span>
          </div>
          <div className="flex w-full flex-col items-center gap-4 text-ink">
            <h2 className="text-4xl font-bold leading-normal tracking-[-0.64px]">
              How Renova Works
            </h2>
            <p className="text-base leading-6">
              Five steps take a material from your doorstep to a verified buyer
              - with every stage tracked and priced transparently.
            </p>
          </div>
        </div>

        <div className="mt-12 grid items-start gap-14 lg:grid-cols-[1fr_1fr] lg:gap-40">
          <div className="mx-auto w-full max-w-130.5">
            <div className="relative w-full pb-[115%]">
              <div className="absolute left-[12%] top-[19%] h-[90%] w-[98%] rounded-lg border-8 border-accent-strong" />
              <div className="absolute inset-x-0 top-0 h-full overflow-hidden">
                <Image
                  src={image}
                  alt="Renova recycling process"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            {steps.map((step, index) => (
              <div key={step.title} className="grid grid-cols-[48px_1fr] gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-product-500 p-2.5">
                    <span className="text-center text-xl font-bold leading-normal tracking-[-0.4px] text-white">
                      {index + 1}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="my-2 h-20 w-0.5 bg-product-400" />
                  )}
                </div>

                <div className="pt-0.5">
                  <p className="text-base font-bold leading-6 text-ink-muted">
                    Step {index + 1}:
                  </p>
                  <h3 className="text-2xl font-bold leading-normal text-ink">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-normal text-ink">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
