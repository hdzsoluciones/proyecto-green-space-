import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Users, MapPin } from "lucide-react";
import heroCommunity from "@/assets/hero-community.jpg";

const onboardingSteps = [
  {
    icon: Leaf,
    title: "Con tu ayuda dejemos nuestros parques limpios",
    description: "Reporta incidentes y contribuye a mantener nuestros espacios verdes",
    image: heroCommunity,
  },
  {
    icon: Users,
    title: "Únete a la comunidad",
    description: "Participa en jornadas de limpieza y eventos comunitarios",
    image: heroCommunity,
  },
  {
    icon: MapPin,
    title: "Monitorea en tiempo real",
    description: "Visualiza el estado de los espacios verdes en tu ciudad",
    image: heroCommunity,
  },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/home");
    }
  };

  const handleSkip = () => {
    navigate("/home");
  };

  const step = onboardingSteps[currentStep];
  const Icon = step.icon;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <Card className="w-full max-w-md overflow-hidden">
          <div className="h-64 overflow-hidden">
            <img
              src={step.image}
              alt={step.title}
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="h-8 w-8 text-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{step.title}</h2>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
            <div className="flex gap-2 justify-center">
              {onboardingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === currentStep ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="p-6 space-y-3">
        <Button onClick={handleNext} size="lg" className="w-full">
          {currentStep < onboardingSteps.length - 1 ? "Siguiente" : "Comenzar"}
        </Button>
        <Button onClick={handleSkip} variant="ghost" size="lg" className="w-full">
          Saltar
        </Button>
      </div>
    </div>
  );
}
