"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Pencil,
  Trash2,
  Star,
  Plus,
  Loader,
  Check,
} from "lucide-react";
import type { Address } from "@/lib/api/user/address/address.type";
import { deleteAddress, setDefaultAddress } from "@/lib/actions/address.action";
import AddressFormModal from "./address-form-modal";

type AddressManagerProps = {
  addresses: Address[];
};

export default function AddressManager({ addresses }: AddressManagerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleDelete = (addressId: string) => {
    startTransition(async () => {
      const res = await deleteAddress(addressId);
      if (res.success) router.refresh();
    });
  };

  const handleSetDefault = (addressId: string) => {
    startTransition(async () => {
      const res = await setDefaultAddress(addressId);
      if (res.success) router.refresh();
    });
  };

  return (
    <>
      <div className="card-glass w-full max-w-2xl mx-auto flex flex-col gap-4">
        {addresses.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <MapPin size={32} className="text-white/20" />
            <p className="text-white/30 font-sarabun text-sm">
              ยังไม่มีที่อยู่จัดส่ง
            </p>
          </div>
        )}

        {addresses.map((address) => {
          const isDefault = address.isDefault;
          return (
            <div
              key={address.id}
              className={`flex items-start gap-4 p-5 rounded-xl transition-all duration-200 ${
                isDefault
                  ? "bg-gold/5 border-2 border-gold/40"
                  : "bg-white/5 border border-white/10"
              }`}
            >
              <button
                onClick={() => !isDefault && handleSetDefault(address.id)}
                disabled={isPending || isDefault}
                className="shrink-0 mt-0.5 disabled:cursor-default"
              >
                {isDefault ? (
                  <div className="w-5 h-5 rounded-full flex items-center justify-center bg-gradient-to-br from-gold to-gold-dark">
                    <Check size={10} className="text-navy" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border border-white/20 hover:border-gold/50 transition-colors" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xs text-gold font-sarabun">
                    {address.title}
                  </p>
                  {isDefault && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-sarabun text-gold bg-gold/10 border border-gold/20">
                      ที่อยู่หลัก
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold text-cream font-sarabun">
                  {address.receiverName} · {address.phone}
                </p>
                <p className="text-xs text-white/50 font-sarabun">
                  {address.addressLine1}
                </p>
                <p className="text-xs text-white/50 font-sarabun">
                  {address.subDistrict} {address.district} {address.province}{" "}
                  {address.postalCode}
                </p>
              </div>

              <div className="flex flex-col gap-1.5 shrink-0">
                <button
                  onClick={() => setEditingAddress(address)}
                  className="flex items-center gap-1.5 text-xs text-white/40 hover:text-gold transition-colors font-sarabun"
                >
                  <Pencil size={12} />
                  แก้ไข
                </button>
                {!isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    disabled={isPending}
                    className="flex items-center gap-1.5 text-xs text-white/40 hover:text-gold transition-colors disabled:opacity-30 font-sarabun"
                  >
                    <Star size={12} />
                    ตั้งเป็นหลัก
                  </button>
                )}
                <button
                  onClick={() => handleDelete(address.id)}
                  disabled={isPending}
                  className="flex items-center gap-1.5 text-xs text-white/40 hover:text-red-400 transition-colors disabled:opacity-30 font-sarabun"
                >
                  <Trash2 size={12} />
                  ลบ
                </button>
              </div>
            </div>
          );
        })}

        {addresses.length < 4 && (
          <button
            onClick={() => setShowAddForm(true)}
            disabled={isPending}
            className="flex items-center justify-center gap-2 p-4 rounded-xl text-xs font-sarabun text-white/40 hover:text-white/70 transition-all duration-200 disabled:opacity-30 border border-dashed border-white/15"
          >
            {isPending ? (
              <Loader size={13} className="animate-spin" />
            ) : (
              <Plus size={13} />
            )}
            เพิ่มที่อยู่ใหม่
          </button>
        )}

        <p className="text-xs text-white/25 font-sarabun text-center">
          ที่อยู่หลัก (วงกลมสีทอง) จะถูกใช้ตอนชำระเงินอัตโนมัติ
        </p>
      </div>

      {showAddForm && (
        <AddressFormModal
          address={null}
          onClose={() => {
            setShowAddForm(false);
            router.refresh();
          }}
        />
      )}

      {editingAddress && (
        <AddressFormModal
          address={editingAddress}
          onClose={() => {
            setEditingAddress(null);
            router.refresh();
          }}
        />
      )}
    </>
  );
}
