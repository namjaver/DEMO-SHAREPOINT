import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DTH from "./pages/DTH";
import DTG from "./pages/DTG";
import NewsSection from "./components/NewsSelection";
import ReportFullView from "./pages/ReportFullView";
import MasterData from "./pages/MasterData";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <main className="flex">
          <Routes>
            <Route path="/" element={<DTG />} />
            <Route path="/DTH/DUYTAN-RPT" element={<DTH />} />
            <Route path="/news" element={<NewsSection />} />
            <Route path="/report-view" element={<ReportFullView />} />
            <Route path="/DTH/DUYTAN-MASTER" element={<MasterData />} />
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
