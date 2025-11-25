import { useNavigate } from "react-router-dom";
import { ChevronLeft, Calendar, Clock, Trash2, Sparkles, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroCommunity from "@/assets/hero-community.jpg";

const kitItems = [
  { icon: Recycle, label: "Reciclaje", selected: true },
  { icon: Sparkles, label: "Limpieza", selected: false },
  { icon: Trash2, label: "Clasificación de residuos", selected: false },
];

export default function Kit() {
  const navigate = useNavigate();

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
        {/* Quick Icons */}
        <div className="flex gap-4 text-muted-foreground">
          <Calendar className="h-5 w-5" />
          <Clock className="h-5 w-5" />
        </div>

        {/* Location Header */}
        <div>
          <h1 className="text-2xl font-bold text-center">Parque Caldas</h1>
          <p className="text-xl text-center">Popayán</p>
        </div>

        {/* Location Image */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <img
              src={heroCommunity}
              alt="Parque Caldas"
              className="w-full h-64 object-cover"
            />
          </CardContent>
        </Card>

        {/* Kit Selection */}
        <div>
          <h2 className="font-semibold text-center mb-4 text-success">
            Reclama tu kit de limpieza
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {kitItems.map((item, index) => (
              <button
                key={index}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  item.selected
                    ? "border-success bg-success/10"
                    : "border-border bg-muted hover:border-success/50"
                }`}
              >
                <div
                  className={`h-12 w-12 rounded-full flex items-center justify-center ${
                    item.selected ? "bg-success/20" : "bg-background"
                  }`}
                >
                  <item.icon className={`h-6 w-6 ${item.selected ? "text-success" : "text-muted-foreground"}`} />
                </div>
                <span className="text-xs text-center font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Info Card */}
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <p className="text-sm text-center text-muted-foreground">
              Selecciona los elementos que necesitas para tu jornada de limpieza. Puedes recoger tu
              kit el día del evento en el punto de encuentro.
            </p>
          </CardContent>
        </Card>

        {/* Confirm Button */}
        <div className="pt-4">
          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={() => navigate("/home")}
          >
            Finalizar
          </Button>
        </div>
      </div>
    </div>
  );
}
