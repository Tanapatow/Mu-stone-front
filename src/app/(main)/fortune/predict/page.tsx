import PredictedResult from '@/components/features/fortune/predicted-result';
import ProductRecommendSection from '@/components/features/fortune/product-recommend-section';
import Image from 'next/image';

export default function PredictPage() {
  return (
    <div className="relative min-h-screen">
      <Image
        src="/hero-bg.png"
        alt="bg"
        fill
        className="object-cover -z-10"
        priority
      />
      <PredictedResult />
      <ProductRecommendSection />
      <div className="flex flex-col items-center">
        <div className="max-w-2/4 text-center">
          <span className="text-4xl text-white font-aclonica">
            “จักรวาลอยู่ภายในตัวเรา เราถูกสร้างขึ้นจาก ผงธุลีแห่งดวงดาว และเรา
            คือหนทางที่จักรวาลใช้เพื่อรับรู้ตัวตนของมันเอง”
          </span>
        </div>
      </div>
    </div>
  );
}
