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

type ShippedButtonProps = {
  orderId: string;
  onSuccess: (orderId: string, status: OrderStatus) => void;
};

export default function ShippedButton({
  orderId,
  onSuccess,
}: ShippedButtonProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    startTransition(async () => {
      const res = await updateOrderStatus(orderId, "SHIPPED");
      if (res.success) {
        onSuccess(orderId, "SHIPPED");
        setOpen(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="px-3 py-1.5 rounded-lg text-xs font-sarabun font-medium bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 transition-all duration-200 cursor-pointer">
        จัดส่งแล้ว
      </DialogTrigger>
      <DialogContent className="bg-gradient-to-br from-[#1a144a] to-[#0b082a] border border-gold/15 text-cream">
        <DialogHeader>
          <DialogTitle className="font-sarabun text-gold">
            ยืนยันการจัดส่ง
          </DialogTitle>
        </DialogHeader>
        <p className="font-sarabun text-white/70 text-sm">
          ยืนยันว่าออเดอร์นี้ถูกจัดส่งให้ลูกค้าเรียบร้อยแล้ว?
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
            onClick={handleConfirm}
            disabled={isPending}
            className="font-sarabun bg-green-600 hover:bg-green-700 text-white"
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
