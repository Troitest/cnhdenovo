import { Search, FileText, Building2, ShieldCheck } from "lucide-react";

const solutions = [
{ icon: Search, title: "Análise completa", desc: "Análise completa do processo administrativo" },
{ icon: FileText, title: "Defesa e recursos", desc: "Elaboração de defesa e recursos" },
{ icon: Building2, title: "Acompanhamento", desc: "Acompanhamento do processo junto ao DETRAN" },
{ icon: ShieldCheck, title: "Estratégia jurídica", desc: "Estratégia jurídica para recuperar sua CNH" }];


const SolutionSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl mb-4 font-medium">
            Como podemos <span className="text-gradient">ajudar você</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-14">
          {solutions.map((item, i) =>
          <div
            key={i}
            className="group p-6 rounded-xl bg-card border border-border text-center hover:border-primary/40 hover:shadow-glow transition-all duration-300">
            
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          )}
        </div>

        <div className="max-w-3xl mx-auto text-center p-8 rounded-2xl border border-primary/20 bg-primary/5">
          <p className="text-lg md:text-xl font-medium text-foreground leading-relaxed">
            "Mesmo que sua CNH esteja suspensa ou cassada, ainda podem existir{" "}
            <span className="text-primary font-bold">caminhos legais</span> para recuperar o direito de dirigir."
          </p>
        </div>
      </div>
    </section>);

};

export default SolutionSection;