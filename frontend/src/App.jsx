import Header from "./Component/Header";
import MainContent from "./Component/MainContent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthCallback from "./pages/AuthCallback";
import RecipeHistory from "./Component/RecipeHistory";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <MainContent />
              <RecipeHistory />
            </>}>
          </Route>
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
