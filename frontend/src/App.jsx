import Header from "./Component/Header";
import Footer from "./Component/Footer";
import MainContent from "./Component/MainContent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthCallback from "./pages/AuthCallback";
import RecipeHistory from "./Component/RecipeHistory";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <MainContent />
            </>}>
          </Route>
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/history" element={<RecipeHistory />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
