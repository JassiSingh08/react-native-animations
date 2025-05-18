import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { DarkModeProvider } from "./hooks/useDarkMode";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import AnimationDetail from "./components/AnimationDetail";
import SEO from "./components/SEO";

function App() {
  return (
    <HelmetProvider>
      <DarkModeProvider>
        <Router basename="/react-native-animations">
          <SEO />
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/animation/:id" element={<AnimationDetail />} />
            </Routes>
          </Layout>
        </Router>
      </DarkModeProvider>
    </HelmetProvider>
  );
}

export default App;
