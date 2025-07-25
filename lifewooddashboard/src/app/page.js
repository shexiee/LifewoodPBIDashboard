"use client";

import React, { useRef, useState } from "react";
import {
  Database,
  Users,
  Leaf,
  Expand,
  AlertTriangle,
  BarChart2,
  Activity,
  Zap,
} from "lucide-react";

// --- Data for Reports ---
const reports = {
  lifewood: {
    id: "lifewood",
    title: "Lifewood & BYU Analytics",
    icon: Leaf,
    src: "https://app.powerbi.com/view?r=eyJrIjoiM2NjYTFiYWQtOTUxNi00N2QxLWE1NjYtNDQ4NzJjZDRmZDZjIiwidCI6IjgyM2NkZTQ0LTQ0MzMtNDU2ZC1iODAxLWJkZjBhYjNkNDFmYyIsImMiOjEwfQ%3D%3D",
  },
  philippinesproject: {
    id: "philippinesproject",
    title: "Philippines Project Analytics",
    icon: Leaf,
    src: "https://app.powerbi.com/view?r=eyJrIjoiNTcyZjNjNmUtMjE1OC00MjAyLTgzYmQtMjZiMTE3ZTJjMTMwIiwidCI6IjgyM2NkZTQ0LTQ0MzMtNDU2ZC1iODAxLWJkZjBhYjNkNDFmYyIsImMiOjEwfQ%3D%3D&pageName=ac824aa0d6ac101d9e03",
  },
  southafricaproject: {
  id: "southafricaproject",
  title: "South Africa Project Analytics",
  icon: Leaf,
  src: [
    "https://app.powerbi.com/view?r=eyJrIjoiNzhjYzE5NTktMzE0My00MGNjLTk3OWMtNDliZjZmNGNkN2ExIiwidCI6IjgyM2NkZTQ0LTQ0MzMtNDU2ZC1iODAxLWJkZjBhYjNkNDFmYyIsImMiOjEwfQ%3D%3D",
    "https://app.powerbi.com/view?r=eyJrIjoiNzNjZDJjN2ItZTliYS00NDBmLWEwYzUtNGMyNmM0ZThhMDVmIiwidCI6ImEwNWVlYjE3LWVmNzUtNDEwNi05NzdhLTgzZTM5OTMxOTQ3ZCIsImMiOjEwfQ%3D%3D"
    ],
  },

  nigeriaproject: {
    id: "nigeriaproject",
    title: "Nigeria Project Analytics",
    icon: Leaf,
    src: "https://app.powerbi.com/view?r=eyJrIjoiYWQzN2Y3MDItOGUxNy00MTJmLWIxZmUtYTBkMGI3MTdmM2I3IiwidCI6IjgyM2NkZTQ0LTQ0MzMtNDU2ZC1iODAxLWJkZjBhYjNkNDFmYyIsImMiOjEwfQ%3D%3D&pageName=69ad161c98e3e55b5edc",
  },
  ghanaproject: {
    id: "ghanaproject",
    title: "Ghana Project Analytics",
    icon: Leaf,
    src: "https://app.powerbi.com/view?r=eyJrIjoiZWQ4ZDRiNzEtNTczZC00N2QzLTlkNWUtODMxZWViZGE1ZjJiIiwidCI6IjgyM2NkZTQ0LTQ0MzMtNDU2ZC1iODAxLWJkZjBhYjNkNDFmYyIsImMiOjEwfQ%3D%3D&pageName=4ac736ba05889cc6900e",
  },
  congoproject: {
    id: "congoproject",
    title: "Congo Project Analytics",
    icon: Leaf,
    src: "https://app.powerbi.com/view?r=eyJrIjoiYjBmMTJiYzYtODc1Yy00NWZmLWJhOWYtZTQxN2UxMjgyNmZkIiwidCI6IjgyM2NkZTQ0LTQ0MzMtNDU2ZC1iODAxLWJkZjBhYjNkNDFmYyIsImMiOjEwfQ%3D%3D&pageName=bdf8fe2c1abc280983a6",
  },
  madagascarproject: {
    id: "madagascarproject",
    title: "Madagascar Project Analytics",
    icon: Leaf,
    src: "https://app.powerbi.com/view?r=eyJrIjoiNjQ0OWUxZGItNGM2Ni00M2U4LThlMzUtNDc4YTg5NGFkYzAyIiwidCI6IjgyM2NkZTQ0LTQ0MzMtNDU2ZC1iODAxLWJkZjBhYjNkNDFmYyIsImMiOjEwfQ%3D%3D&pageName=58ca9529325a149630c0",
  },
  ivorycoastproject: {
    id: "ivorycoastproject",
    title: "Ivory Coast Project Analytics",
    icon: Leaf,
    src: "https://app.powerbi.com/view?r=eyJrIjoiYjRiMzBiZmMtZjIzYS00NzEwLWI3NjgtODM0NWNlMDY5YTY2IiwidCI6IjgyM2NkZTQ0LTQ0MzMtNDU2ZC1iODAxLWJkZjBhYjNkNDFmYyIsImMiOjEwfQ%3D%3D&pageName=4a8123e02212d6991795",
  },
  beninproject: {
    id: "beninproject",
    title: "Benin Project Analytics",
    icon: Leaf,
    src: "https://app.powerbi.com/view?r=eyJrIjoiODY5Yjg1NmYtOGQyMy00MGY3LTk0OWYtZWRkMzc3OGJhNjcyIiwidCI6IjgyM2NkZTQ0LTQ0MzMtNDU2ZC1iODAxLWJkZjBhYjNkNDFmYyIsImMiOjEwfQ%3D%3D&pageName=38fe384c69c900251046",
  },
  ugandaproject: {
    id: "ugandaproject",
    title: "Uganda Project Analytics",
    icon: Leaf,
    src: "https://app.powerbi.com/view?r=eyJrIjoiZjliZjZhOGYtNzIzNi00YmY4LTgzYjktZGRkNmE2OTU0MDJjIiwidCI6IjgyM2NkZTQ0LTQ0MzMtNDU2ZC1iODAxLWJkZjBhYjNkNDFmYyIsImMiOjEwfQ%3D%3D&pageName=cfc1eb81e550c8154be9",
  },
  kenyaproject: {
    id: "kenyaproject",
    title: "Kenya Project Analytics",
    icon: Leaf,
    src: "https://app.powerbi.com/view?r=eyJrIjoiZDA5ZGRjMzktY2ZkOC00NTA3LWJkYTEtOWYwNDMxMzVjZGM3IiwidCI6IjgyM2NkZTQ0LTQ0MzMtNDU2ZC1iODAxLWJkZjBhYjNkNDFmYyIsImMiOjEwfQ%3D%3D&pageName=78141521468d6b00c82b",
  },
};

