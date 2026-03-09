import { AlertTriangle, Briefcase, FileWarning, Scale, HelpCircle } from "lucide-react";

const problems = [
  { icon: Briefcase, text: "Impossibilidade de trabalhar dirigindo" },
  { icon: FileWarning, text: "Multas e processos administrativos complexos" },
  { icon: AlertTriangle, text: "Risco de agravamento da penalidade" },
  { icon: HelpCircle, text: "Falta de orientação jurídica especializada" },
];

const ProblemSection = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            CNH suspensa ou cassada pode trazer{" "}
            <span className="text-gradient">grandes prejuízos</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {problems.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border shadow-card hover:border-primary/30 transition-colors duration-300"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-foreground font-medium">{item.text}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
          Muitas pessoas perdem o prazo de defesa ou apresentam recursos errados. Com orientação adequada, é possível contestar penalidades e buscar a recuperação da sua CNH.
        </p>
      </div>
    </section>
  );
};

export default ProblemSection;
