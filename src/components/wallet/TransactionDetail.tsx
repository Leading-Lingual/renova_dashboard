import { Dialog, DialogClose, DialogContent } from "../ui/dialog";
import dayjs from "dayjs";
import { formatDecimal, formatNumber } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "../ui/button";

const TransactionDetail = ({
  open,
  setIsOpen,
  trasactionDetal,
}: {
  open?: boolean;
  setIsOpen?: (value: boolean) => void;
  trasactionDetal?: {
    amount: string;
    description: string;
    reference?: string;
    date: string;
    status: string;
  };
}) => {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent showCloseButton={false} className="w-130">
        <DialogClose
          aria-label="Close transaction details"
          render={
            <Button
              type="button"
              variant="destructive"
              size="icon-lg"
              className="absolute -top-2.5 right-0 rounded-full bg-danger-500 hover:bg-danger-400 text-white"
            />
          }
        >
          <X aria-hidden="true" />
        </DialogClose>
        <div className="flex flex-col gap-2">
          <p className="font-bold text-xl text-center">
            ₦ {formatNumber(formatDecimal(trasactionDetal?.amount ?? "0"))}
          </p>
          <hr className="w-full mx-1" />
          <div className="grid grid-cols-2">
            <p className="font-bold">Narration</p>
            <p className="text-s">{trasactionDetal?.description ?? "—"}</p>
          </div>
          <hr className="w-full mx-1" />
          <div className="grid grid-cols-2">
            <p className="font-bold">Reference</p>
            <p className="text-s">{trasactionDetal?.reference ?? "—"}</p>
          </div>
          <hr className="w-full mx-1" />
          <div className="grid grid-cols-2">
            <p className="font-bold">Date</p>
            <p className="text-s">
              {trasactionDetal?.date && dayjs(trasactionDetal.date).isValid()
                ? dayjs(trasactionDetal.date).format("MMMM DD, YYYY · hh:mm A")
                : "—"}
            </p>
          </div>
          <hr className="w-full mx-1" />
          <div className="grid grid-cols-2">
            <p className="font-bold">Status</p>
            <p className="text-s">{trasactionDetal?.status ?? "—"}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDetail;
