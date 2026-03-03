import type { RecommendationResponse } from "../services/api";
import RestaurantCard from "../components/RestaurantCard";

interface Props {
  data: RecommendationResponse;
  onBack: () => void;
}

export default function RecommendationsPage({ data, onBack }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Your Recommendations
            </h1>
            <p className="text-gray-500 mt-1">
              Found {data.filtered_count} matching restaurant{data.filtered_count !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white border-2 border-[#e23744] text-[#e23744] font-semibold rounded-xl hover:bg-[#e23744] hover:text-white transition-all duration-200 cursor-pointer"
          >
            Search Again
          </button>
        </div>

        {/* Restaurant Cards */}
        {data.restaurants.length > 0 ? (
          <div className="space-y-4">
            {data.restaurants.map((r, i) => (
              <RestaurantCard key={`${r.name}-${i}`} restaurant={r} index={i + 1} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-md">
            <p className="text-gray-500 text-lg">
              No restaurants matched your criteria. Try adjusting your filters.
            </p>
            <button
              onClick={onBack}
              className="mt-4 px-6 py-3 bg-[#e23744] text-white font-semibold rounded-xl hover:bg-[#cb202d] transition-all cursor-pointer"
            >
              Try Different Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
