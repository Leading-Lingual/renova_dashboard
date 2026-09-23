"use client";

import { ChevronRight } from "lucide-react";

import { Button } from "../ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

import SearchCategoryIcon from "@iconify-react/streamline-flex/search-category-remix";
import {
  Count,
  ListingSort,
  ListingStatus,
  MaterialType,
} from "@/types/listing.types";

interface ListingNavProps {
  search: string;
  status?: ListingStatus;
  materialType?: MaterialType;
  sort: ListingSort;

  counts?: Count;

  onSearchChange: (value: string) => void;

  onStatusChange: (value?: ListingStatus) => void;

  onMaterialTypeChange: (value?: MaterialType) => void;

  onSortChange: (value: ListingSort) => void;
}

const ListingNav = ({
  search,
  status,
  counts,
  onSearchChange,
  onStatusChange,
  onMaterialTypeChange,
  onSortChange,
}: ListingNavProps) => {
  const tabs = [
    {
      title: "All",
      value: undefined,
      count: counts?.all,
    },
    {
      title: "Available",
      value: "AVAILABLE" as const,
      count: counts?.available,
    },
    {
      title: "Draft",
      value: "DRAFT" as const,
      count: counts?.draft,
    },
    {
      title: "Archived",
      value: "ARCHIVED" as const,
      count: counts?.archived,
    },
  ];

  const materialTypes = [
    {
      text: "All materials",
      value: undefined,
    },
    {
      text: "Plastic PET",
      value: "PLASTIC_PET" as const,
    },
    {
      text: "Plastic HDPE",
      value: "PLASTIC_HDPE" as const,
    },
    {
      text: "Iron",
      value: "IRON" as const,
    },
    {
      text: "Aluminium",
      value: "ALUMINIUM" as const,
    },
    {
      text: "Copper",
      value: "COPPER" as const,
    },
    {
      text: "E-Waste",
      value: "E_WASTE" as const,
    },
    {
      text: "Glass",
      value: "GLASS" as const,
    },
    {
      text: "Paper",
      value: "PAPER" as const,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 w-full">
      <div className="flex border-b-2 gap-6 border-brand-50/50">
        {tabs.map((item) => (
          <button
            type="button"
            key={item.title}
            onClick={() => onStatusChange(item.value)}
            className="flex items-center gap-2 px-2.5 py-1 relative"
          >
            <p
              className={`text-black-500 text-s ${
                status === item.value ? "font-bold" : ""
              }`}
            >
              {item.title}
            </p>

           {item.count !== undefined && <span className="rounded-full bg-brand-50 size-5 flex justify-center items-center text-brand-500 text-2s-medium font-bold">
              {item.count}
            </span>}

            {status === item.value && (
              <hr className="border-[1.5] w-full border-brand-500 absolute top-full right-0" />
            )}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        <InputGroup className="h-10! border-black-50 md:min-w-60">
          <InputGroupAddon>
            <SearchCategoryIcon className="m-auto size-4 text-black-500" />
          </InputGroupAddon>

          <InputGroupInput
            type="search"
            placeholder="Search for materials..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </InputGroup>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" className="h-10! border-black-50" />
            }
          >
            Sort
            <ChevronRight />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="rounded-none p-0!">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="bg-brand-50! text-black-500 text-m-bold! font-bold">
                Date
              </DropdownMenuLabel>

              <DropdownMenuItem
                className="rounded-none"
                onClick={() => onSortChange("NEWEST")}
              >
                Newest
              </DropdownMenuItem>

              <DropdownMenuItem
                className="rounded-none"
                onClick={() => onSortChange("OLDEST")}
              >
                Oldest
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuGroup>
              <DropdownMenuLabel className="bg-brand-50! text-black-500 text-m-bold! font-bold">
                Price
              </DropdownMenuLabel>

              <DropdownMenuItem
                className="rounded-none"
                onClick={() => onSortChange("PRICE_ASC")}
              >
                Low to High
              </DropdownMenuItem>

              <DropdownMenuItem
                className="rounded-none"
                onClick={() => onSortChange("PRICE_DESC")}
              >
                High to Low
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" className="h-10! border-black-50" />
            }
          >
            Filter
            <ChevronRight />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="rounded-none p-0!">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="bg-brand-50! text-black-500 text-m-bold! font-bold">
                Material
              </DropdownMenuLabel>

              {materialTypes.map((item) => (
                <DropdownMenuItem
                  key={item.text}
                  className="rounded-none"
                  onClick={() => onMaterialTypeChange(item.value)}
                >
                  {item.text}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ListingNav;
