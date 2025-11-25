import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, MessageSquare, Globe, Plus, MessageCircle, ThumbsUp, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BottomNav } from "@/components/BottomNav";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: string;
  replies_count: number;
  views_count: number;
  likes_count: number;
  created_at: string;
  user_id: string;
}

export default function Forum() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("forum_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error: any) {
      toast.error("Error al cargar las publicaciones");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Hace menos de 1 hora";
    if (diffInHours < 24) return `Hace ${diffInHours} horas`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
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
        {/* Hero Section */}
        <Card className="overflow-hidden bg-gradient-to-br from-info/20 to-primary/20">
          <CardContent className="p-8">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="h-32 w-32 rounded-full bg-info/30 flex items-center justify-center">
                  <Globe className="h-16 w-16 text-primary" />
                </div>
                <div className="absolute -bottom-2 -left-8 h-16 w-16 rounded-full bg-card flex items-center justify-center shadow-md">
                  <MessageSquare className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="absolute -bottom-2 -right-8 h-16 w-16 rounded-full bg-card flex items-center justify-center shadow-md">
                  <MessageSquare className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
            </div>
            <h2 className="text-center font-bold text-xl mb-2">Foro Comunitario</h2>
            <p className="text-center text-sm text-muted-foreground">
              Comparte experiencias y conecta con tu comunidad
            </p>
          </CardContent>
        </Card>

        {/* New Post Button */}
        <Button
          size="lg"
          className="w-full gap-2"
          onClick={() => navigate("/forum/new-post")}
        >
          <Plus className="h-5 w-5" />
          Crear Nueva Publicación
        </Button>

        {/* Section Title */}
        <div className="bg-secondary/20 rounded-lg p-4">
          <h2 className="font-semibold text-secondary">Hilos de Discusión Recientes</h2>
        </div>

        {/* Forum Threads */}
        {loading ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            </CardContent>
          </Card>
        ) : posts.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              No hay publicaciones aún. ¡Sé el primero en publicar!
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <span>{getTimeAgo(post.created_at)}</span>
                      </div>
                      {post.category && <Badge variant="secondary">{post.category}</Badge>}
                    </div>
                  </div>
                  
                  {/* Thread Stats */}
                  <div className="flex items-center gap-4 pt-2 border-t border-border">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.replies_count}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      <span>{post.views_count}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{post.likes_count}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Educational CTA */}
        <Button
          variant="secondary"
          size="lg"
          className="w-full"
          onClick={() => navigate("/educational")}
        >
          Aprendizamos a cuidar el medio ambiente
        </Button>
      </div>

      <BottomNav />
    </div>
  );
}
