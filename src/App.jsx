import Header from "./components/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DTH from "./pages/DTH";
import DTG from "./pages/DTG";
import NewsSection from "./components/NewsSelection";
import ReportFullView from "./pages/ReportFullView";
import MasterData from "./pages/MasterData";
import DTR from "./pages/DTR";
import MIDA from "./pages/MIDA";
import PLAS from "./pages/PLAS";
import NotFound from "./pages/404";
import Plenma from "./pages/Plenma";
import DaiLoc from "./pages/DaiLoc";
import DongLam from "./pages/DongLam";
import KhanhNga from "./pages/KhanhNga";
import Dufo from "./pages/Dufo";
import NATEC from "./pages/NATEC";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <main className="flex">
          <Routes>
            <Route path="/" element={<Navigate to="/DTH/bao-cao" replace />} />
            {/* DTH */}
            <Route path="/DTH/bao-cao" element={<DTH />} />
            <Route path="/DTH/master-data" element={<MasterData />} />
            {/* DTR */}
            <Route path="/DTR/bao-cao" element={<DTR />} />

            {/* MIDA */}
            <Route path="/MIDA/bao-cao" element={<MIDA />} />

            {/* PLASCENE */}
            <Route path="/PLASCENE/bao-cao" element={<PLAS />} />

            <Route path="/news" element={<NewsSection />} />
            <Route path="/report-view" element={<ReportFullView />} />

            {/* PLENMA */}
            <Route path="/PLENMA/bao-cao" element={<Plenma />} />

            {/* TRẠM */}
            <Route path="/tram/dai-loc" element={<DaiLoc />} />

            <Route path="/tram/dong-lam" element={<DongLam />} />

            <Route path="/tram/khanh-nga" element={<KhanhNga />} />

            {/* DUFO */}
            <Route path="/DUFO/bao-cao" element={<Dufo />} />

            {/* NATEC */}
            <Route path="/NATEC/bao-cao" element={<NATEC />} />

            <Route path="*" element={<NotFound />} />

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
