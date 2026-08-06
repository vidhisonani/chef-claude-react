import Layout from "./pages/Layout";
import MainContent from "./Component/MainContent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthCallback from "./pages/AuthCallback";
import RecipeHistory from "./Component/RecipeHistory";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<MainContent />} />
            <Route path="/history" element={<RecipeHistory />} />
          </Route>
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
