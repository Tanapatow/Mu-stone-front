import PredictedResult from '@/components/features/fortune/predicted-result';
import ProductRecommendSection from '@/components/features/fortune/product-recommend-section';
import Image from 'next/image';

const simLoading = (second: number = 3) =>
  new Promise((resolve) => setTimeout(() => resolve(null), second * 1000));

export default async function PredictPage() {
  // await simLoading(5);
  return (
    <div className="relative min-h-screen">
      <Image
        src="/hero-bg.png"
        alt="bg"
        fill
        sizes="80px"
        className="object-cover -z-10"
        priority
      />
      <PredictedResult />
      <div className="flex justify-center items-center">
        <div className="animate-bounce">
          <div
            className="w-10 h-10 border-r-4 border-b-4 border-white rotate-45 
                shadow-[0_0_10px_rgba(0,0,0,0.5)]
                animate-pulse"
          ></div>
        </div>
      </div>
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
