import { Card } from "@/lib/api/fortune/fortune.type";
import CardFlip from "./card-flip";

type PredictedResultProps = Card;

export default function PredictedResult({
  name,
  nameThai,
  imagePath,
}: PredictedResultProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <CardFlip imageUrl={imagePath} />
      <p className="text-sm font-semibold text-cream font-sarabun text-center">
        {name}
      </p>
      <p className="text-xs text-gold/70 font-sarabun text-center">
        {nameThai}
      </p>
    </div>
  );
}
