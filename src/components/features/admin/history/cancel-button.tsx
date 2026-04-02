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

export default function CancelButton() {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div>
      {/* Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger className="bg-red-600 text-white rounded-sm p-2 flex items-center hover:cursor-pointer">
          ยกเลิก
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ต้องการยกเลิกออเดอร์นี้?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              ยกเลิก
            </Button>
            <Button
              variant="destructive"
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
