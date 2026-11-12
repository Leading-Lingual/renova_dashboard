"use client";
import { logoutMutation } from "@/actions/auth/auth.mutation";
import Heading from "@/components/Heading";
import Pill from "@/components/Pill";
import SectionCard from "@/components/SectionCard";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SessionManagement = () => {
  const queryClient = useQueryClient();
  const { mutate: logout } = useMutation(logoutMutation);
  const route = useRouter();

  function onSubmit() {
    logout(undefined, {
      onSettled: (data) => {
        toast.success(data?.message ?? " successful");
        route.replace("/login");
        setTimeout(() => queryClient.clear(), 300);
      },
    });
  }

  const sessions = [
    {
      id: "1",
      isCurrentSession: true,
      type: "",
      details: "Chrome Approximate location: Nigeria Last active: Active now",
    },
  ];
  return (
    <div className="flex flex-col gap-10 flex-1">
      <Heading
        title="Session Managment"
        subtitle="Manage your login sessions"
      />
      <SectionCard
        title="Active sessions"
        subtitle="All sections of login"
        useAccordion
      >
        <div className="flex flex-col gap-1.5 w-full">
          {sessions.map((session, index) => (
            <div key={session.id} className="flex flex-col gap-1.5 w-full">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2">
                  <div className=" flex gap-20">
                    <p className="text-sm font-bold">
                      {session.isCurrentSession ? " This device" : session.type}
                    </p>
                    {session.isCurrentSession && (
                      <Pill small className="rounded-2xl!">
                        Current device
                      </Pill>
                    )}
                  </div>
                  <p className="max-w-56.5 text-sm">{session.details}</p>
                </div>
                <Button
                  onClick={onSubmit}
                  variant="outline"
                  className="text-danger-600 hover:text-danger-400 border-danger-100! font-bold!"
                >
                  Logout
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
