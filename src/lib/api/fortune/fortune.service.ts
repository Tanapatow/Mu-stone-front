import { api } from "../client";
import type { FortuneLog, FortunePredictResponse } from "./fortune.type";

const draw = () => api.post<FortunePredictResponse>("fortune/draw");
const getMyLogs = () => api.get<FortuneLog[]>("fortune/me");
export const fortuneService = { draw, getMyLogs };
