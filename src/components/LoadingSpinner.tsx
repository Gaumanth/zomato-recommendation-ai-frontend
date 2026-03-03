export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 rounded-full" />
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-[#e23744] rounded-full border-t-transparent animate-spin" />
      </div>
      <div className="text-center">
        <p className="text-lg font-semibold text-gray-800">Finding the best restaurants for you...</p>
        <p className="text-sm text-gray-500 mt-1">Our AI is analyzing your preferences</p>
      </div>
    </div>
  );
}
