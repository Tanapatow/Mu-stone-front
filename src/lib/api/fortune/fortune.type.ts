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
  predictionText: string;
  cards: Card[];
  recommendedProducts: RecommendProduct[];
};
