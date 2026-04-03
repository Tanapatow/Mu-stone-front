import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { getAddresses } from "@/lib/actions/address.action";
import AddressManager from "@/components/features/dashboard/address-manager";

export default async function AddressPage() {
  const session = await auth();
  if (!session) redirect("/");

  const addresses = await getAddresses();

  return (
    <div className="min-h-screen flex flex-col px-10 pt-10">
      <div className="mb-8 p-4 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10">
        <h1
          className="font-['Sarabun'] text-2xl text-gold mb-1"
          style={{ textShadow: "0 0 24px rgba(201,162,39,0.35)" }}
        >
          ที่อยู่จัดส่ง
        </h1>
        <p className="text-sm text-white/70 font-['Sarabun']">
          จัดการที่อยู่สำหรับการจัดส่งสินค้าของคุณ ({addresses.length}/4)
        </p>
      </div>

      <div className="flex-1 flex items-start justify-center">
        <div
          className="w-full max-w-2xl p-6 rounded-2xl"
          style={{
            background:
              "linear-gradient(160deg, rgba(26,20,74,0.7) 0%, rgba(11,8,42,0.8) 100%)",
            border: "1px solid rgba(201,162,39,0.15)",
          }}
        >
          <AddressManager addresses={addresses} />
        </div>
      </div>
    </div>
  );
}
