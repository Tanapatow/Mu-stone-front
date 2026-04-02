"use server";

import { fortuneService } from "../api/fortune/fortune.service";
import type {
  FortuneLog,
  FortunePredictResponse,
} from "../api/fortune/fortune.type";

export const getMyFortuneLogs = async (): Promise<FortuneLog[]> => {
  try {
    return await fortuneService.getMyLogs();
  } catch {
    return [];
  }
};

export const drawFortune = async (): Promise<FortunePredictResponse | null> => {
  try {
    return await fortuneService.draw();
  } catch {
    return null;
  }
};
