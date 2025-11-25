import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

type AuthMode = "login" | "signup" | "reset";

export default function Auth() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "login") {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error("Credenciales incorrectas");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("Sesión iniciada correctamente");
          navigate("/onboarding");
        }
      } else if (mode === "signup") {
        if (!fullName.trim()) {
          toast.error("Por favor ingresa tu nombre completo");
          setLoading(false);
          return;
        }
        const { error } = await signUp(email, password, fullName);
        if (error) {
          if (error.message.includes("already registered")) {
            toast.error("Este correo ya está registrado");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("Cuenta creada exitosamente");
          navigate("/onboarding");
        }
      } else if (mode === "reset") {
        const { error } = await resetPassword(email);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success("Revisa tu correo para restablecer tu contraseña");
          setMode("login");
        }
      }
    } catch (error: any) {
      toast.error("Ha ocurrido un error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Green Space" className="h-20 w-20 object-contain" />
          </div>
          <CardTitle className="text-2xl">
            {mode === "login" && "Iniciar Sesión"}
            {mode === "signup" && "Crear Cuenta"}
            {mode === "reset" && "Recuperar Contraseña"}
          </CardTitle>
          <CardDescription>
            {mode === "login" && "Ingresa tus credenciales para continuar"}
            {mode === "signup" && "Regístrate para comenzar a reportar"}
            {mode === "reset" && "Te enviaremos un correo para restablecer tu contraseña"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Nombre Completo</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Juan Pérez"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {mode !== "reset" && (
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Procesando..." : (
                mode === "login" ? "Iniciar Sesión" :
                mode === "signup" ? "Crear Cuenta" :
                "Enviar Correo"
              )}
            </Button>
          </form>

          <div className="mt-4 text-center space-y-2">
            {mode === "login" && (
              <>
                <button
                  type="button"
                  onClick={() => setMode("reset")}
                  className="text-sm text-primary hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
                <div>
                  <span className="text-sm text-muted-foreground">¿No tienes cuenta? </span>
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className="text-sm text-primary hover:underline"
                  >
                    Regístrate
                  </button>
                </div>
              </>
            )}
            {(mode === "signup" || mode === "reset") && (
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-sm text-primary hover:underline"
              >
                Volver a Iniciar Sesión
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
