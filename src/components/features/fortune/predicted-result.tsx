import { Card } from '@/lib/api/fortune/fortune.type';
import CardFlip from './card-flip';

type PredictedResultProps = Card;

export default function PredictedResult({
  name,
  nameThai,
  imagePath,
}: PredictedResultProps) {
  return (
    <div className="flex flex-col items-center">
      <CardFlip imageUrl={imagePath} />
      <h1 className="text-2xl">{name}</h1>
      <h2 className="text-lg">{nameThai}</h2>
    </div>
  );
}
