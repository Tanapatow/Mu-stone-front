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
  price: string;
};

export type FortunePredictResponse = {
  cards: Card[];
  products: RecommendProduct[];
};
