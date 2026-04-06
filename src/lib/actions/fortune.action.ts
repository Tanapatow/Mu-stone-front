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
    const result = await fortuneService.draw();
    return result;
  } catch (e) {
    return null;
  }
};

export const getFortuneLogById = async (id: string) => {
  try {
    const result = await fortuneService.getLogById(id);
    return result;
  } catch (e) {
    console.log("getFortuneLogById error:", e);
    return null;
  }
};
