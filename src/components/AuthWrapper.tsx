"use client";
import Image from "next/image";
import Logo1 from "@/assets/logo1.svg";
import { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Logo2 from "@/assets/logo2.svg";

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
      className={`flex  h-full w-full  overflow-auto gap-7.75 py-10 md:p-0 ${isFullScreen ? "flex-col" : "flex-col md:flex-row"}`}
    >
      {isFullScreen ? (
        <Image src={Logo1} alt="logo" className="hidden lg:block" />
      ) : (
        <div className="hidden lg:flex flex-col max-w-133.75 w-full text-white">
          <div className="flex items-center justify-between">
            <Image src={Logo1} alt="logo" />
            <Link href={"https://renovaafrica.com/"} className="flex">
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
      <Image src={Logo2} alt="logo" className="md:hidden ml-auto" />

      <div
        className={`w-full ${isFullScreen ? "max-w-178.5 m-auto overflow-auto h-full " : ""}`}
      >
        {children}
      </div>
    </div>
  );
};

export default AuthWrapper;
