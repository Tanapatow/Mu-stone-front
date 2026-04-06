"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader } from "lucide-react";
import { updateOrderStatus } from "@/lib/actions/order.action";
import type { OrderStatus } from "@/lib/api/order/order.type";

type CancelButtonProps = {
  orderId: string;
  onSuccess: (orderId: string, status: OrderStatus) => void;
};

export default function CancelButton({
  orderId,
  onSuccess,
}: CancelButtonProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    startTransition(async () => {
      const res = await updateOrderStatus(orderId, "CANCELLED");
      if (res.success) {
        onSuccess(orderId, "CANCELLED");
        setOpen(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="px-3 py-1.5 rounded-lg text-xs font-sarabun font-medium bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-all duration-200 cursor-pointer">
        ยกเลิก
      </DialogTrigger>
      <DialogContent className="bg-gradient-to-br from-[#1a144a] to-[#0b082a] border border-gold/15 text-cream">
        <DialogHeader>
          <DialogTitle className="font-sarabun text-gold">
            ยืนยันการยกเลิกออเดอร์
          </DialogTitle>
        </DialogHeader>
        <p className="font-sarabun text-white/70 text-sm">
          คุณต้องการยกเลิกออเดอร์นี้ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้
        </p>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
            className="font-sarabun border-white/20 text-white/70 hover:bg-white/10"
          >
            ยกเลิก
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isPending}
            className="font-sarabun"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <Loader size={14} className="animate-spin" />
                กำลังดำเนินการ...
              </span>
            ) : (
              "ยืนยัน"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
