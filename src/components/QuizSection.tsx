import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageCircle, ShieldAlert, AlertTriangle, AlertCircle, ShieldCheck } from "lucide-react";

const WHATSAPP_NUMBER = "5561936182228";

type ResultType = "cassacao" | "suspensao" | "alerta" | "sem_risco" | null;

const infracoesOptions = [
  "Dirigir sob efeito de álcool ou drogas",
  "Recusar teste do bafômetro",
  "Participar de racha",
  "Realizar manobra perigosa",
  "Excesso de velocidade acima de 50%",
  "Omitir socorro em acidente",
  "Ultrapassagem perigosa",
  "Transpor bloqueio viário",
  "Nenhuma dessas",
  "Não sei",
];

const resultConfig: Record<
  Exclude<ResultType, null>,
  {
    icon: typeof ShieldAlert;
    badge: string;
    badgeColor: string;
    borderColor: string;
    title: string;
    text: string;
    consequences?: string[];
    urgency: string;
    buttonLabel: string;
  }
> = {
  cassacao: {
    icon: ShieldAlert,
    badge: "ALERTA MÁXIMO",
    badgeColor: "bg-[hsl(270,70%,50%)] text-[hsl(0,0%,100%)]",
    borderColor: "border-[hsl(270,70%,50%)]",
    title: "VOCÊ PODE TER A CNH CASSADA",
    text: "A cassação da CNH é uma penalidade extremamente grave.",
    consequences: [
      "Proibição de dirigir por 2 anos",
      "Necessidade de refazer todo o processo de habilitação",
      "Novos exames médicos, psicológicos, teóricos e práticos",
    ],
    urgency:
      "MAS NÃO SE PREOCUPE. EM MUITOS CASOS AINDA EXISTE POSSIBILIDADE DE DEFESA OU RECURSO ADMINISTRATIVO.",
    buttonLabel: "ANALISAR MINHA CNH NO WHATSAPP",
  },
  suspensao: {
    icon: AlertTriangle,
    badge: "ATENÇÃO",
    badgeColor: "bg-destructive text-destructive-foreground",
    borderColor: "border-destructive",
    title: "VOCÊ TERÁ A CNH SUSPENSA",
    text: "Seu histórico indica forte risco de processo de suspensão da CNH.",
    consequences: [
      "Proibição temporária de dirigir",
      "Curso obrigatório de reciclagem",
      "Processo administrativo no DETRAN",
    ],
    urgency:
      "MAS NÃO SE PREOCUPE, EM MUITOS CASOS AINDA É POSSÍVEL RECORRER E EVITAR A SUSPENSÃO.",
    buttonLabel: "FALAR COM ESPECIALISTA",
  },
  alerta: {
    icon: AlertCircle,
    badge: "ATENÇÃO",
    badgeColor: "bg-accent text-accent-foreground",
    borderColor: "border-accent",
    title: "SUA CNH PODE ESTAR PRÓXIMA DO LIMITE DE SUSPENSÃO",
    text: "Se novas infrações ocorrerem, um processo administrativo pode ser aberto.",
    urgency: "VERIFIQUE SUA SITUAÇÃO ANTES QUE O PROBLEMA AUMENTE.",
    buttonLabel: "VERIFICAR MINHA CNH",
  },
  sem_risco: {
    icon: ShieldCheck,
    badge: "SEM RISCO NO MOMENTO",
    badgeColor: "bg-[hsl(142,70%,45%)] text-[hsl(0,0%,100%)]",
    borderColor: "border-[hsl(142,70%,45%)]",
    title: "ATÉ O MOMENTO SUA CNH NÃO APRESENTA RISCO DE SUSPENSÃO",
    text: "Mesmo assim é importante acompanhar regularmente sua pontuação. Se você conhece alguém que esteja com a CNH suspensa ou cassada ou tenha dúvidas sobre multas ou pontuação, nossa equipe pode ajudar.",
    urgency: "",
    buttonLabel: "FALAR CONOSCO",
  },
};

