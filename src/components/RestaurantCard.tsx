import type { RestaurantItem } from "../services/api";

interface Props {
  restaurant: RestaurantItem;
  index: number;
}

function priceLabel(cat: string) {
  switch (cat) {
    case "low":
      return { text: "Budget Friendly", color: "bg-green-100 text-green-800" };
    case "medium":
      return { text: "Moderate", color: "bg-yellow-100 text-yellow-800" };
    case "high":
      return { text: "Premium", color: "bg-red-100 text-red-800" };
    default:
      return { text: cat, color: "bg-gray-100 text-gray-800" };
  }
}

export default function RestaurantCard({ restaurant, index }: Props) {
  const price = priceLabel(restaurant.price_category);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#e23744]/30 group cursor-pointer">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#e23744] text-white flex items-center justify-center text-sm font-bold">
              {index}
            </span>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#e23744] transition-colors">
              {restaurant.name}
            </h3>
          </div>
          <div className="flex items-center gap-1 bg-green-600 text-white px-2.5 py-1 rounded-lg text-sm font-semibold flex-shrink-0">
            <span>★</span>
            <span>{restaurant.rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {restaurant.cuisines
            .split(",")
            .slice(0, 3)
            .map((c) => (
              <span
                key={c.trim()}
                className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
              >
                {c.trim()}
              </span>
            ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{restaurant.city}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${price.color}`}>
              {price.text}
            </span>
            <span className="font-semibold text-gray-900">
              ₹{restaurant.cost_for_two.toLocaleString()} for two
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
