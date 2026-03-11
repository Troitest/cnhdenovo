import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageCircle, AlertTriangle, ShieldAlert, CircleAlert } from "lucide-react";

const WHATSAPP_NUMBER = "5500000000000";

type ResultType = "suspensao" | "cassacao" | "alerta" | null;

const infracoes = [
  "Dirigir sob efeito de álcool",
  "Recusar bafômetro",
  "Excesso de velocidade acima de 50%",
  "Participar de racha",
  "Manobra perigosa",
  "Nenhuma dessas",
  "Não sei",
];

const cassacaoInfracoes = [
  "Dirigir sob efeito de álcool",
  "Recusar bafômetro",
  "Participar de racha",
];

const results: Record<
  "suspensao" | "cassacao" | "alerta",
  {
    icon: typeof AlertTriangle;
    title: string;
    text: string;
    consequences: string[];
    urgency: string;
    buttonLabel: string;
  }
> = {
  cassacao: {
    icon: ShieldAlert,
    title: "ALTO RISCO DE CASSAÇÃO DA CNH",
    text: "Algumas infrações podem levar à cassação da carteira de motorista. Nesses casos o condutor perde totalmente o direito de dirigir.",
    consequences: [
      "Proibição de dirigir por 2 anos",
      "Necessidade de refazer todo o processo de habilitação",
      "Realização de novos exames teóricos e práticos",
    ],
    urgency:
      "EXISTEM SITUAÇÕES EM QUE AINDA É POSSÍVEL APRESENTAR DEFESA OU RECURSO.",
    buttonLabel: "FALAR COM ESPECIALISTA NO WHATSAPP",
  },
  suspensao: {
    icon: AlertTriangle,
    title: "VOCÊ PODE TER A CNH SUSPENSA",
    text: "Seu histórico indica risco de processo de suspensão da CNH. Isso pode acontecer por excesso de pontos ou infrações específicas previstas no Código de Trânsito Brasileiro.",
    consequences: [
      "Proibição temporária de dirigir",
      "Obrigação de realizar curso de reciclagem",
      "Processo administrativo no DETRAN",
    ],
    urgency:
      "MAS NÃO SE PREOCUPE. EM MUITOS CASOS AINDA É POSSÍVEL RECORRER E EVITAR A SUSPENSÃO.",
    buttonLabel: "FALAR COM ESPECIALISTA NO WHATSAPP",
  },
  alerta: {
    icon: CircleAlert,
    title: "ALERTA: SUA CNH PODE ESTAR EM RISCO",
    text: "Seu histórico indica que você pode estar próximo do limite de pontos ou ter cometido infrações que exigem atenção.",
    consequences: [
      "Abertura de processo de suspensão",
      "Acúmulo de pontos no prontuário",
      "Penalidades administrativas pelo DETRAN",
    ],
    urgency:
      "QUANTO ANTES VOCÊ ANALISAR SUA SITUAÇÃO, MAIOR A CHANCE DE EVITAR A SUSPENSÃO.",
    buttonLabel: "ANALISAR MINHA CNH NO WHATSAPP",
  },
};

