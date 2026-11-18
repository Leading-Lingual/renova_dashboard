"use client";
import Heading from "@/components/Heading";
import TicketTable from "@/components/Support/TicketTable";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import SearchCategoryIcon from "@iconify-react/streamline-flex/search-category-remix";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AllTickets from "@/components/Support/AllTickets";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useQuery } from "@tanstack/react-query";
import {
  GetArticlesQuery,
  GetTicketsQuery,
} from "@/actions/support/support.query";

const SupportPage = () => {
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { isMobile } = useWindowSize();
  const router = useRouter();
  const { data, isPending } = useQuery(GetTicketsQuery({ limit: 10 }));

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search.trim()), 800);
    return () => clearTimeout(timeout);
  }, [search]);

  const { data: articlesData, isPending: fetchingArticles } = useQuery(
    GetArticlesQuery({ limit: 10, q: debouncedSearch || undefined }),
  );

  const showAllMobile = isMobile && showAll;
  const isSearching = search.trim().length > 0;
  const searchComplete = debouncedSearch === search.trim() && !fetchingArticles;

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
                <InputGroup className="h-10 max-w-228.5 w-full border-black-100 m-auto">
                  <InputGroupAddon>
                    <SearchCategoryIcon className="size-4" />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="search"
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search for help articles, guides, answers to common issues"
                  />
                </InputGroup>
                {isSearching && (
                  <div className="flex w-full flex-col gap-4">
                    <Heading title="Articles" />
                    {!searchComplete ? (
                      <p className="text-sm italic text-muted-foreground">
                        Searching...
                      </p>
                    ) : articlesData?.items.length ? (
                      <div className="flex flex-col gap-2.5">
                        {articlesData.items.map((article, index) => (
                          <div
                            key={article.id}
                            className="flex flex-col gap-2.5"
                          >
                            <Heading
                              title={article.title}
                              subtitle={article.summary}
                              titleClassName="text-sm"
                              subTitleClassName="text-sm"
                              containerClass="cursor-pointer"
                            />
                            {
                              index !== articlesData.items.length - 1 && <hr className="my-1" />
                            }
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No help articles found.
                      </p>
                    )}
                  </div>
                )}
              </div>
              {!isSearching && (
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
              )}
            </>
          )}
          {!isSearching && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
