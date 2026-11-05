import { ArrowDown, ArrowUp } from "lucide-react";
import Pill from "../Pill";
import { formatDecimal, formatNumber, formatText } from "@/lib/utils";
import { transactionTypeVariant } from "./WalletTableColumn";
import dayjs from "dayjs";
import { Transaction } from "@/types/wallet.types";

const TransactionCard = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  const isCredit = true;
  const isPending = false;
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex gap-2 items-center">
        <div
          className={`size-8 rounded-full flex justify-center items-center font-bold
            ${
              isPending
                ? "bg-black-50 text-black-700!"
                : isCredit
                  ? "bg-brand-50/50 text-brand-700!"
                  : "bg-danger-50 text-danger-700!"
            }`}
        >
          {isCredit ? (
            <ArrowUp className="size-5" />
          ) : (
            <ArrowDown className="size-5" />
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-medium">{transaction.description}</p>
          <div className="flex gap-1 text-s">
            <p className="text-sm">
              {dayjs(transaction.createdAt).format("MMM DD")},
            </p>
            <p className="text-sm">
              {dayjs(transaction.createdAt).format("hh:mm A")}
            </p>
          </div>{" "}
        </div>
      </div>

      <div className="flex flex-col justify-end items-end gap-0.75">
        <p className="text-s font-medium">
          {/* <span className="font-bold">{isCredit ? "+" : "-"} ₦ </span> */}
          {`${formatNumber(formatDecimal(transaction.amount))}`}
        </p>
        <Pill
          variant={
              transactionTypeVariant[transaction.relatedEntity.type] ?? "grey"
            }
          >
            {formatText(transaction.relatedEntity.type)}
        </Pill>
      </div>
    </div>
  );
};

export default TransactionCard;
