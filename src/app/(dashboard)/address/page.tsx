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
      <div className="dashboard-header">
        <h1 className="dashboard-title">ที่อยู่จัดส่ง</h1>

        <p className="dashboard-subtitle">
          จัดการที่อยู่ ({addresses.length}/4)
        </p>
      </div>

      <div className="flex-1 flex items-start justify-center">
        <div className="card-glass w-full max-w-2xl">
          <AddressManager addresses={addresses} />
        </div>
      </div>
    </div>
  );
}
