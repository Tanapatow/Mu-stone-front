import { api } from "../client";
import type { FortuneLog, FortunePredictResponse } from "./fortune.type";

const draw = () => api.post<FortunePredictResponse>("fortune/draw");
const getMyLogs = () => api.get<FortuneLog[]>("fortune/me");
const getLogById = (id: string) =>
  api.get<FortunePredictResponse>(`fortune/${id}`);

export const fortuneService = { draw, getMyLogs, getLogById };
