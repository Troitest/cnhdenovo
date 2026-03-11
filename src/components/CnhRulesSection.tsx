import { Scale, AlertTriangle, ShieldAlert } from "lucide-react";

const CnhRulesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Regras de Suspensão */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Scale className="size-7 text-accent shrink-0" />
              <h2 className="text-2xl md:text-3xl font-medium text-foreground">
                REGRAS DE SUSPENSÃO DA CNH
              </h2>
            </div>

            <p className="text-muted-foreground text-base">
              Uma das principais causas de suspensão é o excesso de pontos no período de 12 meses. Atualmente os limites são:
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { pontos: "40 pontos", desc: "quando não há infração gravíssima" },
                { pontos: "30 pontos", desc: "quando existe uma infração gravíssima" },
                { pontos: "20 pontos", desc: "quando existem duas ou mais infrações gravíssimas" },
              ].map((item) => (
                <div
                  key={item.pontos}
                  className="p-4 rounded-xl bg-card border border-border text-center space-y-2"
                >
                  <p className="text-2xl font-bold text-accent">{item.pontos}</p>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground text-sm italic">
              Motoristas profissionais com atividade remunerada registrada na CNH possuem limite de 40 pontos independentemente da quantidade de infrações gravíssimas.
            </p>
          </div>

          {/* Infrações com suspensão direta */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="size-6 text-destructive shrink-0" />
              <h3 className="text-xl md:text-2xl font-medium text-foreground">
                INFRAÇÕES QUE GERAM SUSPENSÃO DIRETA
              </h3>
            </div>

            <ul className="grid gap-2 sm:grid-cols-2">
              {[
                "Dirigir sob influência de álcool ou drogas",
                "Recusar teste do bafômetro",
                "Participar de racha",
                "Realizar manobras perigosas",
                "Excesso de velocidade acima de 50%",
                "Omitir socorro em acidente",
                "Transpor bloqueio viário",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-muted-foreground text-sm">
                  <span className="text-destructive mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Cassação */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <ShieldAlert className="size-6 text-[hsl(270,70%,50%)] shrink-0" />
              <h3 className="text-xl md:text-2xl font-medium text-foreground">
                CASSAÇÃO DA CNH
              </h3>
            </div>

            <p className="text-muted-foreground text-base">
              Principais causas previstas no Art. 263 do Código de Trânsito Brasileiro:
            </p>

            <ul className="grid gap-2 sm:grid-cols-2">
              {[
                "Dirigir com a CNH suspensa",
                "Reincidir em infrações graves no período de 12 meses",
                "Participar de racha",
                "Realizar manobras perigosas",
                "Permitir que pessoa sem CNH conduza o veículo",
                "Fraude na obtenção da CNH",
                "Condenação judicial por crime de trânsito",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-muted-foreground text-sm">
                  <span className="text-[hsl(270,70%,50%)] mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-muted-foreground text-sm">
                <span className="text-foreground font-medium">Consequência:</span> o motorista fica proibido de dirigir por 2 anos e depois precisa refazer todo o processo de habilitação.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CnhRulesSection;
