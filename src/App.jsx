import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DTG from "./pages/DTG";
import Home from "./pages/home";
import NewsSection from "./components/NewsSelection";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-base-200">
        {/* 🔹 Header */}
        <Header />

        <main className="flex pt-[80px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/DTH/DUYTAN-RPT" element={<DTG />} />
            <Route path="/news" element={<NewsSection />} />
            {/* <Route path="/about" element={<About />} /> */}
            {/* <Route path="/contact" element={<Contact />} /> */}
          </Routes>
          {/* 🔹 Sidebar filter (ẩn/hiện có animation) */}
        </main>
      </div>
    </BrowserRouter>

  );
}

export default App;
