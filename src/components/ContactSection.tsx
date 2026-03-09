import { Button } from "@/components/ui/button";
import { MessageCircle, Instagram } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5500000000000?text=Olá! Preciso de ajuda para recuperar minha CNH.";
const INSTAGRAM_URL = "https://instagram.com/cnhdevolta";

const ContactSection = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary/50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Fale conosco <span className="text-gradient">agora</span>
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="whatsapp" size="xl" asChild>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="!size-5" />
              WhatsApp
            </a>
          </Button>
          <Button variant="heroOutline" size="xl" asChild>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              <Instagram className="!size-5" />
              Instagram
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
