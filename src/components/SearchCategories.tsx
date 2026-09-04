"use client";

import { useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import { cn } from "@/lib/utils";
import SearchCategoryIcon from "@iconify-react/streamline-flex/search-category-remix";
import Heading from "./Heading";
import Pill from "./Pill";

interface SearchCategoryProps {
  onSelect?: (id: string) => void;
}

const SearchCategory = ({}: SearchCategoryProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label="Open category search"
        className="rounded-full size-8 md:size-10 bg-black-50 flex md:hidden transition-colors"
      >
        <SearchCategoryIcon className="m-auto size-4 md:size-6 text-black-500" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={close}
          aria-hidden="true"
        />
      )}

      <div
        className={cn(
          "fixed inset-0 z-50 bg-white flex flex-col gap-6 transition-transform duration-300 px-6 py-2 text-black-500",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-4 py-3 border rounded-lg bg-brand-10/50">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={close}
              aria-label="Close category search"
              className=" rounded-md hover:bg-black-50 transition-colors"
            >
              <ArrowLeft className="size-4" />
            </button>
            <p className="text-s">Search</p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close category search"
            className="rounded-md hover:bg-black-50 transition-colors"
          >
            <X className="size-4 " />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <Heading
            containerClass=" flex-row justify-between items-center"
            title="History"
            actions={<p className="text-s font-bold">Clear All</p>}
          />
          <div className="flex flex-wrap gap-2">
            {["Plastic", "Glass"].map((item) => (
              <Pill variant="grey" key={item}>
                {item}
              </Pill>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchCategory;
