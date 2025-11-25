import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const days = [
  { name: "Sábado", date: "14 de septiembre 2020", available: true },
  { name: "Domingo", date: "15 de septiembre 2020", available: true },
  { name: "Lunes", date: "16 de septiembre 2020", available: true },
];

const times = ["07:00 pm", "09:00 pm", "10:00 pm", "11:00 pm"];

const cleaningZones = [
  { name: "Parque caldas" },
  { name: "Parque Benito Juarez" },
  { name: "Río Blanco" },
  { name: "Río Molino" },
];

export default function Events() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedZones, setSelectedZones] = useState<Set<string>>(new Set());

  const toggleZone = (zone: string) => {
    const newZones = new Set(selectedZones);
    if (newZones.has(zone)) {
      newZones.delete(zone);
    } else {
      newZones.add(zone);
    }
    setSelectedZones(newZones);
  };

  const handleConfirm = () => {
    console.log("Confirmed:", { selectedDay, selectedTime, selectedZones: Array.from(selectedZones) });
    navigate("/kit");
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
        {/* Quick Icons */}
        <div className="flex gap-4 text-muted-foreground">
          <Calendar className="h-5 w-5" />
          <Clock className="h-5 w-5" />
        </div>

        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold">Jornadas de limpieza</h1>
          <p className="text-xl">comunitaria</p>
        </div>

        {/* Day Selection */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDay(index)}
              className={`flex-shrink-0 px-6 py-3 rounded-xl border-2 transition-all ${
                selectedDay === index
                  ? "border-success bg-success/10 text-success"
                  : "border-border bg-card"
              }`}
            >
              <div className="font-semibold">{day.name}</div>
              <div className="text-xs">{day.date}</div>
            </button>
          ))}
        </div>

        {/* Time Selection */}
        <div>
          <h2 className="font-semibold mb-3">Selecciona tu horario</h2>
          <div className="grid grid-cols-4 gap-2">
            {times.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-3 px-2 rounded-lg border transition-all text-sm ${
                  selectedTime === time
                    ? "border-success bg-success/10 text-success"
                    : "border-border bg-muted"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Cleaning Zones */}
        <div>
          <h2 className="font-semibold mb-3">Zonas de limpieza</h2>
          <div className="space-y-3">
            {cleaningZones.map((zone) => (
              <Card key={zone.name} className="overflow-hidden">
                <CardContent className="p-4 flex items-center justify-between">
                  <h3 className="font-medium">{zone.name}</h3>
                  <Button
                    variant="link"
                    size="sm"
                    className="text-info"
                    onClick={() => toggleZone(zone.name)}
                  >
                    {selectedZones.has(zone.name) ? "Reservado" : "Separa tu Kit"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Confirm Button */}
        <div className="pt-4">
          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={handleConfirm}
            disabled={!selectedTime || selectedZones.size === 0}
          >
            Confirmar participación
          </Button>
        </div>
      </div>
    </div>
  );
}
