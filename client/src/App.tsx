import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AppProvider, useApp } from "./contexts/AppContext";
import { BottomNav } from "./components/BottomNav";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import Keys from "./pages/Keys";
import Devices from "./pages/Devices";
import Packages from "./pages/Packages";
import Profile from "./pages/Profile";

function AppContent() {
  const { currentPage, setCurrentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'keys':
        return <Keys />;
      case 'devices':
        return <Devices />;
      case 'packages':
        return <Packages />;
      case 'profile':
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Phone Frame */}
      <div className="mx-auto w-full max-w-md h-screen max-h-screen bg-slate-100 rounded-3xl shadow-2xl overflow-hidden flex flex-col border-8 border-slate-800">
        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {renderPage()}
        </div>
      </div>

      {/* Bottom Nav */}
      <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <AppProvider>
          <TooltipProvider>
            <Toaster />
            <AppContent />
          </TooltipProvider>
        </AppProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