// --- Enhanced Data for Stat Cards ---
const statCardsData = [
  { icon: Database, value: "2", label: "Active Reports", color: "forest" },
  { icon: Activity, value: "Live", label: "Data Refresh", color: "amber" },
  { icon: Users, value: "Multi", label: "Stakeholder View", color: "forest" },
  { icon: Zap, value: "100%", label: "Responsive Design", color: "amber" },
];

const PowerBIDashboard = () => {
  const [activeReport, setActiveReport] = useState("lifewood");
  const [errors, setErrors] = useState({ lifewood: false, byu: false });
  const iframeRef = useRef(null);

  const handleIframeError = () => setErrors((prev) => ({ ...prev, [activeReport]: true }));

  const openFullscreen = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    if (iframe.requestFullscreen) iframe.requestFullscreen();
    else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
    else if (iframe.msRequestFullscreen) iframe.msRequestFullscreen();
  };

  // --- Enhanced Sidebar Component ---
  const Sidebar = () => (
    <aside className="fixed inset-y-0 left-0 w-80 bg-gradient-to-b from-forest-950 via-forest-900 to-forest-950 backdrop-blur-lg border-r border-forest-800/50 p-6 flex flex-col z-10 shadow-2xl">
      {/* Enhanced Header with gradient background */}
      <div className="flex items-center space-x-4 mb-12 animate-fade-in-up flex-shrink-0">
        <div className="relative w-14 h-14 bg-gradient-to-br from-amber-800 via-amber-900 to-amber-950 flex items-center justify-center rounded-2xl shadow-glow animate-pulse-glow">
          <BarChart2 className="w-7 h-7 text-neutral-50" />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-700/20 to-transparent rounded-2xl"></div>
        </div>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#133020" }}>
            Analytics
          </h1>
          <p className="text-amber-700 font-medium">Lifewood • BYU Partnership</p>
        </div>
      </div>

      {/* Enhanced Report Switcher - subtle scroll */}
      <nav className="flex-1 min-h-0 flex flex-col">
        <h2 className="text-xs font-bold text-forest-700 uppercase tracking-widest mb-4 animate-fade-in-up animation-delay-100 flex-shrink-0">
          Active Reports
        </h2>
        <div
          className="flex-1 min-h-0 overflow-y-auto pr-2 space-y-3 sidebar-scroll"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#a16207 #78350f",
          }}
        >
          <style>
            {`
              .sidebar-scroll::-webkit-scrollbar {
                width: 7px;
                background: transparent;
              }
              .sidebar-scroll::-webkit-scrollbar-thumb {
                background: linear-gradient(135deg, #a16207 0%, #78350f 50%, #3b1d0f 100%);
                border-radius: 8px;
                min-height: 24px;
              }
              .sidebar-scroll::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(135deg, #f59e42 0%, #a16207 60%, #78350f 100%);
              }
              .sidebar-scroll::-webkit-scrollbar-track {
                background: transparent;
              }
            `}
          </style>
          <div>
            <ReportSwitcherButton reportId="lifewood" label="Lifewood BYU Report" icon={Leaf} />
            <ReportSwitcherButton reportId="philippinesproject" label="Philippines Project" icon={Leaf} />
            <ReportSwitcherButton reportId="southafricaproject" label="South Africa Project" icon={Leaf} />
            <ReportSwitcherButton reportId="nigeriaproject" label="Nigeria Project" icon={Leaf} />
            <ReportSwitcherButton reportId="ghanaproject" label="Ghana Project" icon={Leaf} />
            <ReportSwitcherButton reportId="congoproject" label="Congo Project" icon={Leaf} />
            <ReportSwitcherButton reportId="madagascarproject" label="Madagascar Project" icon={Leaf} />
            <ReportSwitcherButton reportId="beninproject" label="Benin Project" icon={Leaf} />
            <ReportSwitcherButton reportId="ivorycoastproject" label="Ivory Coast Project" icon={Leaf} />
            <ReportSwitcherButton reportId="ugandaproject" label="Uganda Project" icon={Leaf} />
            <ReportSwitcherButton reportId="kenyaproject" label="Kenya Project" icon={Leaf} />
          </div>
        </div>
      </nav>

      {/* Status indicator - sticky to bottom */}
      <div className="pt-4 mt-8 flex-shrink-0">
        <div className="flex items-center space-x-3 text-forest-600">
          <div className="w-2 h-2 bg-amber-800 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium">System Operational</span>
        </div>
      </div>
    </aside>
  );

  // --- Enhanced StatCard Component ---
  const StatCard = ({ icon: Icon, value, label, color, style }) => (
    <div className={`group relative overflow-hidden bg-gradient-to-br ${
      color === 'amber' 
        ? 'from-amber-950/40 via-amber-900/20 to-forest-950/40 border-amber-900/30 hover:border-amber-800/50' 
        : 'from-forest-900/40 via-forest-800/20 to-forest-950/40 border-forest-800/30 hover:border-forest-700/50'
    } p-4 rounded-xl border backdrop-blur-sm animate-fade-in-up opacity-0 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`} style={style}>
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-neutral-50/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative flex items-center space-x-4">
        <div className={`w-12 h-12 ${
          color === 'amber' 
            ? 'bg-gradient-to-br from-amber-900 to-amber-950 shadow-amber-900/20' 
            : 'bg-gradient-to-br from-forest-800 to-forest-900 shadow-forest-800/20'
        } flex-shrink-0 flex items-center justify-center rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110`}>
          <Icon className={`w-6 h-6 ${color === 'amber' ? 'text-amber-700' : 'text-forest-600'}`} />
        </div>
        <div>
          <p className="font-bold text-xl text-neutral-50 mb-1">{value}</p>
          <p className="text-sm text-forest-600 font-medium">{label}</p>
        </div>
      </div>
    </div>
  );

  // --- Enhanced ReportSwitcherButton Component ---
  const ReportSwitcherButton = ({ reportId, label, icon: Icon }) => (
    <button
      onClick={() => setActiveReport(reportId)}
      className={`group relative flex w-full items-center space-x-4 rounded-xl px-5 py-4 text-left font-semibold transition-all duration-300 overflow-hidden
        ${activeReport === reportId
          ? "bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-neutral-50 shadow-glow transform scale-[1.02]"
          : "text-forest-600 hover:bg-gradient-to-r hover:from-forest-900/50 hover:to-forest-800/30 hover:text-forest-500"
        }`}
    >
      {/* Background shine effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-neutral-50/10 to-transparent transform -skew-x-12 transition-transform duration-700 ${
        activeReport === reportId ? 'translate-x-full' : '-translate-x-full group-hover:translate-x-full'
      }`}></div>
      
      <Icon className={`w-6 h-6 transition-all duration-300 relative z-10 ${
        activeReport === reportId ? "text-amber-700 drop-shadow-sm" : "text-forest-600 group-hover:text-forest-500"
      }`} />
      <span className="relative z-10">{label}</span>
      
      {/* Enhanced Active Indicator */}
      <div className={`absolute -left-px top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full transition-all duration-300 ${
        activeReport === reportId 
          ? 'bg-gradient-to-b from-amber-700 to-amber-900 opacity-100 shadow-lg shadow-amber-800/50' 
          : 'bg-amber-800 opacity-0 scale-y-0 group-hover:opacity-60 group-hover:scale-y-50'
      }`}></div>
    </button>
  );

  // --- Footer Link Component ---
  const FooterLink = ({ icon: Icon, label }) => (
    <a href="#" className="group flex items-center space-x-3 text-forest-600 hover:text-forest-500 hover:bg-forest-900/30 p-3 rounded-lg transition-all duration-200 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-forest-800/0 via-forest-700/10 to-forest-800/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
      <Icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110 relative z-10"/>
      <span className="font-medium relative z-10">{label}</span>
    </a>
  );

  // --- Enhanced ReportCard Component ---
  const ReportCard = ({ reportData, hasError, onError, onFullscreen, iframeRef }) => {
  const [iframeIndex, setIframeIndex] = useState(0);
  const sourceList = Array.isArray(reportData.src) ? reportData.src : [reportData.src];

  return (
    <div className="h-full w-full bg-gradient-to-br from-forest-950 via-forest-900 to-forest-950 rounded-3xl shadow-2xl border border-forest-800/50 overflow-hidden flex flex-col backdrop-blur-sm">
      
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-forest-800/30 flex-shrink-0 bg-gradient-to-r from-forest-950/80 to-forest-900/80 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <div className="w-3 h-3 bg-amber-800 rounded-full animate-pulse shadow-glow"></div>
          <h3 className="text-2xl font-bold" style={{ color: '#133020' }}>
            {reportData.title}
          </h3>
        </div>
        <button
          onClick={onFullscreen}
          className="group relative bg-gradient-to-r from-amber-950 to-amber-900 hover:from-amber-900 hover:to-amber-800 text-neutral-50 px-4 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-glow flex items-center space-x-3 overflow-hidden font-semibold"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-50/20 to-transparent transform -skew-x-12 transition-transform duration-700 group-hover:translate-x-full -translate-x-full"/>
          <Expand className="w-5 h-5 relative z-10" />
          <span className="text-sm relative z-10">Fullscreen View</span>
        </button>
      </div>

      {/* Optional view toggle */}
      {sourceList.length > 1 && (
        <div className="flex space-x-2 px-3 py-2 border-b border-forest-800/30 bg-forest-950/80">
          {sourceList.map((_, index) => (
            <button
              key={index}
              onClick={() => setIframeIndex(index)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide ${
                index === iframeIndex
                  ? "bg-amber-800 text-white"
                  : "bg-forest-800 text-forest-300 hover:bg-forest-700"
              }`}
            >
              Report {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* Main iframe container */}
      <div className="relative flex-grow w-full bg-gradient-to-br from-forest-950 to-neutral-900/20">
        {hasError && (
          <div className="absolute inset-0 bg-gradient-to-br from-amber-950/30 via-amber-900/20 to-forest-950/30 backdrop-blur-sm flex items-center justify-center z-20 text-center">
            <div className="flex flex-col items-center space-y-6 p-8 bg-gradient-to-br from-amber-950/20 to-forest-950/40 rounded-2xl border border-amber-900/30 backdrop-blur-sm max-w-md">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-900 to-amber-950 rounded-2xl flex items-center justify-center shadow-glow">
                <AlertTriangle className="w-8 h-8 text-amber-700" />
              </div>
              <div className="text-xl font-bold text-neutral-50">Connection Issue</div>
              <div className="text-forest-600 text-center leading-relaxed">
                Unable to load the Power BI report. Please check your network connection and refresh the page.
              </div>
            </div>
          </div>
        )}

        <iframe
          key={`${reportData.id}-${iframeIndex}`}
          ref={iframeRef}
          src={sourceList[iframeIndex]}
          className="w-full h-full border-none transition-all duration-700 rounded-b-3xl"
          style={{ opacity: hasError ? 0 : 1 }}
          allowFullScreen
          onError={onError}
        />
      </div>
    </div>
  );
};

  
  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-forest-950 via-neutral-900/10 to-forest-950">
      <Sidebar />
      <main className="ml-80 pt-4 pb-1 px-3 w-full min-h-0 flex flex-col flex-grow space-y-2">
        <div className="flex-grow flex flex-col">
          <ReportCard
            reportData={reports[activeReport]}
            hasError={errors[activeReport]}
            onError={handleIframeError}
            onFullscreen={openFullscreen}
            iframeRef={iframeRef}
          />
        </div>
        <footer className="text-center text-forest-600 text-xs py-1">
          <div className="flex items-center justify-center space-x-1">
            <span>© {new Date().getFullYear()}</span>
            <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
            <span>Lifewood + BYU Analytics</span>
            <span className="w-1 h-1 bg-amber-500 rounded-full"></span>
            <span>All Rights Reserved</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default PowerBIDashboard;