import { getFortuneLogById } from "@/lib/actions/fortune.action";
import PredictPageClient from "@/components/features/fortune/predict-page-client";
import { notFound } from "next/navigation";
type PredictPageProps = {
  searchParams: Promise<{ id?: string }>;
};

export default async function PredictPage({ searchParams }: PredictPageProps) {
  const { id } = await searchParams;
  if (!id) notFound();

  const result = await getFortuneLogById(id);
  if (!result) notFound();

  return <PredictPageClient data={result} fortuneId={id} />;
}
