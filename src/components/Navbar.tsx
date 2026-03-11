import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";

const WHATSAPP_URL = "https://wa.me/5500000000000?text=Olá! Preciso de ajuda para recuperar minha CNH.";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <img src={logo} alt="CNH de Novo" className="h-10" />
        </a>

        <Button variant="hero" size="sm" asChild>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="!size-4" />
            <span className="hidden sm:inline">Fale conosco</span>
          </a>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