const QuizSection = () => {
  const [pontos, setPontos] = useState("");
  const [gravissimas, setGravissimas] = useState("");
  const [notificacao, setNotificacao] = useState("");
  const [dirigiuSuspensa, setDirigiuSuspensa] = useState("");
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
    const sel = infracoesSelected;
    const hasAlcool = sel.includes("Dirigir sob efeito de álcool ou drogas");
    const hasRacha = sel.includes("Participar de racha");
    const hasManobra = sel.includes("Realizar manobra perigosa");
    const hasBafometro = sel.includes("Recusar teste do bafômetro");
    const hasVelocidade = sel.includes("Excesso de velocidade acima de 50%");
    const dirigiuSusp = dirigiuSuspensa === "Sim";
    const recebeuNotif = notificacao === "Sim";

    // CASSAÇÃO
    if (dirigiuSusp) return "cassacao";
    if (hasRacha) return "cassacao";
    if (hasManobra) return "cassacao";
    if (hasAlcool && recebeuNotif) return "cassacao";

    // SUSPENSÃO
    if (pontos === "40 pontos ou mais") return "suspensao";
    if (pontos === "Entre 30 e 39 pontos" && (gravissimas === "Uma" || gravissimas === "Duas ou mais")) return "suspensao";
    if (pontos === "Entre 20 e 29 pontos" && gravissimas === "Duas ou mais") return "suspensao";
    if (hasBafometro) return "suspensao";
    if (hasVelocidade) return "suspensao";
    if (recebeuNotif) return "suspensao";

    // ALERTA
    if (pontos === "Entre 20 e 29 pontos" && gravissimas !== "Duas ou mais") return "alerta";
    if (pontos === "Entre 30 e 39 pontos" && (gravissimas === "Nenhuma" || gravissimas === "Uma")) return "alerta";
    if (pontos === "Não sei" || gravissimas === "Não sei") return "alerta";
    if (sel.includes("Não sei")) return "alerta";

    // SEM RISCO
    if (
      (pontos === "Até 19 pontos") &&
      (gravissimas === "Nenhuma") &&
      (notificacao === "Não") &&
      (sel.includes("Nenhuma dessas") || sel.length === 0)
    ) return "sem_risco";

    return "alerta";
  };

  const handleSubmit = () => {
    setResult(calculateResult());
    setShowResult(true);
  };

  const resultLabel =
    result === "cassacao" ? "Cassação"
    : result === "suspensao" ? "Suspensão"
    : result === "alerta" ? "Alerta"
    : "Sem risco";

  const buildWhatsAppUrl = () => {
    const msg = encodeURIComponent(
      `Olá, acabei de fazer a análise da minha CNH no site e gostaria de verificar minha situação.\n\nMinhas respostas foram:\n\nPontos na CNH: ${pontos || "Não respondido"}\nInfrações gravíssimas: ${gravissimas || "Não respondido"}\nNotificação do DETRAN: ${notificacao || "Não respondido"}\nDirigir com CNH suspensa: ${dirigiuSuspensa || "Não respondido"}\nInfrações cometidas: ${infracoesSelected.length ? infracoesSelected.join(", ") : "Não respondido"}\nResultado apresentado: ${resultLabel}\n\nGostaria de saber se existe possibilidade de defesa ou recurso.`
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  };

  const isFormComplete =
    pontos && gravissimas && notificacao && dirigiuSuspensa && infracoesSelected.length > 0;

  const currentResult = result ? resultConfig[result] : null;

  const resetQuiz = () => {
    setShowResult(false);
    setResult(null);
    setPontos("");
    setGravissimas("");
    setNotificacao("");
    setDirigiuSuspensa("");
    setInfracoesSelected([]);
  };

  return (
    <section id="quiz" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <p className="text-accent font-bold text-sm tracking-widest uppercase mb-3">
              Análise da situação da sua CNH
            </p>
            <h2 className="text-2xl md:text-4xl font-medium mb-4 text-foreground">
              DESCUBRA AGORA SE SUA CNH PODE SER{" "}
              <span className="text-gradient">SUSPENSA OU CASSADA</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Responda algumas perguntas rápidas e veja se sua carteira de motorista pode estar em risco.
            </p>
          </div>

          {!showResult ? (
            <div className="space-y-8 p-6 md:p-8 rounded-2xl bg-card border border-border shadow-card">
              {/* Pergunta 1 */}
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  1. Quantos pontos você possui na CNH nos últimos 12 meses?
                </Label>
                <RadioGroup value={pontos} onValueChange={setPontos}>
                  {["Até 19 pontos", "Entre 20 e 29 pontos", "Entre 30 e 39 pontos", "40 pontos ou mais", "Não sei"].map((opt) => (
                    <div key={opt} className="flex items-center gap-2">
                      <RadioGroupItem value={opt} id={`p1-${opt}`} />
                      <Label htmlFor={`p1-${opt}`} className="cursor-pointer font-normal">{opt}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Pergunta 2 */}
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  2. Quantas infrações gravíssimas você teve nos últimos 12 meses?
                </Label>
                <RadioGroup value={gravissimas} onValueChange={setGravissimas}>
                  {["Nenhuma", "Uma", "Duas ou mais", "Não sei"].map((opt) => (
                    <div key={opt} className="flex items-center gap-2">
                      <RadioGroupItem value={opt} id={`p2-${opt}`} />
                      <Label htmlFor={`p2-${opt}`} className="cursor-pointer font-normal">{opt}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Pergunta 3 */}
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  3. Você recebeu alguma notificação do DETRAN informando processo de suspensão da CNH?
                </Label>
                <RadioGroup value={notificacao} onValueChange={setNotificacao}>
                  {["Sim", "Não", "Não tenho certeza"].map((opt) => (
                    <div key={opt} className="flex items-center gap-2">
                      <RadioGroupItem value={opt} id={`p3-${opt}`} />
                      <Label htmlFor={`p3-${opt}`} className="cursor-pointer font-normal">{opt}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Pergunta 4 */}
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  4. Você já dirigiu algum veículo enquanto sua CNH estava suspensa?
                </Label>
                <RadioGroup value={dirigiuSuspensa} onValueChange={setDirigiuSuspensa}>
                  {["Sim", "Não", "Não sei"].map((opt) => (
                    <div key={opt} className="flex items-center gap-2">
                      <RadioGroupItem value={opt} id={`p4-${opt}`} />
                      <Label htmlFor={`p4-${opt}`} className="cursor-pointer font-normal">{opt}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Pergunta 5 */}
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  5. Você cometeu alguma dessas infrações?
                </Label>
                <p className="text-sm text-muted-foreground">Selecione todas que se aplicam</p>
                <div className="space-y-2">
                  {infracoesOptions.map((inf) => (
                    <div key={inf} className="flex items-center gap-2">
                      <Checkbox
                        id={`inf-${inf}`}
                        checked={infracoesSelected.includes(inf)}
                        onCheckedChange={() => handleInfracaoToggle(inf)}
                      />
                      <Label htmlFor={`inf-${inf}`} className="cursor-pointer font-normal">{inf}</Label>
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
                VER RESULTADO
              </Button>
            </div>
          ) : (
            currentResult && (
              <div className={`p-6 md:p-8 rounded-2xl bg-card border-2 ${currentResult.borderColor} shadow-card space-y-6 animate-fade-in`}>
                {/* Badge */}
                <div className="flex justify-center">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${currentResult.badgeColor}`}>
                    {currentResult.badge}
                  </span>
                </div>

                {/* Icon + Title */}
                <div className="flex flex-col items-center gap-3">
                  <currentResult.icon className={`size-10 ${
                    result === "cassacao" ? "text-[hsl(270,70%,50%)]"
                    : result === "suspensao" ? "text-destructive"
                    : result === "alerta" ? "text-accent"
                    : "text-[hsl(142,70%,45%)]"
                  }`} />
                  <h3 className={`text-lg md:text-2xl font-bold uppercase text-center ${
                    result === "cassacao" ? "text-[hsl(270,70%,50%)]"
                    : result === "suspensao" ? "text-destructive"
                    : result === "alerta" ? "text-accent"
                    : "text-[hsl(142,70%,45%)]"
                  }`}>
                    {currentResult.title}
                  </h3>
                </div>

                <p className="text-muted-foreground text-center text-base">
                  {currentResult.text}
                </p>

                {currentResult.consequences && (
                  <div className="space-y-2">
                    <p className="font-medium text-sm text-foreground">
                      Consequências possíveis:
                    </p>
                    <ul className="space-y-1.5 ml-4">
                      {currentResult.consequences.map((c) => (
                        <li key={c} className="text-muted-foreground text-sm flex items-start gap-2">
                          <span className={`mt-1 ${
                            result === "cassacao" ? "text-[hsl(270,70%,50%)]"
                            : "text-destructive"
                          }`}>•</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentResult.urgency && (
                  <div className={`rounded-xl p-4 ${
                    result === "cassacao" ? "bg-[hsl(270,70%,50%,0.1)] border border-[hsl(270,70%,50%,0.3)]"
                    : result === "suspensao" ? "bg-destructive/10 border border-destructive/30"
                    : result === "alerta" ? "bg-accent/10 border border-accent/30"
                    : ""
                  }`}>
                    <p className={`font-bold text-center text-sm md:text-base uppercase ${
                      result === "cassacao" ? "text-[hsl(270,70%,50%)]"
                      : result === "suspensao" ? "text-destructive"
                      : result === "alerta" ? "text-accent"
                      : ""
                    }`}>
                      {currentResult.urgency}
                    </p>
                  </div>
                )}

                <Button
                  variant={result === "sem_risco" ? "hero" : "whatsapp"}
                  size="xl"
                  className="w-full"
                  asChild
                >
                  <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="!size-5" />
                    {currentResult.buttonLabel}
                  </a>
                </Button>

                <button
                  onClick={resetQuiz}
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
