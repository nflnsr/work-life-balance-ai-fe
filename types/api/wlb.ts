interface IWlb {
  date: Date;
  score: number;
  summary: string;
  createdAt: Date;
  updatedAt: Date;
  dimensionalScores: IDimensionalScore[];
  recommendations: IRecommendation[];
}

interface IDimensionalScore {
  id: number;
  dimension: string;
  score: number;
  analysis: string;
}

interface IRecommendation {
  id: number;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
}

export type { IWlb, IDimensionalScore, IRecommendation };
