import Image from 'next/image';

type CardImageProps = {
  imageUrl: string;
};

export default function CardFlip(cardImage: CardImageProps) {
  return (
    <div className="group perspective-[1000px]">
      <div className="relative w-24 h-36 duration-500 transform-3d group-hover:transform-[rotateY(180deg)]">
        {/* ด้านหน้า */}
        <div className="absolute inset-0 backface-hidden">
          <Image
            src={cardImage.imageUrl}
            alt="front"
            fill
            sizes="80px"
            className="object-cover rounded-lg"
          />
        </div>

        {/* ด้านหลัง */}
        <div className="absolute inset-0 transform-[rotateY(180deg)] backface-hidden">
          <Image
            src="/tarot-card.png"
            alt="back"
            fill
            sizes="80px"
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
