import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { getAddress } from "@/lib/actions/address.action";
import AddressForm from "@/components/features/cart/address-form";

export default async function AddressPage() {
  const session = await auth();
  if (!session) redirect("/");

  const address = await getAddress();

  return (
    <div className="min-h-screen flex flex-col px-10 pt-10">
      {/* Header */}
      <div className="mb-8 p-4 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10">
        <h1
          className="font-['Sarabun'] text-2xl text-gold mb-1"
          style={{ textShadow: "0 0 24px rgba(201,162,39,0.35)" }}
        >
          ที่อยู่จัดส่ง
        </h1>
        <p className="text-lg text-white/70 font-['Sarabun']">
          จัดการที่อยู่สำหรับการจัดส่งสินค้าของคุณ
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center">
        <div
          className="w-full max-w-2xl p-8 rounded-2xl"
          style={{
            background:
              "linear-gradient(160deg, rgba(26,20,74,0.7) 0%, rgba(11,8,42,0.8) 100%)",
            border: "1px solid rgba(201,162,39,0.15)",
          }}
        >
          <AddressForm address={address} />
        </div>
      </div>
    </div>
  );
}
