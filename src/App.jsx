import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DTH from "./pages/DTH";
import DTG from "./pages/DTG";
import NewsSection from "./components/NewsSelection";
import ReportFullView from "./pages/ReportFullView";
import MasterData from "./pages/MasterData";
import DTR from "./pages/DTR";
import MIDA from "./pages/MIDA";
import PLAS from "./pages/PLAS";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <main className="flex">
          <Routes>
            <Route path="/" element={<DTG />} />\
            {/* DTH */}
            <Route path="/DTH/DUYTAN-RPT" element={<DTH />} />
            <Route path="/DTH/DUYTAN-MASTER" element={<MasterData />} />
            {/* DTR */}
            <Route path="/DTR/DUYTAN-RPT" element={<DTR />} />

            {/* MIDA */}
            <Route path="/MIDA/DUYTAN-RPT" element={<MIDA />} />

            {/* PLASCENE */}
            <Route path="/PLASCENE/DUYTAN-RPT" element={<PLAS />} />

            <Route path="/news" element={<NewsSection />} />
            <Route path="/report-view" element={<ReportFullView />} />
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
