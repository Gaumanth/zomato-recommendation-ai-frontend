import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: { "Content-Type": "application/json" },
});

export interface UserPreferences {
  place: string;
  cuisine: string;
  price: string;
  rating: number;
}

export interface RestaurantItem {
  name: string;
  cuisines: string;
  rating: number;
  cost_for_two: number;
  city: string;
  price_category: string;
}

export interface RecommendationResponse {
  summary: string;
  restaurants: RestaurantItem[];
  filtered_count: number;
}

export interface MetadataResponse {
  cities: string[];
  cuisines: string[];
  total_restaurants: number;
}

export async function fetchMetadata(): Promise<MetadataResponse> {
  const { data } = await api.get<MetadataResponse>("/metadata");
  return data;
}

export async function fetchRecommendations(
  prefs: UserPreferences
): Promise<RecommendationResponse> {
  const { data } = await api.post<RecommendationResponse>("/recommend", prefs);
  return data;
}