const QuizSection = () => {
  const [pontos, setPontos] = useState("");
  const [multaGravissima, setMultaGravissima] = useState("");
  const [notificacao, setNotificacao] = useState("");
  const [infracoesSelected, setInfracoesSelected] = useState<string[]>([]);
  const [result, setResult] = useState<ResultType>(null);
  const [showResult, setShowResult] = useState(false);

  const handleInfracaoToggle = (infracao: string) => {
    if (infracao === "Nenhuma dessas" || infracao === "Não sei") {
      setInfracoesSelected([infracao]);
      return;
    }
    setInfracoesSelected((prev) => {
      const filtered = prev.filter(
        (i) => i !== "Nenhuma dessas" && i !== "Não sei"
      );
      return filtered.includes(infracao)
        ? filtered.filter((i) => i !== infracao)
        : [...filtered, infracao];
    });
  };

  const calculateResult = (): ResultType => {
    const hasCassacaoInfracao = infracoesSelected.some((i) =>
      cassacaoInfracoes.includes(i)
    );
    if (hasCassacaoInfracao) return "cassacao";

    const highPoints = pontos === "40 pontos ou mais";
    const hasNotificacao = notificacao === "Sim";
    const hasMultaGravissima = multaGravissima === "Sim";

    if (highPoints || (hasNotificacao && hasMultaGravissima)) return "suspensao";
    if (
      hasNotificacao ||
      hasMultaGravissima ||
      pontos === "Entre 30 e 39 pontos"
    )
      return "suspensao";

    return "alerta";
  };

  const handleSubmit = () => {
    const r = calculateResult();
    setResult(r);
    setShowResult(true);
  };

  const resultLabel =
    result === "cassacao"
      ? "Cassação"
      : result === "suspensao"
        ? "Suspensão"
        : "Alerta";

  const buildWhatsAppUrl = () => {
    const msg = encodeURIComponent(
      `Olá, acabei de fazer a análise no site CNH DE NOVO e gostaria de verificar minha situação.\n\nMinhas respostas foram:\n\nPontos na CNH: ${pontos || "Não respondido"}\nMulta gravíssima: ${multaGravissima || "Não respondido"}\nNotificação do DETRAN: ${notificacao || "Não respondido"}\nInfrações cometidas: ${infracoesSelected.length ? infracoesSelected.join(", ") : "Não respondido"}\nResultado apresentado no site: ${resultLabel}\n\nGostaria de saber se ainda posso recorrer.`
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  };

  const isFormComplete =
    pontos && multaGravissima && notificacao && infracoesSelected.length > 0;

  const currentResult = result ? results[result] : null;

  return (
    <section className="py-20 md:py-28 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-medium mb-4">
              Verifique agora o{" "}
              <span className="text-gradient">risco da sua CNH</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Responda algumas perguntas rápidas e descubra se sua carteira pode
              ser suspensa ou cassada.
            </p>
          </div>

          {!showResult ? (
            <div className="space-y-8 p-6 md:p-8 rounded-2xl bg-card border border-border shadow-card">
              {/* Pergunta 1 */}
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  Quantos pontos você possui na CNH nos últimos 12 meses?
                </Label>
                <RadioGroup value={pontos} onValueChange={setPontos}>
                  {[
                    "Não sei",
                    "Até 19 pontos",
                    "Entre 20 e 29 pontos",
                    "Entre 30 e 39 pontos",
                    "40 pontos ou mais",
                  ].map((opt) => (
                    <div key={opt} className="flex items-center gap-2">
                      <RadioGroupItem value={opt} id={`pontos-${opt}`} />
                      <Label htmlFor={`pontos-${opt}`} className="cursor-pointer">
                        {opt}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Pergunta 2 */}
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  Você recebeu alguma multa gravíssima nos últimos 12 meses?
                </Label>
                <RadioGroup
                  value={multaGravissima}
                  onValueChange={setMultaGravissima}
                >
                  {["Sim", "Não", "Não sei"].map((opt) => (
                    <div key={opt} className="flex items-center gap-2">
                      <RadioGroupItem value={opt} id={`multa-${opt}`} />
                      <Label htmlFor={`multa-${opt}`} className="cursor-pointer">
                        {opt}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Pergunta 3 */}
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  Você recebeu notificação do DETRAN sobre processo de
                  suspensão?
                </Label>
                <RadioGroup value={notificacao} onValueChange={setNotificacao}>
                  {["Sim", "Não", "Não sei"].map((opt) => (
                    <div key={opt} className="flex items-center gap-2">
                      <RadioGroupItem value={opt} id={`notif-${opt}`} />
                      <Label htmlFor={`notif-${opt}`} className="cursor-pointer">
                        {opt}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Pergunta 4 */}
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  Você cometeu alguma dessas infrações?
                </Label>
                <p className="text-sm text-muted-foreground">
                  Selecione todas que se aplicam
                </p>
                <div className="space-y-2">
                  {infracoes.map((inf) => (
                    <div key={inf} className="flex items-center gap-2">
                      <Checkbox
                        id={`inf-${inf}`}
                        checked={infracoesSelected.includes(inf)}
                        onCheckedChange={() => handleInfracaoToggle(inf)}
                      />
                      <Label htmlFor={`inf-${inf}`} className="cursor-pointer">
                        {inf}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="hero"
                size="xl"
                className="w-full"
                disabled={!isFormComplete}
                onClick={handleSubmit}
              >
                Ver Resultado
              </Button>
            </div>
          ) : (
            currentResult && (
              <div className="p-6 md:p-8 rounded-2xl bg-card border-2 border-destructive shadow-card space-y-6 animate-fade-in">
                <div className="flex items-center justify-center gap-3">
                  <currentResult.icon className="size-8 text-destructive" />
                  <h3 className="text-xl md:text-2xl font-bold text-destructive uppercase text-center">
                    {currentResult.title}
                  </h3>
                </div>

                <p className="text-muted-foreground text-center text-base">
                  {currentResult.text}
                </p>

                <div className="space-y-2">
                  <p className="font-medium text-sm text-foreground">
                    Consequências possíveis:
                  </p>
                  <ul className="space-y-1.5 ml-4">
                    {currentResult.consequences.map((c) => (
                      <li
                        key={c}
                        className="text-muted-foreground text-sm flex items-start gap-2"
                      >
                        <span className="text-destructive mt-1">•</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4">
                  <p className="text-destructive font-bold text-center text-sm md:text-base uppercase">
                    {currentResult.urgency}
                  </p>
                </div>

                <Button
                  variant="whatsapp"
                  size="xl"
                  className="w-full"
                  asChild
                >
                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="!size-5" />
                    {currentResult.buttonLabel}
                  </a>
                </Button>

                <button
                  onClick={() => {
                    setShowResult(false);
                    setResult(null);
                    setPontos("");
                    setMultaGravissima("");
                    setNotificacao("");
                    setInfracoesSelected([]);
                  }}
                  className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors underline"
                >
                  Refazer análise
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default QuizSection;
