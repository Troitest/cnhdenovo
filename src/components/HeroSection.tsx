import { Button } from "@/components/ui/button";
import { MessageCircle, FileSearch } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const WHATSAPP_URL = "https://wa.me/5500000000000?text=Olá! Preciso de ajuda para recuperar minha CNH.";

const HeroSection = () => {
  const scrollToForm = () => {
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="CNH brasileira" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl">
          <div className="inline-block mb-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/10">
            <span className="text-sm font-semibold text-primary">⚠️ Especialistas em recuperação de CNH</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Perdeu a CNH?{" "}
            <span className="text-gradient">Nós ajudamos você a ter sua CNH de volta.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            Especialistas em defesa de motoristas com CNH suspensa ou cassada. Analisamos seu caso e buscamos a melhor estratégia para recuperar seu direito de dirigir.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="whatsapp" size="xl" asChild>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="!size-5" />
                Falar no WhatsApp agora
              </a>
            </Button>
            <Button variant="heroOutline" size="xl" onClick={scrollToForm}>
              <FileSearch className="!size-5" />
              Analisar meu caso
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative yellow line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-primary" />
    </section>
  );
};

export default HeroSection;
