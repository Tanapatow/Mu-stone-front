'use client';
import { addToCart } from '@/lib/actions/cart.action';
import Image from 'next/image';

type ProductRecommendProps = {
  productId: string;
  productImage: string;
  productName: string;
  price: number;
};

export default function ProductRecommend({
  productId,
  productName,
  productImage,
  price,
}: ProductRecommendProps) {
  const handleClickAddToCart = async () => {
    await addToCart(productId);
  };

  return (
    <div className="w-96 h-100">
      <div className="bg-black w-full h-2/3 rounded-t-sm relative overflow-hidden">
        <Image
          src={productImage}
          alt="product-image"
          fill
          className="object-cover"
        />
      </div>
      <div className="bg-[#22143F] w-full h-1/3 rounded-b-sm">
        <div className="flex w-full justify-between p-4 text-lg font-semibold">
          <span className="text-white">{productName}</span>
          <span className="text-yellow-500">฿{price}</span>
        </div>
        <div className="flex justify-center">
          <button
            className="
                px-6 py-2
                rounded-lg
                text-xl font-bold tracking-wide
                text-yellow-300
                bg-[#1a1a1a]
                border border-yellow-400
                
                before:absolute before:inset-0
                before:rounded-2xl
                before:border before:border-yellow-400/40
                before:blur-sm
                
                relative overflow-hidden
                
                hover:shadow-[0_0_10px_rgba(250,204,21,0.9)]
                transition-all duration-300
                "
            onClick={handleClickAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
