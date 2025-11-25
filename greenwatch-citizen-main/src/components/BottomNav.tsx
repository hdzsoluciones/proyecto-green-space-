import { Home, Search, Bell, Bookmark } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const navItems = [
  { icon: Home, label: "Inicio", path: "/home" },
  { icon: Search, label: "Buscar", path: "/search" },
  { icon: Bell, label: "Alertas", path: "/alerts" },
  { icon: Bookmark, label: "Foro", path: "/forum" },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around h-16 max-w-screen-xl mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex flex-col items-center justify-center gap-1 px-4 py-2 text-xs transition-colors text-muted-foreground"
            activeClassName="text-primary"
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
