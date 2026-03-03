import { useState } from "react";
import PreferencesPage from "./pages/PreferencesPage";
import RecommendationsPage from "./pages/RecommendationsPage";
import LoadingSpinner from "./components/LoadingSpinner";
import type { UserPreferences, RecommendationResponse } from "./services/api";
import { fetchRecommendations } from "./services/api";

type View = "form" | "loading" | "results";

function App() {
  const [view, setView] = useState<View>("form");
  const [results, setResults] = useState<RecommendationResponse | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (prefs: UserPreferences) => {
    setView("loading");
    setError("");

    try {
      const data = await fetchRecommendations(prefs);
      setResults(data);
      setView("results");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Is the backend running?";
      setError(message);
      setView("form");
    }
  };

  const handleBack = () => {
    setResults(null);
    setView("form");
  };

  if (view === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (view === "results" && results) {
    return <RecommendationsPage data={results} onBack={handleBack} />;
  }

  return (
    <>
      {error && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-red-50 border border-red-300 text-red-700 px-6 py-3 rounded-xl shadow-lg">
          {error}
        </div>
      )}
      <PreferencesPage onSubmit={handleSubmit} loading={false} />
    </>
  );
}

export default App;
