"use client";
import { logoutMutation } from "@/actions/auth/auth.mutation";
import { deleteSessionMutation } from "@/actions/user/user.mutation";
import { getSessions } from "@/actions/user/user.query";
import Heading from "@/components/Heading";
import Pill from "@/components/Pill";
import SectionCard from "@/components/SectionCard";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SessionManagement = () => {
  const queryClient = useQueryClient();
  const { data, isPending } = useQuery(getSessions);
  const {
    mutate: deleteSession,
    isPending: deletingSession,
    variables: deletingSessionId,
  } = useMutation(deleteSessionMutation);

  const { mutate: logout, isPending: isLoggingOut } =
    useMutation(logoutMutation);
  const route = useRouter();

  const handleDeleteSession = (details: {
    sessionId: string;
    isCurrent: boolean;
  }) => {
    if (details.isCurrent) {
      logout(undefined, {
        onSuccess: (data) => {
          toast.success(data?.message ?? " successful");
          route.replace("/login");
          setTimeout(() => queryClient.clear(), 300);
        },
        onError: (error) => toast.error(error.message || "Unable to log out"),
      });
      return;
    }

    deleteSession(details.sessionId, {
      onSuccess: (data) => toast.success(data?.message ?? "Session logged out"),
      onError: (error) => toast.error(error.message || "Unable to log out"),
    });
  };

  const sessions = data?.sessions?.toSorted(
    (a, b) => Number(b.isCurrent) - Number(a.isCurrent),
  );

  return (
    <div className="flex flex-col gap-10 flex-1">
      <Heading
        title="Session Managment"
        subtitle="Manage your login sessions"
      />
      <SectionCard
        title="Active sessions"
        subtitle="All sessions of login"
        useAccordion
      >
        <div className="flex flex-col gap-1.5 w-full">
          {isPending && (
            <div
              aria-label="Loading sessions"
              aria-busy="true"
              className="flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-28 animate-pulse rounded bg-black-50" />
                  <div className="h-3 w-40 animate-pulse rounded bg-black-50" />
                  <div className="h-3 w-48 animate-pulse rounded bg-black-50" />
                  <div className="h-3 w-36 animate-pulse rounded bg-black-50" />
                </div>
                <div className="h-9 w-20 animate-pulse rounded-md bg-black-50" />
              </div>
            </div>
          )}
          {sessions?.map((session, index) => (
            <div key={session.id} className={`flex flex-col gap-1.5 w-full`}>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2">
                  <div className=" flex gap-20">
                    <p className="text-sm font-bold">
                      {session.isCurrent ? " This device" : session.deviceName}
                    </p>
                    {session.isCurrent && (
                      <Pill small className="rounded-2xl!">
                        Current device
                      </Pill>
                    )}
                  </div>
                  <p className="max-w-56.5 text-sm">
                    {session.browser}{" "}
                    {session.browser && session.operatingSystem && "on"}{" "}
                    {session.operatingSystem}{" "}
                    {session.browser && session.operatingSystem && <br />}
                    Approximate location: {session.approximateLocation} <br />
                    Last active:{" "}
                    {session.isCurrent
                      ? "Now"
                      : dayjs(session.lastActiveAt).format(
                          dayjs(session.lastActiveAt).year() === dayjs().year()
                            ? "D MMM, h:mm A"
                            : "D MMM YYYY, h:mm A",
                        )}
                  </p>
                </div>
                <Button
                  disabled={deletingSession || isLoggingOut}
                  onClick={() =>
                    handleDeleteSession({
                      sessionId: session.id,
                      isCurrent: session.isCurrent,
                    })
                  }
                  variant="outline"
                  className="text-danger-600 hover:text-danger-400 border-danger-100! font-bold!"
                >
                  {(session.isCurrent && isLoggingOut) ||
                  (deletingSession && deletingSessionId === session.id) ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Logout"
                  )}
                </Button>
              </div>
              {index !== sessions.length - 1 && <hr className="my-3" />}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
};

export default SessionManagement;
