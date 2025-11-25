import { useNavigate } from "react-router-dom";
import { ChevronLeft, BookOpen, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import logo from "@/assets/logo.png";
import heroCommunity from "@/assets/hero-community.jpg";

const courses = [
  {
    title: "Curso Virtual",
    subtitle: "Bases y Herramientas de la Educación Ambiental",
    image: heroCommunity,
  },
  {
    title: "Educación Ambiental",
    subtitle: "Programa de formación ambiental para escuelas",
    icon: true,
  },
  {
    title: "Que es la Educación Ambiental",
    subtitle: "Introducción a conceptos fundamentales",
    highlighted: true,
  },
];

export default function Educational() {
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
        {/* Logo Banner */}
        <Card className="bg-primary overflow-hidden">
          <CardContent className="p-8 flex items-center justify-center">
            <img src={logo} alt="Green Space" className="w-32 h-32 object-contain" />
          </CardContent>
        </Card>

        {/* Section Header */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Foros</p>
          <h1 className="text-2xl font-bold">Selecciona el curso</h1>
        </div>

        {/* Courses Grid */}
        <div className="space-y-4">
          {courses.map((course, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                {course.image && (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />
                )}
                {course.icon && (
                  <div className="bg-gradient-to-br from-success/20 to-info/20 p-8 flex items-center justify-center">
                    <div className="h-24 w-24 rounded-full bg-success/30 flex items-center justify-center">
                      <Leaf className="h-12 w-12 text-success" />
                    </div>
                  </div>
                )}
                {course.highlighted && !course.image && !course.icon && (
                  <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-8 flex items-center justify-center">
                    <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-success" />
                    </div>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                  <p className="text-sm text-muted-foreground">{course.subtitle}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions */}
        <div className="pt-4 space-y-3">
          <Button variant="accent" size="lg" className="w-full">
            Matricular curso
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={() => navigate("/events")}
          >
            Únete a nuestras jornadas de limpieza
          </Button>
        </div>
      </div>
    </div>
  );
}
