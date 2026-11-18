import Heading from "@/components/Heading";
import Pill from "@/components/Pill";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Kyc = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-10 flex-1">
      <Heading
        title="Complete KYC"
        subtitle="Keep your account safe by completing these checks"
      />
      <div className="flex flex-col gap-6">
        <div
          onClick={() => router.push("/account/verify-identity")}
          className="flex px-4 items-center justify-between border rounded-[8px] gap-1 py-3 cursor-pointer"
        >
          <Heading
            title="Verify your Identity"
            subtitle="Identity verification is a must"
            containerClass="w-fit!"
          />
          <Pill variant="grey">Not started</Pill>
          <ChevronRight />
        </div>
        <div
          onClick={() => router.push("/account/verify-address")}
          className="flex px-4 items-center justify-between border rounded-[8px] gap-1 py-3 cursor-pointer"
        >
          <Heading
            title="Verify your Address"
            subtitle="Address verification is a must"
            containerClass="w-fit!"
          />
          <Pill variant="grey">Not started</Pill>
          <ChevronRight />
        </div>
      </div>
    </div>
  );
};

export default Kyc;
