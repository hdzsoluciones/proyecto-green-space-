import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, MapPin, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { BottomNav } from "@/components/BottomNav";
import { toast } from "sonner";

interface Report {
  id: string;
  title: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  status: string;
  created_at: string;
}

export default function MapView() {
  const navigate = useNavigate();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error: any) {
      toast.error("Error al cargar los reportes");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "text-green-500";
      case "in_progress":
        return "text-yellow-500";
      default:
        return "text-red-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "resolved":
        return "Resuelto";
      case "in_progress":
        return "En Proceso";
      default:
        return "Pendiente";
    }
  };

  const openInGoogleMaps = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold">Mapa de Reportes - Popayán</h1>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* Simulación del Mapa */}
        <Card className="overflow-hidden">
          <div className="relative h-96 bg-muted flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-muted-foreground">
                  Mapa Interactivo de Popayán
                </p>
              </div>
              {/* Simulación de pins en el mapa */}
              <div className="absolute top-1/4 left-1/3">
                <MapPin className="h-8 w-8 text-red-500 animate-bounce" />
              </div>
              <div className="absolute top-1/2 right-1/3">
                <MapPin className="h-8 w-8 text-yellow-500 animate-bounce" />
              </div>
              <div className="absolute bottom-1/4 left-1/2">
                <MapPin className="h-8 w-8 text-green-500 animate-bounce" />
              </div>
            </div>
          </div>
        </Card>

        {/* Leyenda de colores */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Leyenda</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-red-500" />
                <span className="text-sm">Pendiente</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-yellow-500" />
                <span className="text-sm">En Proceso</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-500" />
                <span className="text-sm">Resuelto</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Reportes */}
        <div>
          <h2 className="text-xl font-bold mb-4">Todos los Reportes</h2>
          {loading ? (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              </CardContent>
            </Card>
          ) : reports.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                No hay reportes disponibles
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {reports.map((report) => (
                <Card
                  key={report.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedReport(report)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <MapPin className={`h-5 w-5 flex-shrink-0 mt-1 ${getStatusColor(report.status)}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-semibold">{report.title}</h3>
                          <Badge variant="secondary">{getStatusLabel(report.status)}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {report.location}
                        </p>
                        <p className="text-sm line-clamp-2">{report.description}</p>
                        <div className="mt-3 flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              openInGoogleMaps(Number(report.latitude), Number(report.longitude));
                            }}
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Ver en Google Maps
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
