import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, User, Bell, Globe, Lock, HelpCircle, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";

const settingsOptions = [
  { icon: Bell, label: "Notificaciones", action: "/alerts" },
  { icon: Globe, label: "Idioma", action: "/profile" },
  { icon: Lock, label: "Privacidad", action: "/profile" },
  { icon: HelpCircle, label: "Ayuda", action: "/profile" },
];

export default function Profile() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [fullName, setFullName] = useState("Usuario");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("user_id", user!.id)
        .maybeSingle();

      if (error) throw error;
      if (data) setFullName(data.full_name);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold">Perfil</h1>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* User Info */}
        <Card>
          <CardContent className="p-6">
            {loading ? (
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-muted animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-6 w-32 bg-muted animate-pulse rounded"></div>
                  <div className="h-4 w-48 bg-muted animate-pulse rounded"></div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
                  <User className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{fullName}</h2>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">-</div>
              <div className="text-xs text-muted-foreground">Reportes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-secondary">-</div>
              <div className="text-xs text-muted-foreground">Jornadas</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">-</div>
              <div className="text-xs text-muted-foreground">Puntos</div>
            </CardContent>
          </Card>
        </div>

        {/* Settings */}
        <div>
          <h3 className="font-semibold mb-3">Preferencias</h3>
          <Card>
            <CardContent className="p-0 divide-y divide-border">
              {settingsOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => navigate(option.action)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-muted transition-colors"
                >
                  <option.icon className="h-5 w-5 text-muted-foreground" />
                  <span className="flex-1 text-left">{option.label}</span>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Logout */}
        <Button
          variant="destructive"
          size="lg"
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Cerrar sesión
        </Button>
      </div>

      <BottomNav />
    </div>
  );
}
