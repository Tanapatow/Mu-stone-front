import { api } from '../client';
import { FortunePredictResponse } from './fortune.type';

const draw = () => api.post<FortunePredictResponse>('fortune/draw');

export const fortuneService = { draw };
