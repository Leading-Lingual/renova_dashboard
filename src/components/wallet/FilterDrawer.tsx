import { ArrowLeft, Check, X } from "lucide-react";
import { Button } from "../ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerTitle } from "../ui/drawer";
import { Field, FieldLabel } from "../ui/field";
import { DatePicker } from "../DatePicker";
import { format } from "date-fns";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useState } from "react";

const FilterDrawer = ({
  open,
  onOpenChange,
  search,
  setSearch,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setSearch?: (value: string) => void;
  search?: string;
}) => {
  const [status, setStatus] = useState("");

  return (
    <Drawer open={open} onOpenChange={onOpenChange} swipeDirection="right">
      <DrawerContent className="px-4 pt-4 pb-10 md:p-10 w-full md:w-114 h-dvh max-h-dvh overflow-hidden">
        <div className="flex h-full min-h-0 flex-col gap-6 md:gap-4.5">
          <div className="flex flex-col gap-4">
            <DrawerClose
              className="flex md:hidden"
              render={
                <Button variant="ghost" size="icon" className="w-fit! h-fit! ">
                  <ArrowLeft className="size-4" />
                </Button>
              }
            />
            <div className=" flex justify-between">
              <DrawerTitle className="text-xl">Filter</DrawerTitle>
              <DrawerClose
                className="hidden md:flex"
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-black-50 size-6 flex justify-center items-center hover:bg-black-50 text-black cursor pointer"
                  >
                    <X className="size-4" />
                  </Button>
                }
              />
            </div>
          </div>
          <hr className="hidden md:flex w-full " />

          <div className="flex min-h-0 flex-1 flex-col gap-4  overflow-y-auto overscroll-contain">
            <div className="flex flex-col gap-3 ">
              <Field>
                <FieldLabel
                  htmlFor={"Period"}
                  className="text-m-medium text-brand-800"
                >
                  Period
                </FieldLabel>
                <DatePicker
                  id="period"
                  value={search ? new Date(`${search}T00:00:00`) : undefined}
                  onSelect={(date) =>
                    setSearch?.(date ? format(date, "yyyy-MM-dd") : "")
                  }
                />
              </Field>
              <div className="flex items-center gap-4 w-full">
                <hr className="bg-black-100 w-full h-0.5 border-none" />
                <p className="text-black">or</p>
                <hr className="bg-black-100 w-full h-0.5 border-none" />
              </div>

              <Field>
                <FieldLabel
                  htmlFor={"date"}
                  className="text-m-medium text-brand-800"
                >
                  Date Range{" "}
                </FieldLabel>
                <div className="flex w-full gap-8">
                  <DatePicker
                    id="date-range1"
                    className={"shrink-0 flex-1"}
                    // value={search ? new Date(`${search}T00:00:00`) : undefined}
                    // onSelect={(date) =>
                    //   setSearch?.(date ? format(date, "yyyy-MM-dd") : "")
                    // }
                  />
                  <DatePicker
                    id="date-range2"
                    className={"shrink-0 flex-1"}
                    // value={search ? new Date(`${search}T00:00:00`) : undefined}
                    // onSelect={(date) =>
                    //   setSearch?.(date ? format(date, "yyyy-MM-dd") : "")
                    // }
                  />
                </div>
              </Field>
            </div>
            <Field>
              <FieldLabel
                htmlFor={"status"}
                className="text-m-medium text-brand-800"
              >
                Status
              </FieldLabel>
              <RadioGroup value={status} onValueChange={(value) => setStatus(String(value))}>
                {["Credit", "Debit", "Pending"].map((item) => (
                  <div
                    key={item}
                    className="relative flex w-full items-center gap-2.5 md:gap-3 p-2.5"
                  >
                    <RadioGroupItem
                      value={item}
                      id={item}
                      className="size-6 rounded-sm border-black-200 bg-white data-checked:border-brand-500 data-checked:bg-brand-500 **:data-[slot=radio-group-indicator]:hidden"
                    />
                    {status === item && (
                      <Check className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-white" />
                    )}

                    <Label
                      htmlFor={item}
                      className="flex flex-col gap-1 items-start"
                    >
                      <span className="text-s font-bold">{item}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </Field>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterDrawer;
