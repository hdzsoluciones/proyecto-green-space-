import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Alerts from "./pages/Alerts";
import Report from "./pages/Report";
import Events from "./pages/Events";
import Kit from "./pages/Kit";
import Forum from "./pages/Forum";
import ForumNewPost from "./pages/ForumNewPost";
import Educational from "./pages/Educational";
import Donations from "./pages/Donations";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import MapView from "./pages/MapView";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
            <Route path="/alerts" element={<ProtectedRoute><Alerts /></ProtectedRoute>} />
            <Route path="/report" element={<ProtectedRoute><Report /></ProtectedRoute>} />
            <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
            <Route path="/kit" element={<ProtectedRoute><Kit /></ProtectedRoute>} />
            <Route path="/forum" element={<ProtectedRoute><Forum /></ProtectedRoute>} />
            <Route path="/forum/new-post" element={<ProtectedRoute><ForumNewPost /></ProtectedRoute>} />
            <Route path="/educational" element={<ProtectedRoute><Educational /></ProtectedRoute>} />
            <Route path="/donations" element={<ProtectedRoute><Donations /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/map" element={<ProtectedRoute><MapView /></ProtectedRoute>} />
            
            {/* Placeholder routes for bottom nav */}
            <Route path="/regulations" element={<Navigate to="/educational" />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
