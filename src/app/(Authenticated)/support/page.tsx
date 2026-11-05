"use client";
import Heading from "@/components/Heading";
import TicketTable from "@/components/Support/TicketTable";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import SearchCategoryIcon from "@iconify-react/streamline-flex/search-category-remix";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AllTickets from "@/components/Support/AllTickets";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useQuery } from "@tanstack/react-query";
import { GetTicketsQuery } from "@/actions/support/support.query";

const SupportPage = () => {
  const [showAll, setShowAll] = useState(false);
  const { isMobile } = useWindowSize();
  const router = useRouter();
  const { data, isPending } = useQuery(GetTicketsQuery({ limit: 10 }));

  const showAllMobile = isMobile && showAll;

  return (
    <div className="flex h-full w-full overflow-auto px-6 py-6 md:gap-6 md:px-8 ">
      <div className="flex flex-col gap-4 w-full">
        {(!showAll || isMobile) && (
          <Heading
            title="Help & Support"
            subtitle="Find answers, explore guides or contact our support team for assistance"
            titleClassName="text-xl font-bold!"
            subTitleClassName="text-s md:text-sm"
          />
        )}
        <div className="flex flex-col gap-10 overflow-auto">
          {(!showAll || isMobile) && (
            <>
              <div className="border rounded-[16px] w-full p-4 md:p-6 flex flex-col justify-center gap-3.75">
                <Heading
                  containerClass="justify-center! md:text-center"
                  title="How Can We Help?"
                  subtitle="Search for articles to common issues"
                />
                <Field>
                  <InputGroup className="h-10 max-w-228.5 border-black-100 m-auto ">
                    <InputGroupAddon>
                      <SearchCategoryIcon className="size-4" />
                    </InputGroupAddon>
                    <InputGroupInput
                      id={"search"}
                      type="search"
                      placeholder="Search for help articles, guides, answers to common issues"
                    />
                  </InputGroup>
                  {/* {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )} */}
                </Field>
              </div>
              <div className="rounded-[16px] w-full p-4 md:p-6 flex justify-between items-center bg-brand-50/50 flex-col md:flex-row gap-4">
                <Heading
                  title="Cannot find what you need?"
                  subtitle="Get in touch with us for answers and solution. Create a ticket and track it here."
                />
                <Button
                  onClick={() => router.push("/support/new-ticket")}
                  className="h-14 w-full md:max-w-82.25"
                >
                  Contact Support
                </Button>
              </div>
            </>
          )}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <Heading
                title="My Tickets"
                subtitle="All your requests tickets in one place. View all tickets here"
              />
              <Button
                onClick={() => setShowAll(!showAll)}
                variant="ghost"
                className=""
              >
                <p className="text-brand-500 font-bold">
                  {!showAll ? "See All" : "Show less"}
                </p>
              </Button>
            </div>
            <TicketTable
              isLoading={isPending}
              tickets={data?.items.slice(0, showAll ? undefined : 3)}
            />
            <AllTickets
              onOpenChange={setShowAll}
              open={showAllMobile}
              tickets={data?.items}
              isLoading={isPending}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
