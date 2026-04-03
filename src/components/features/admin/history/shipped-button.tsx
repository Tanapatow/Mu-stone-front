'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

export default function ShippedButton() {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div>
      {/* Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger className="text-white bg-green-600 rounded-sm p-2 flex items-center hover:cursor-pointer">
          จัดส่งแล้ว
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ออร์เดอร์นี้ถูกจัดส่งแล้วใช่หรือไม่?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              ยกเลิก
            </Button>
            <Button
              variant="default"
              onClick={() => {
                setOpenDialog(false);
              }}
            >
              ยืนยัน
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
