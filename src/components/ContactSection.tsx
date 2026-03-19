import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Instagram, Phone, Mail, Copy, Check } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5561936182228?text=Olá! Preciso de ajuda para recuperar minha CNH.";
const INSTAGRAM_URL = "https://www.instagram.com/cnhdenovo";
const PHONE_DISPLAY = "(61) 9 3618-2228";
const EMAIL = "contato@cnhdenovo.com.br";

const CopyChip = ({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary text-foreground text-sm hover:bg-secondary/80 transition-colors group"
      title={`Copiar ${label}`}
    >
      <Icon className="size-4 text-accent" />
      <span>{label}</span>
      {copied ? (
        <Check className="size-3.5 text-[hsl(142,70%,45%)]" />
      ) : (
        <Copy className="size-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
      )}
    </button>
  );
};

const ContactSection = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary/50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-medium mb-4">
          Fale conosco <span className="text-gradient">agora</span>
        </h2>
        <p className="text-muted-foreground mb-10 max-w-md mx-auto">
          Escolha o canal de sua preferência para entrar em contato com nossa equipe.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
          <Button variant="whatsapp" size="xl" className="w-full" asChild>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="!size-5" />
              WhatsApp
            </a>
          </Button>
          <Button variant="heroOutline" size="xl" className="w-full" asChild>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              <Instagram className="!size-5" />
              Instagram
            </a>
          </Button>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-secondary text-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
          >
            <Phone className="size-4 text-accent" />
            <span>{PHONE_DISPLAY}</span>
          </a>
          <CopyChip icon={Mail} label={EMAIL} value={EMAIL} />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
