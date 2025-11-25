import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, CreditCard, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "@/assets/logo.png";

export default function Donations() {
  const navigate = useNavigate();
  const [amount] = useState(50.0);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Donation submitted:", { amount, ...formData });
    navigate("/home");
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
        {/* Brand Header */}
        <Card className="relative overflow-hidden bg-muted">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 right-4 p-2 rounded-full bg-card hover:bg-background transition-colors z-10"
          >
            <X className="h-5 w-5" />
          </button>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="bg-primary rounded-2xl p-4">
              <img src={logo} alt="Green Space" className="w-12 h-12 object-contain" />
            </div>
            <div className="flex-1 bg-secondary rounded-full px-4 py-2 text-center">
              <span className="text-secondary-foreground font-semibold">greenspice.com</span>
            </div>
          </CardContent>
        </Card>

        {/* Donation Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Número de Tarjeta
                </Label>
                <Input
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  maxLength={19}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 space-y-2">
                  <Label>MM/AA</Label>
                  <Input
                    placeholder="12/25"
                    value={formData.expiry}
                    onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    CVV
                    <span className="text-xs text-muted-foreground">?</span>
                  </Label>
                  <Input
                    placeholder="123"
                    value={formData.cvv}
                    onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                    maxLength={3}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Nombre</Label>
                  <Input
                    placeholder="Juan"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Apellido</Label>
                  <Input
                    placeholder="Pérez"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="juan@ejemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Button */}
          <Button type="submit" variant="secondary" size="lg" className="w-full text-lg">
            Pagar S/ {amount.toFixed(2)}
          </Button>

          {/* Payment Methods */}
          <div className="flex items-center justify-center gap-3 pt-2 opacity-60">
            <div className="text-xs bg-card px-3 py-1 rounded border">PCI</div>
            <div className="text-xs bg-card px-3 py-1 rounded border">VISA</div>
            <div className="text-xs bg-card px-3 py-1 rounded border">MC</div>
            <div className="text-xs bg-card px-3 py-1 rounded border">DC</div>
            <div className="text-xs bg-card px-3 py-1 rounded border">AMEX</div>
          </div>
        </form>
      </div>
    </div>
  );
}
