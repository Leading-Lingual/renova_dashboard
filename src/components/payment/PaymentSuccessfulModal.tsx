import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

const PaymentSuccessfulModal = ({
  open,
  onOpenChange,
  purchaseNumber,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  purchaseNumber?: string;
}) => {
  const orderItems: string[] = [];
  const router = useRouter()
  const onContinue=()=>{
    onOpenChange(false)
    router.push("/marketplace")
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-full md:min-w-130 p-4 md:p-6 rounded-[24px]"
      >
        <div className="flex flex-col md:p-2 gap-6">
          <div className="flex flex-col gap-2 items-center">
            <div className="rounded-full size-16 bg-brand-500 items-center justify-center">
              <Check className="text-white size-8" />
            </div>
            <div className="flex flex-col text-center gap-1">
              <p className="text-xl font-bold">Payment Successful</p>
              {purchaseNumber && <p className="text-m-medium">Purchase {purchaseNumber}</p>}
              <p className="text-s">Your order has been placed successfully.</p>
            </div>
          </div>
          <div className="bg-brand-50/50 px-4 py-2 flex flex-col gap-5.5">
            {orderItems.map((item) => (
              <span key={item} className="text-m-bold flex justify-between">
                <p className=""></p>
                <p className=""></p>
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <Button onClick={()=>router.push("/orders")} className="h-12 md:h-14">View Order Details</Button>
            <Button
              onClick={onContinue}
              className="h-12 md:h-14"
              variant="outline"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentSuccessfulModal;
