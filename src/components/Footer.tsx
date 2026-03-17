import { MessageCircle, Instagram } from "lucide-react";


const WHATSAPP_URL = "https://wa.me/5561936182228?text=Olá! Preciso de ajuda para recuperar minha CNH.";
const INSTAGRAM_URL = "https://www.instagram.com/cnhdenovo";

const Footer = () => {
  return (
    <footer className="py-10 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <img alt="CNH de Novo" className="h-10" src="/assets/logo-footer.png" />
            <p className="text-muted-foreground text-sm mt-2">
              Especialistas em CNH Suspensa e Cassada.
            </p>
          </div>

          <div className="flex gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              aria-label="WhatsApp">
              
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              aria-label="Instagram">
              
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} CNH de Novo. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>);

};

export default Footer;