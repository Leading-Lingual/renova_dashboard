import { Dialog, DialogClose, DialogContent } from "../ui/dialog";
import dayjs from "dayjs";
import { formatDecimal, formatNumber, formatText } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Transaction } from "@/types/wallet.types";

const TransactionDetail = ({
  open,
  setIsOpen,
  transactionDetail,
}: {
  open?: boolean;
  setIsOpen?: (value: boolean) => void;
  transactionDetail?: Transaction;
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
            ₦ {formatNumber(formatDecimal(transactionDetail?.amount ?? "0"))}
          </p>
          <hr className="w-full mx-1" />
          <div className="grid grid-cols-2">
            <p className="font-bold">Narration</p>
            <p className="text-s">{transactionDetail?.description ?? "—"}</p>
          </div>
          <hr className="w-full mx-1" />
          <div className="grid grid-cols-2">
            <p className="font-bold">Reference</p>
            <p className="text-s">{transactionDetail?.reference ?? "—"}</p>
          </div>
          <hr className="w-full mx-1" />
          <div className="grid grid-cols-2">
            <p className="font-bold">Date</p>
            <p className="text-s">
              {transactionDetail?.createdAt &&
              dayjs(transactionDetail.createdAt).isValid()
                ? dayjs(transactionDetail.createdAt).format(
                    "MMMM DD, YYYY · hh:mm A",
                  )
                : "—"}
            </p>
          </div>
          <hr className="w-full mx-1" />
          <div className="grid grid-cols-2">
            <p className="font-bold">Type</p>
            <p className="text-s">
              {formatText(transactionDetail?.relatedEntity.type ?? "") ?? "—"}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDetail;
