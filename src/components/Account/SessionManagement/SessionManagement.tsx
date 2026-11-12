import Heading from "@/components/Heading";
import Pill from "@/components/Pill";
import SectionCard from "@/components/SectionCard";
import { Button } from "@/components/ui/button";

const SessionManagement = () => {
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
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <div className=" flex gap-20">
                <p className="text-sm font-bold">This device</p>
                <Pill small className="rounded-2xl!">Current device</Pill>
              </div>
              <p className="max-w-56.5 text-sm">
                Chrome on Windows Approximate location: Lagos, Nigeria Last
                active: Active now
              </p>
            </div>
            <Button
              variant="outline"
              className="text-danger-600 border-danger-100! font-bold!"
            >
              Logout
            </Button>
          </div>
          <hr className="my-3" />
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <div className="">
                <p className="text-sm font-bold">Tablet</p>
              </div>
              <p className="max-w-56.5 text-sm">
                Safari on iPad Approximate location: Ikeja, Lagos Last active:
                12 Oct, 4:15 PM
              </p>
            </div>
            <Button
              variant="outline"
              className="text-danger-600 border-danger-100! font-bold"
            >
              Logout
            </Button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
};

export default SessionManagement;
