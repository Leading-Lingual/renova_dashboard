"use client";
import Image from "next/image";
import Logo1 from "@/assets/logo1.svg";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import Link from "next/link";
import { ArrowLeft, LockKeyhole, Mail } from "lucide-react";
import PasswordToggle from "@/components/PasswordToggle";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useState } from "react";

const SignupPage = () => {
  const [inputType, setInputType] = useState<"password" | "text">("password");

  return (
    <div className="flex h-full w-full gap-7.75 overflow-hidden">
      <div className="hidden lg:flex flex-col max-w-[535px] w-full text-white">
        <div className="flex items-center justify-between">
          <Image src={Logo1} alt="logo" />
          <div className="flex">
            <ArrowLeft />
            <p>Back to Home</p>
          </div>
        </div>
        <div className="h-full flex justify-between items-center">
          <div className="flex flex-col gap-4 ">
            <p className="text-h4-l-semibold">Recycle. Earn. Impact. Repeat.</p>
            <p className="text-text-l-regular">
              Upgrade to a smarter way of managing waste. Create your account
              and start turning recyclables into real rewards. Every item you
              recycle brings you one step closer to earning more.
            </p>
          </div>
        </div>
      </div>
      <div className="flex bg-white md:rounded-2xl md:px-18.75 md:py-[92.5px] w-full gap-6 md:gap-11 flex-col h-full overflow-auto no-scrollbar">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-h4-l-semibold text-brand-900">Create Account</p>
            <p className="text-text-l-regular text-black">
              Sign up to join the future of smarter recycling
            </p>
          </div>
          <Button
            variant="outline"
            className="!text-black border-brand-500 h-[56px] text-heading-hxs-xs-semibold"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.38049 0.847168C10.9601 -0.0377339 13.7654 -0.011336 16.3287 0.919434C17.7159 1.43536 18.988 2.21739 20.0768 3.21924C19.9064 3.40187 19.7291 3.5802 19.5494 3.75732C19.3549 3.94901 19.1583 4.14106 18.9703 4.3374C18.258 5.05221 17.5435 5.76488 16.8287 6.47607C16.1986 5.88493 15.4588 5.425 14.651 5.12451L14.2926 5.00244C13.0557 4.63038 11.7396 4.60673 10.4899 4.93311C9.24044 5.25946 8.10457 5.92302 7.20764 6.85205C6.42422 7.64902 5.83125 8.61307 5.47229 9.67139C4.95939 11.1818 4.95939 12.8201 5.47229 14.3306C5.97655 15.8126 6.93576 17.0979 8.2135 18.0024C9.00935 18.5693 9.91485 18.9638 10.8717 19.1616L10.8727 19.1626C11.8157 19.3379 12.7832 19.3369 13.7262 19.1616C14.6677 19.0022 15.5655 18.6484 16.3619 18.1216H16.3629C16.9913 17.6978 17.5276 17.151 17.9401 16.5151C18.3524 15.8793 18.6327 15.1669 18.7633 14.4204L18.776 14.3472H12.3004V9.84229H23.3453C23.7145 11.9111 23.6088 14.0368 23.0358 16.0591C22.505 17.9312 21.4745 19.6234 20.0543 20.9536C18.6894 22.1939 17.0256 23.0582 15.2262 23.4624V23.4634C13.2384 23.9307 11.1664 23.908 9.18909 23.3979C6.75074 22.7432 4.58636 21.3237 3.01428 19.3481C1.44219 17.3725 0.545079 14.9446 0.454712 12.4214C0.36437 9.89825 1.08562 7.4126 2.51233 5.32959C3.93905 3.24665 5.9962 1.67562 8.38147 0.848145L8.38049 0.847168Z"
                fill="#00280B"
                stroke="#00280B"
                stroke-width="0.125"
              />
              <path
                d="M8.36058 0.789367C10.9535 -0.100776 13.7729 -0.0762934 16.35 0.858742C17.7652 1.38855 19.0619 2.19269 20.1656 3.22499C19.7906 3.62624 19.395 4.00124 19.0125 4.39124C18.285 5.11749 17.5581 5.84124 16.8318 6.56249C16.1078 5.87012 15.232 5.35648 14.2743 5.06249C13.0488 4.69244 11.745 4.66711 10.506 4.98926C9.26699 5.31141 8.14067 5.96861 7.25058 6.88874C6.47364 7.67912 5.88525 8.63477 5.52933 9.68437L1.64246 6.67499C3.03372 3.91604 5.44261 1.80566 8.36058 0.789367Z"
                fill="#E33629"
              />
              <path
                d="M0.611279 9.6563C0.820194 8.62091 1.16704 7.61822 1.64253 6.67505L5.5294 9.69192C5.02093 11.1893 5.02093 12.8127 5.5294 14.31C4.2344 15.31 2.93878 16.315 1.64253 17.325C0.452186 14.9556 0.0891526 12.256 0.611279 9.6563Z"
                fill="#F8BD00"
              />
              <path
                d="M12.2381 9.77808H23.3981C23.7799 11.8723 23.6766 14.0262 23.0963 16.0743C22.5623 17.9577 21.5252 19.66 20.0963 20.9981C18.8419 20.0193 17.5819 19.0481 16.3275 18.0693C16.9494 17.6498 17.4802 17.1091 17.8881 16.4796C18.296 15.85 18.5726 15.1446 18.7013 14.4056H12.2381C12.2363 12.8643 12.2381 11.3212 12.2381 9.77808Z"
                fill="#587DBD"
              />
              <path
                d="M1.64062 17.3251C2.93688 16.3251 4.2325 15.3201 5.5275 14.3101C6.02851 15.7804 6.98138 17.0549 8.25 17.9513C9.04126 18.5106 9.94037 18.8988 10.89 19.0913C11.8257 19.2653 12.7855 19.2653 13.7213 19.0913C14.6542 18.9334 15.5439 18.5821 16.3331 18.0601C17.5875 19.0388 18.8475 20.0101 20.1019 20.9888C18.7292 22.237 17.0558 23.1073 15.2456 23.5144C13.2476 23.9841 11.1655 23.9616 9.17813 23.4488C7.60632 23.0291 6.13814 22.2893 4.86563 21.2757C3.51874 20.2063 2.41867 18.8588 1.64062 17.3251Z"
                fill="#319F43"
              />
            </svg>

            <p>Create with Google Account</p>
          </Button>
          <div className="flex items-center gap-4 w-full">
            <hr className="text-black-100 w-full" text-black-100 />
            <p className="text-black">or</p>
            <hr className="text-black-100 w-full" text-black-100 />
          </div>
          <form className="flex flex-col gap-6">
            <Field>
              <FieldLabel
                htmlFor="input-field-email"
                className="text-text-m-medium text-brand-900"
              >
                Email
              </FieldLabel>
              <InputGroup className="h-[56px]">
                <InputGroupAddon>
                  <Mail />
                </InputGroupAddon>
                <InputGroupInput
                  id="input-field-email"
                  type="email"
                  placeholder="Enter your email address"
                />
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel
                htmlFor="input-field-username"
                className="text-text-m-medium text-brand-900"
              >
                Password
              </FieldLabel>

              <InputGroup className="h-[56px]">
                <InputGroupAddon>
                  <LockKeyhole />
                </InputGroupAddon>
                <InputGroupInput
                  id="input-field-password"
                  type={inputType}
                  placeholder="Create your password"
                />
                <InputGroupAddon align="inline-end">
                  <PasswordToggle
                    inputType={inputType}
                    onAction={() =>
                      setInputType((prev) =>
                        prev === "password" ? "text" : "password",
                      )
                    }
                  />
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </form>
        </div>
        <div className="flex flex-col gap-4 items-center text-black-500">
          <Button className="text-white bg-brand-500 h-[56px] w-full">
            Create Account
          </Button>
          <div className="text-text-m-medium gap-1 flex">
            <p>Already have an account?</p>
            <Link href={"/login"} className="text-brand-500">
              Log In
            </Link>
          </div>
          <p className="text-text-m-medium">
            By submitting, you have agreed to our Privacy Policy and Terms
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
