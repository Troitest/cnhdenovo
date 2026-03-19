import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Instagram, Phone, Mail, Copy, Check } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5561936182228?text=Olá! Preciso de ajuda para recuperar minha CNH.";
const INSTAGRAM_URL = "https://www.instagram.com/cnhdenovo";
const PHONE_DISPLAY = "(61) 9 3618-2228";
const EMAIL = "contato@cnhdenovo.com.br";

const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 md:py-28 bg-secondary/50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-medium mb-4">
          Fale conosco <span className="text-gradient">agora</span>
        </h2>
        <p className="text-muted-foreground mb-10 max-w-md mx-auto">
          Escolha o canal de sua preferência para entrar em contato com nossa equipe.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
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

        {/* Contact info cards */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-5 py-4 rounded-xl bg-card border border-border hover:border-accent/50 transition-colors flex-1"
          >
            <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
              <Phone className="size-5 text-accent" />
            </div>
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Telefone</p>
              <p className="text-sm font-medium text-foreground">{PHONE_DISPLAY}</p>
            </div>
          </a>

          <button
            onClick={copyEmail}
            className="flex items-center gap-3 px-5 py-4 rounded-xl bg-card border border-border hover:border-accent/50 transition-colors flex-1 text-left group"
            title="Copiar e-mail"
          >
            <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
              <Mail className="size-5 text-accent" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground">E-mail</p>
              <p className="text-sm font-medium text-foreground truncate">{EMAIL}</p>
            </div>
            {copied ? (
              <Check className="size-4 text-[hsl(142,70%,45%)] shrink-0" />
            ) : (
              <Copy className="size-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
