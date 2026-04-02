"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { ShoppingCart, Check, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/api/product/product.type";
import { addToCart } from "@/lib/actions/cart.action";

type ProductDetailProps = {
  product: Product;
  isLoggedIn: boolean;
};

export default function ProductDetail({
  product,
  isLoggedIn,
}: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(
    product.images.find((img) => img.isMain)?.url ??
      product.images[0]?.url ??
      "/placeholder.png",
  );
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    startTransition(async () => {
      const res = await addToCart(product.id, quantity);
      if (res.success) {
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
      }
    });
  };

  const benefits =
    product.benefit
      ?.split(",")
      .map((b) => b.trim())
      .filter(Boolean) ?? [];

  return (
    <div className="flex flex-col md:flex-row gap-10 p-8 rounded-2xl bg-gradient-to-br from-[#1a144a]/70 to-[#0b082a]/80 border border-[rgba(201,162,39,0.15)]">
      {/* Images */}
      <div className="flex flex-col gap-3 md:w-96 shrink-0">
        {/* Main image */}
        <div
          className="relative w-full aspect-square rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(201,162,39,0.2)" }}
        >
          <Image
            src={selectedImage}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Thumbnails */}
        {product.images.length > 1 && (
          <div className="flex gap-2">
            {product.images.map((img) => (
              <button
                key={img.id}
                onClick={() => setSelectedImage(img.url)}
                className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 transition-all duration-200"
                style={{
                  border:
                    selectedImage === img.url
                      ? "2px solid rgba(201,162,39,0.8)"
                      : "2px solid rgba(255,255,255,0.1)",
                }}
              >
                <Image src={img.url} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-5 flex-1">
        <div>
          <h1 className="font-['Sarabun'] text-xl text-[#f5f0e8] mb-2">
            {product.name}
          </h1>
          <p
            className="text-2xl font-semibold font-['Sarabun']"
            style={{ color: "#c9a227" }}
          >
            ฿ {Number(product.price).toLocaleString()}
          </p>
        </div>

        {/* Description */}
        <div>
          <p className="text-xs text-white/40 font-['Sarabun'] mb-1.5">
            คำอธิบาย
          </p>
          <p className="text-lg text-white/70 font-['Sarabun'] leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Benefits */}
        {benefits.length > 0 && (
          <div>
            <p className="text-xs text-white/40 font-['Sarabun'] mb-1.5">
              สรรพคุณ
            </p>
            <ul className="flex flex-col gap-1">
              {benefits.map((b, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-lg text-white/70 font-['Sarabun']"
                >
                  <Check size={13} className="text-gold shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Stock */}
        <p className="text-xs text-white/35 font-['Sarabun']">
          คงเหลือ {product.stock} ชิ้น
        </p>

        {/* Quantity + Add to cart */}
        <div className="flex items-center gap-3 mt-2">
          {/* Quantity */}
          <div
            className="flex items-center rounded-lg overflow-hidden"
            style={{ border: "1px solid rgba(201,162,39,0.2)" }}
          >
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-8 h-9 text-white/60 hover:text-white/90 hover:bg-white/5 transition-colors disabled:opacity-30"
            >
              −
            </button>
            <span className="w-10 text-center text-lg font-['Sarabun'] text-[#f5f0e8]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
              disabled={quantity >= product.stock}
              className="w-8 h-9 text-white/60 hover:text-white/90 hover:bg-white/5 transition-colors disabled:opacity-30"
            >
              +
            </button>
          </div>

          {/* Add to cart button */}
          <Button
            onClick={handleAddToCart}
            disabled={!isLoggedIn || product.stock === 0 || isPending}
            className="
              flex-1 py-2.5 rounded-xl border-0
              font-['Sarabun'] text-lg font-semibold
              text-navy transition-all duration-200
              hover:-translate-y-0.5 active:scale-[0.98]
              disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0
            "
            style={{
              background: "linear-gradient(135deg, #c9a227 0%, #7a5c0a 100%)",
              boxShadow: isLoggedIn
                ? "0 4px 20px rgba(201,162,39,0.35)"
                : "none",
            }}
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <Loader size={14} className="animate-spin" />
                กำลังเพิ่ม...
              </span>
            ) : added ? (
              <span className="flex items-center justify-center gap-2">
                <Check size={14} />
                เพิ่มแล้ว!
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <ShoppingCart size={14} />
                {product.stock === 0
                  ? "สินค้าหมด"
                  : isLoggedIn
                    ? "เพิ่มลงตะกร้า"
                    : "เข้าสู่ระบบเพื่อซื้อ"}
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
