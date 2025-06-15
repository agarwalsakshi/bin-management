import React, { useEffect } from 'react';
import { Header } from './components/layout/Header';
import { CompanyHeader } from './components/common/CompanyHeader';
import { KPISection } from './components/dashboard/KPISection';
import { SearchAndFilters } from './components/dashboard/SearchAndFilters';
import { ViewToggle } from './components/dashboard/ViewToggle';
import { AgencyOverview } from './components/agencies/AgencyOverview';
import { BinOverview } from './components/bins/BinOverview';
import MapView from './components/map/MapView';
import { useInventoryStore } from './store/useInventoryStore';

function App() {
  const { currentView, displayMode, calculateKPIs } = useInventoryStore();

  useEffect(() => {
    calculateKPIs();
  }, [calculateKPIs]);

  return (
    <div
      className="min-h-screen bg-gray-50 relative overflow-hidden"
      style={{
        backgroundImage:
          "url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Ccircle%20cx%3D%222%22%20cy%3D%222%22%20r%3D%222%22%20fill%3D%22%2334d399%22%20fill-opacity%3D%220.25%22/%3E%3C/svg%3E')",
        backgroundRepeat: 'repeat',
      }}
    >
      {/* Agriculture-themed SVG illustration */}
      <svg
        className="pointer-events-none select-none fixed bottom-0 right-0 z-0"
        width="420"
        height="320"
        viewBox="0 0 420 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.10 }}
      >
        <ellipse cx="320" cy="300" rx="100" ry="20" fill="#34d399" />
        <ellipse cx="200" cy="310" rx="120" ry="25" fill="#bbf7d0" />
        <path d="M100 300 Q 150 250 200 300 T 300 300" stroke="#4ade80" strokeWidth="6" fill="none" />
        <path d="M250 280 Q 270 250 320 280 T 390 280" stroke="#22c55e" strokeWidth="4" fill="none" />
        <rect x="120" y="260" width="20" height="40" rx="8" fill="#a7f3d0" />
        <rect x="180" y="270" width="16" height="30" rx="7" fill="#6ee7b7" />
        <rect x="350" y="265" width="14" height="35" rx="6" fill="#bbf7d0" />
        <ellipse cx="130" cy="255" rx="8" ry="16" fill="#22c55e" />
        <ellipse cx="188" cy="265" rx="7" ry="13" fill="#4ade80" />
        <ellipse cx="357" cy="260" rx="6" ry="12" fill="#34d399" />
      </svg>
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <CompanyHeader />
        <KPISection />
        <SearchAndFilters />
        <ViewToggle />
        {displayMode === 'map' ? (
          <div style={{ height: '100vh' }}>
            <MapView />
          </div>
        ) : (
          <div className="space-y-8">
            {currentView === 'agency' ? <AgencyOverview /> : <BinOverview />}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;