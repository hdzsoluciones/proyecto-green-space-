import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Send } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ForumNewPost() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !message.trim()) {
      toast.error("Por favor completa el título y el mensaje");
      return;
    }

    if (!user) {
      toast.error("Debes iniciar sesión para publicar");
      navigate("/");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("forum_posts").insert({
        user_id: user.id,
        title: title.trim(),
        content: message.trim(),
        category: "General",
      });

      if (error) throw error;

      toast.success("Publicación creada exitosamente");
      navigate("/forum");
    } catch (error: any) {
      toast.error("Error al crear la publicación");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="flex items-center gap-4 p-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold">Nueva Publicación</h1>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Field */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  Asunto / Título del Tema <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="Ej: Reporte de Basura en el Parque X"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={100}
                />
                <p className="text-xs text-muted-foreground">
                  {title.length}/100 caracteres
                </p>
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <Label htmlFor="message">
                  Cuerpo del Mensaje <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="Describe tu tema o pregunta en detalle..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={10}
                  className="resize-none"
                />
                <p className="text-xs text-muted-foreground">
                  Comparte tu experiencia, preguntas o sugerencias con la comunidad
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate(-1)}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1 gap-2" disabled={loading}>
                  <Send className="h-4 w-4" />
                  {loading ? "Publicando..." : "Publicar"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Guidelines */}
        <Card className="mt-6 bg-info/10 border-info/20">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2 text-sm">Guías para publicar</h3>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Sé respetuoso con otros miembros de la comunidad</li>
              <li>• Proporciona detalles relevantes sobre el tema</li>
              <li>• Usa un título claro y descriptivo</li>
              <li>• Evita duplicar temas existentes</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
