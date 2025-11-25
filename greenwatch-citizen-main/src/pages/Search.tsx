import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Search as SearchIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BottomNav } from "@/components/BottomNav";

const searchCategories = [
  "Parques",
  "Denuncias",
  "Eventos",
  "Foros",
  "Educación",
];

const mockResults = [
  {
    id: 1,
    title: "Parque Caldas - Centro Histórico",
    category: "Parques",
    description: "Espacio verde emblemático en el corazón de Popayán",
  },
  {
    id: 2,
    title: "Reporte: Acumulación de basura",
    category: "Denuncias",
    description: "Incidente reportado en el sector norte",
  },
  {
    id: 3,
    title: "Jornada de limpieza - Este sábado",
    category: "Eventos",
    description: "Únete a la limpieza del Parque de los Estudiantes",
  },
];

export default function Search() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSelectedCategories([]);
  };

  const filteredResults = mockResults.filter((result) => {
    const matchesQuery =
      searchQuery === "" ||
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(result.category);
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with Search Bar */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="flex items-center gap-2 p-4">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar parques, denuncias, eventos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="px-4 pb-4 flex gap-2 flex-wrap">
          {searchCategories.map((category) => (
            <Badge
              key={category}
              variant={
                selectedCategories.includes(category) ? "default" : "outline"
              }
              className="cursor-pointer"
              onClick={() => toggleCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </header>

      {/* Results */}
      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-4">
        {searchQuery || selectedCategories.length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground">
              {filteredResults.length} resultado(s) encontrado(s)
            </p>
            {filteredResults.map((result) => (
              <Card
                key={result.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{result.category}</Badge>
                      </div>
                      <h3 className="font-semibold text-lg mb-1">
                        {result.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {result.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <div className="text-center py-12 space-y-4">
            <SearchIcon className="h-16 w-16 text-muted-foreground mx-auto" />
            <div>
              <h3 className="font-semibold text-lg mb-2">
                Busca en Green Space
              </h3>
              <p className="text-sm text-muted-foreground">
                Encuentra parques, denuncias, eventos y más
              </p>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
