import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Calendar, MapPin, Users, Locate } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import logo from "@/assets/logo.png";

export default function Report() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    location: "",
    organization: "",
    description: "",
    latitude: 2.4419,
    longitude: -76.6063,
  });

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            location: `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`,
          });
          toast.success("Ubicación actual obtenida");
        },
        (error) => {
          toast.error("No se pudo obtener la ubicación actual");
          console.error(error);
        }
      );
    } else {
      toast.error("La geolocalización no está soportada en este navegador");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Debes iniciar sesión para reportar");
      navigate("/");
      return;
    }

    setLoading(true);
    try {
      const reportDateTime = new Date(`${formData.date}T${formData.time}`);
      
      const { error } = await supabase.from("reports").insert({
        user_id: user.id,
        title: "Reporte de Incidente",
        description: formData.description,
        location: formData.location,
        latitude: formData.latitude,
        longitude: formData.longitude,
        organization: formData.organization,
        report_date: reportDateTime.toISOString(),
        status: "pending",
      });

      if (error) throw error;

      toast.success("Reporte enviado exitosamente");
      navigate("/home");
    } catch (error: any) {
      toast.error("Error al enviar el reporte");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ChevronLeft className="h-6 w-6" />
          </button>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* Logo Banner */}
        <Card className="bg-primary overflow-hidden">
          <CardContent className="p-8 flex items-center justify-center">
            <img src={logo} alt="Green Space" className="w-32 h-32 object-contain" />
          </CardContent>
        </Card>

        {/* Form Header */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Foros</p>
          <h1 className="text-2xl font-bold">Radica tu denuncia</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Fecha y hora
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
              <Input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              Lugar
            </Label>
            <div className="flex gap-2">
              <Input
                placeholder="Ingresa la ubicación o usa GPS"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={getCurrentLocation}
                title="Usar ubicación actual"
              >
                <Locate className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Coordenadas: {formData.latitude.toFixed(6)}, {formData.longitude.toFixed(6)}
            </p>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              Organización responsable
            </Label>
            <Input
              placeholder="Nombre de la organización"
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Descripción del incidente</Label>
            <Textarea
              placeholder="Describe el problema con detalle..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={5}
              required
            />
          </div>

          <div className="pt-4 space-y-3">
            <Button type="submit" variant="accent" size="lg" className="w-full" disabled={loading}>
              {loading ? "Enviando..." : "Radicar denuncia"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="w-full"
              onClick={() => navigate("/events")}
            >
              Únete a nuestras jornadas de limpieza
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
