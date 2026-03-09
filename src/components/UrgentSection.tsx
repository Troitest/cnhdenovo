import { Button } from "@/components/ui/button";
import { MessageCircle, Clock } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5500000000000?text=Olá! Preciso de ajuda para recuperar minha CNH.";

const UrgentSection = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary/50 relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <Clock className="w-8 h-8 text-primary" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Não espere <span className="text-gradient">piorar a situação</span> da sua CNH
          </h2>

          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Quanto antes seu caso for analisado, maiores são as chances de construir uma defesa eficiente.
          </p>

          <Button variant="whatsapp" size="xl" asChild>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="!size-5" />
              Falar com especialista no WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UrgentSection;
