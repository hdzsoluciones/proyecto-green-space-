import { useNavigate } from "react-router-dom";
import { ChevronLeft, Calendar, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BottomNav } from "@/components/BottomNav";

const maintenanceAlerts = [
  {
    id: 1,
    title: "Jornada de Limpieza - Parque Caldas",
    description: "Este sábado 30 de noviembre a las 8:00 AM",
    time: "Hace 2 horas",
    type: "event",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Confirmación de Inscripción",
    description: "Te has inscrito exitosamente a la jornada del Parque de los Estudiantes",
    time: "Hace 1 día",
    type: "confirmation",
    status: "confirmed",
  },
  {
    id: 3,
    title: "Recordatorio: Jornada mañana",
    description: "No olvides la jornada de limpieza en el Parque del Mirador",
    time: "Hace 3 días",
    type: "reminder",
    status: "upcoming",
  },
];

const reportAlerts = [
  {
    id: 4,
    title: "Reporte en Proceso",
    description: "Tu denuncia sobre basura en Parque Caldas está siendo revisada",
    time: "Hace 3 horas",
    status: "in_progress",
    reportId: "#R001234",
  },
  {
    id: 5,
    title: "Reporte Resuelto",
    description: "La acumulación de basura en el Parque de los Estudiantes ha sido atendida",
    time: "Hace 2 días",
    status: "resolved",
    reportId: "#R001198",
  },
  {
    id: 6,
    title: "Nuevo Comentario en tu Reporte",
    description: "Las autoridades han respondido a tu denuncia",
    time: "Hace 5 días",
    status: "updated",
    reportId: "#R001156",
  },
];

export default function Alerts() {
  const navigate = useNavigate();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
      case "resolved":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "upcoming":
      case "in_progress":
        return <Clock className="h-5 w-5 text-info" />;
      case "updated":
        return <AlertCircle className="h-5 w-5 text-primary" />;
      default:
        return <Calendar className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-success">Confirmado</Badge>;
      case "resolved":
        return <Badge className="bg-success">Resuelto</Badge>;
      case "upcoming":
        return <Badge className="bg-info">Próximo</Badge>;
      case "in_progress":
        return <Badge className="bg-info">En Proceso</Badge>;
      case "updated":
        return <Badge>Actualizado</Badge>;
      default:
        return null;
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
          <h1 className="text-xl font-bold">Notificaciones</h1>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <Tabs defaultValue="maintenance" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="maintenance" className="gap-2">
              <Calendar className="h-4 w-4" />
              Mantenimiento
            </TabsTrigger>
            <TabsTrigger value="reports" className="gap-2">
              <FileText className="h-4 w-4" />
              Mis Reportes
            </TabsTrigger>
          </TabsList>

          {/* Maintenance Alerts */}
          <TabsContent value="maintenance" className="space-y-3">
            {maintenanceAlerts.map((alert) => (
              <Card
                key={alert.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="pt-1">{getStatusIcon(alert.status)}</div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold">{alert.title}</h3>
                        {getStatusBadge(alert.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {alert.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {alert.time}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Report Alerts */}
          <TabsContent value="reports" className="space-y-3">
            {reportAlerts.map((alert) => (
              <Card
                key={alert.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="pt-1">{getStatusIcon(alert.status)}</div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold">{alert.title}</h3>
                          <p className="text-xs text-muted-foreground">
                            {alert.reportId}
                          </p>
                        </div>
                        {getStatusBadge(alert.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {alert.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {alert.time}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNav />
    </div>
  );
}
