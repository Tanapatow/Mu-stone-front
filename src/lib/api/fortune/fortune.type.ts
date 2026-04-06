export type Card = {
  id: string;
  name: string;
  nameThai: string;
  imagePath: string;
  baseMeaning: string;
};

export type RecommendProduct = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
};

export type FortunePredictResponse = {
  id: string; //4/5/2026
  predictionText: string;
  cards: Card[];
  recommendedProducts: RecommendProduct[];
};

export type FortuneLog = {
  id: string;
  userId: string;
  topic: string;
  predictionText: string;
  cards: Card[];
  recommendedProducts: RecommendProduct[];
  createdAt: string;
};
