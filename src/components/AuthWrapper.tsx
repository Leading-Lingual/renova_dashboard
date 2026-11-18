"use client";
import Image from "next/image";
import Logo1 from "@/assets/logo.png";
import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const AuthWrapper = ({
  children,
  text,
  subtext,
  useFullScreen,
}: {
  children: ReactNode;
  text?: string;
  subtext?: string;
  useFullScreen?: boolean;
}) => {
  const isFullScreen = useFullScreen || (!text && !subtext);
  return (
    <div
      className={`flex h-full w-full overflow-auto gap-7.75 p-4 md:py-12 md:px-20 py-10 md:p-0 2xl:justify-center 2xl:max-h-212.5 2xl:m-auto ${isFullScreen ? "flex-col" : "flex-col md:flex-row"}`}
    >
      {isFullScreen ? (
        <Image src={Logo1} alt="logo" className="hidden lg:block w-34.75" />
      ) : (
        <div className="hidden lg:flex flex-col max-w-133.75 w-full text-white h-full">
          <div className="flex items-center justify-between">
            <Image src={Logo1} alt="logo" className="w-34.75" />
            <Link href={"/"} className="flex">
              <ArrowLeft />
              <p>Back to Home</p>
            </Link>
          </div>
          <div className="h-full flex justify-between items-center">
            <div className="flex flex-col gap-4 ">
              <p className="text-h4-l-semibold">{text}</p>
              <p className="text-l-regular">{subtext}</p>
            </div>
          </div>
        </div>
      )}
      <Image src={Logo1} alt="logo" className="md:hidden ml-auto w-21.5" />

      <div
        className={`w-full h-full ${isFullScreen ? "m-auto overflow-auto flex-1 max-w-178.5" : "2xl:max-w-178.5"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default AuthWrapper;
