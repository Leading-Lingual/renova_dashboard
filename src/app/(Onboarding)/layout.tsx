"use client";
import { YellowStrokes } from "@/assets/YellowStrokes";
import Image from "next/image";
import Logo1 from "@/assets/logo-white.svg";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/actions/user/user.query";
import { Loader2 } from "lucide-react";

const OnboardingLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isFetching } = useQuery(getUserProfile);

  return isFetching ? (
    <Loader2 className="animate-spin m-auto" />
  ) : (
    <div className="flex w-full min-h-screen h-full relative bg-cover bg-center bg-no-repeat bg-white md:bg-[url('/background-img.png')] overflow-hidden ">
      <div className="bg-[#01240BCC] hidden md:block absolute inset-0"></div>
      <Image
        src={Logo1}
        alt="logo"
        className="hidden lg:block absolute top-12 left-20"
      />
      <main className="flex h-full overflow-hidden px-4 py-8 md:py-12 md:px-20 z-10 w-full">
        {children}
      </main>
      <YellowStrokes className="absolute bottom-0 left-7 hidden md:block" />
    </div>
  );
};

export default OnboardingLayout;
