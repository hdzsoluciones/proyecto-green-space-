import { MapPin, Calendar, BookOpen, MessageSquare, Heart, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BottomNav } from "@/components/BottomNav";
import logo from "@/assets/logo.png";
import heroCommunity from "@/assets/hero-community.jpg";

const quickLinks = [
  { label: "Parques", active: true },
  { label: "Reservas", active: false },
  { label: "Canchas", active: false },
  { label: "Jornadas", active: false },
];

const recommendations = [
  {
    title: "Reportar denuncia ciudadana",
    date: "Jueves 11 jun.",
    time: "9:00 pm",
    icon: "👷",
  },
];

const tools = [
  {
    title: "Herramientas educativas ambientales",
    subtitle: "Cuidado de parques",
    image: heroCommunity,
    link: "/educational",
  },
];

const regulations = [
  {
    title: "Normativas ambientales",
    subtitle: "Decreto 11275 de 2024",
    date: "15 de octubre de 2024",
    link: "/regulations",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <Link to="/profile" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
              <User className="h-5 w-5 text-primary-foreground" />
            </div>
          </Link>
          <Link to="/map" className="p-2">
            <MapPin className="h-6 w-6 text-foreground" />
          </Link>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-2xl font-bold mb-1">Hola,</h1>
          <p className="text-xl text-foreground">bienvenido a Green Space</p>
        </div>

        {/* Quick Links */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {quickLinks.map((link) => (
            <Button
              key={link.label}
              variant={link.active ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap"
            >
              {link.label}
            </Button>
          ))}
        </div>

        {/* Recommendations */}
        <section>
          <h2 className="text-xl font-bold mb-4">Recomendados para ti</h2>
          {recommendations.map((rec, index) => (
            <Link key={index} to="/report">
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="bg-primary p-8 flex items-center justify-center">
                    <div className="text-6xl">{rec.icon}</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{rec.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{rec.date}</span>
                      <span>{rec.time}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>

        {/* Educational Tools */}
        <section>
          <h2 className="text-xl font-bold mb-4">Herramientas educativas ambientales</h2>
          {tools.map((tool, index) => (
            <Link key={index} to={tool.link}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <img
                    src={tool.image}
                    alt={tool.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-secondary">{tool.subtitle}</h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>

        {/* Regulations */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Normativas ambientales</h2>
            <Link to="/regulations" className="text-sm text-secondary font-semibold">
              Ver más
            </Link>
          </div>
          {regulations.map((reg, index) => (
            <Link key={index} to={reg.link}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="bg-muted p-8 flex items-center justify-center">
                    <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-primary" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">{reg.title}</h3>
                    <p className="text-sm font-medium text-primary mb-1">{reg.subtitle}</p>
                    <p className="text-xs text-muted-foreground">{reg.date}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>

        {/* Donations */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Donaciones</h2>
            <Link to="/donations" className="text-sm text-secondary font-semibold">
              Ver más
            </Link>
          </div>
          <Link to="/donations">
            <Card className="overflow-hidden gradient-primary hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center text-white">
                <h3 className="text-xl font-bold mb-2">Programa de donaciones para</h3>
                <h3 className="text-xl font-bold mb-3">Proyectos Ambientales</h3>
                <p className="text-sm opacity-90">Pago + Control + Inmediatez</p>
              </CardContent>
            </Card>
          </Link>
        </section>

        {/* Help Section */}
        <Card className="bg-muted/50">
          <CardContent className="p-4 flex items-start gap-3">
            <MessageSquare className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-1">¿Tienes alguna duda?</h3>
              <p className="text-sm text-muted-foreground">
                Contacta a nuestro equipo de soporte aquí
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
