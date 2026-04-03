"use client";

import { useTransition } from "react";
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
import { useState } from "react";
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
    <div className="flex flex-col gap-4">
      {addresses.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10 gap-3">
          <MapPin size={32} className="text-white/20" />
          <p className="text-white/30 font-['Sarabun'] text-sm">
            ยังไม่มีที่อยู่จัดส่ง
          </p>
        </div>
      )}

      {addresses.map((address) => (
        <div
          key={address.id}
          className="flex items-start gap-4 p-5 rounded-xl transition-all duration-200"
          style={{
            background: address.isDefault
              ? "rgba(201,162,39,0.05)"
              : "rgba(255,255,255,0.03)",
            border: address.isDefault
              ? "2px solid rgba(201,162,39,0.4)"
              : "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Default indicator — กดได้เพื่อเลือกเป็น default */}
          <button
            onClick={() => !address.isDefault && handleSetDefault(address.id)}
            disabled={isPending || address.isDefault}
            className="shrink-0 mt-0.5 transition-all duration-200 disabled:cursor-default"
            title={
              address.isDefault
                ? "ที่อยู่หลักสำหรับจัดส่ง"
                : "คลิกเพื่อตั้งเป็นที่อยู่หลัก"
            }
          >
            {address.isDefault ? (
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #c9a227, #7a5c0a)",
                }}
              >
                <Check size={10} className="text-navy" />
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full border border-white/20 hover:border-gold/50 transition-colors" />
            )}
          </button>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-xs text-gold font-['Sarabun']">
                {address.title}
              </p>
              {address.isDefault && (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-['Sarabun'] text-gold bg-gold/10 border border-gold/20">
                  ที่อยู่หลัก
                </span>
              )}
            </div>
            <p className="text-sm font-semibold text-cream font-['Sarabun']">
              {address.receiverName} · {address.phone}
            </p>
            <p className="text-xs text-white/50 font-['Sarabun']">
              {address.addressLine1}
            </p>
            <p className="text-xs text-white/50 font-['Sarabun']">
              {address.subDistrict} {address.district} {address.province}{" "}
              {address.postalCode}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-1.5 shrink-0">
            <button
              onClick={() => setEditingAddress(address)}
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-gold transition-colors"
            >
              <Pencil size={12} />
              แก้ไข
            </button>
            {!address.isDefault && (
              <button
                onClick={() => handleSetDefault(address.id)}
                disabled={isPending}
                className="flex items-center gap-1.5 text-xs text-white/40 hover:text-gold transition-colors disabled:opacity-30"
              >
                <Star size={12} />
                ตั้งเป็นหลัก
              </button>
            )}
            <button
              onClick={() => handleDelete(address.id)}
              disabled={isPending}
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-red-400 transition-colors disabled:opacity-30"
            >
              <Trash2 size={12} />
              ลบ
            </button>
          </div>
        </div>
      ))}

      {/* Add new */}
      {addresses.length < 4 && (
        <button
          onClick={() => setShowAddForm(true)}
          disabled={isPending}
          className="flex items-center justify-center gap-2 p-4 rounded-xl text-xs font-['Sarabun'] text-white/40 hover:text-white/70 transition-all duration-200 disabled:opacity-30"
          style={{ border: "1px dashed rgba(255,255,255,0.15)" }}
        >
          {isPending ? (
            <Loader size={13} className="animate-spin" />
          ) : (
            <Plus size={13} />
          )}
          เพิ่มที่อยู่ใหม่
        </button>
      )}

      {/* Note */}
      <p className="text-xs text-white/25 font-['Sarabun'] text-center">
        ที่อยู่หลัก (วงกลมสีทอง) จะถูกใช้ตอนชำระเงินอัตโนมัติ
      </p>

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
    </div>
  );
}
