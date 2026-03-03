import { useState, useEffect } from "react";
import type { UserPreferences, MetadataResponse } from "../services/api";
import { fetchMetadata } from "../services/api";

interface Props {
  onSubmit: (prefs: UserPreferences) => void;
  loading: boolean;
}

const PRICE_OPTIONS = [
  { value: "", label: "Any Budget" },
  { value: "low", label: "Budget Friendly (≤ ₹300)" },
  { value: "medium", label: "Moderate (₹300 – ₹800)" },
  { value: "high", label: "Premium (₹800+)" },
];

const RATING_OPTIONS = [0, 2.5, 3.0, 3.5, 4.0, 4.5];

export default function PreferencesPage({ onSubmit, loading }: Props) {
  const [metadata, setMetadata] = useState<MetadataResponse | null>(null);
  const [metaLoading, setMetaLoading] = useState(true);
  const [metaError, setMetaError] = useState("");

  const [place, setPlace] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    fetchMetadata()
      .then((data) => {
        setMetadata(data);
        setMetaLoading(false);
      })
      .catch(() => {
        setMetaError("Could not load restaurant data. Is the backend running?");
        setMetaLoading(false);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ place, cuisine, price, rating });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold mb-3">
            <span className="text-[#e23744]">Zomato</span>{" "}
            <span className="text-gray-800">AI Recommender</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Tell us what you're craving and we'll find the perfect restaurant
          </p>
          {metadata && (
            <p className="text-sm text-gray-400 mt-2">
              Searching across {metadata.total_restaurants.toLocaleString()} restaurants
            </p>
          )}
        </div>

        {metaError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center">
            {metaError}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl p-8 space-y-6 border border-gray-100"
        >
          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Location
            </label>
            {metaLoading ? (
              <div className="h-12 bg-gray-100 rounded-xl animate-pulse" />
            ) : (
              <select
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-[#e23744] focus:border-transparent outline-none transition-all cursor-pointer"
              >
                <option value="">All Locations</option>
                {metadata?.cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Cuisine */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Cuisine
            </label>
            {metaLoading ? (
              <div className="h-12 bg-gray-100 rounded-xl animate-pulse" />
            ) : (
              <select
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-[#e23744] focus:border-transparent outline-none transition-all cursor-pointer"
              >
                <option value="">All Cuisines</option>
                {metadata?.cuisines.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Budget
            </label>
            <div className="grid grid-cols-2 gap-3">
              {PRICE_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setPrice(opt.value)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium border-2 transition-all cursor-pointer ${
                    price === opt.value
                      ? "border-[#e23744] bg-[#e23744]/5 text-[#e23744]"
                      : "border-gray-200 hover:border-gray-300 text-gray-600"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Minimum Rating: <span className="text-[#e23744]">{rating > 0 ? `${rating}+` : "Any"}</span>
            </label>
            <div className="flex gap-2">
              {RATING_OPTIONS.map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setRating(r)}
                  className={`flex-1 py-3 rounded-xl text-sm font-medium border-2 transition-all cursor-pointer ${
                    rating === r
                      ? "border-[#e23744] bg-[#e23744]/5 text-[#e23744]"
                      : "border-gray-200 hover:border-gray-300 text-gray-600"
                  }`}
                >
                  {r === 0 ? "Any" : `${r}★`}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || metaLoading}
            className="w-full py-4 bg-[#e23744] hover:bg-[#cb202d] disabled:bg-gray-400 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? "Finding Restaurants..." : "Get Recommendations"}
          </button>
        </form>
      </div>
    </div>
  );
}
