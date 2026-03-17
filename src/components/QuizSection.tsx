import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  MessageCircle,
  ShieldAlert,
  AlertTriangle,
  AlertCircle,
  ShieldCheck,
  ArrowLeft,
  Phone,
  Mail,
  Copy,
  Check,
} from "lucide-react";

const WHATSAPP_NUMBER = "5561936182228";
const PHONE_DISPLAY = "(61) 9 3618-2228";
const EMAIL = "contato@cnhdenovo.com.br";

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

interface Question {
  label: string;
  options: string[];
  multi?: boolean;
}

const questions: Question[] = [
  {
    label: "Quantos pontos você possui na CNH nos últimos 12 meses?",
    options: [
      "Até 19 pontos",
      "Entre 20 e 29 pontos",
      "Entre 30 e 39 pontos",
      "40 pontos ou mais",
      "Não sei",
    ],
  },
  {
    label: "Quantas infrações gravíssimas você teve nos últimos 12 meses?",
    options: ["Nenhuma", "Uma", "Duas ou mais", "Não sei"],
  },
  {
    label:
      "Você recebeu alguma notificação do DETRAN informando processo de suspensão da CNH?",
    options: ["Sim", "Não", "Não tenho certeza"],
  },
  {
    label:
      "Você já dirigiu algum veículo enquanto sua CNH estava suspensa?",
    options: ["Sim", "Não", "Não sei"],
  },
  {
    label: "Você cometeu alguma dessas infrações?",
    options: infracoesOptions,
    multi: true,
  },
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

/* ─── Click-to-copy chip ─── */
const CopyChip = ({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
}) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-foreground text-sm hover:bg-secondary/80 transition-colors group"
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

/* ─── Main component ─── */
const QuizSection = () => {
  const [step, setStep] = useState(0); // 0-4 = questions, 5 = result
  const [answers, setAnswers] = useState<string[]>(["", "", "", "", ""]);
  const [infracoesSelected, setInfracoesSelected] = useState<string[]>([]);
  const [result, setResult] = useState<ResultType>(null);

  const totalSteps = questions.length;
  const isLastStep = step === totalSteps - 1;
  const showResult = step === totalSteps;

  const handleSingleSelect = useCallback(
    (option: string) => {
      const next = [...answers];
      next[step] = option;
      setAnswers(next);
      // auto-advance after short delay
      setTimeout(() => {
        if (step < totalSteps - 1) {
          setStep((s) => s + 1);
        } else {
          // last question for single-select would auto-submit, but Q5 is multi
        }
      }, 300);
    },
    [step, answers, totalSteps]
  );

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
    const [pontos, gravissimas, notificacao, dirigiuSuspensa] = answers;
    const sel = infracoesSelected;
    const hasAlcool = sel.includes("Dirigir sob efeito de álcool ou drogas");
    const hasRacha = sel.includes("Participar de racha");
    const hasManobra = sel.includes("Realizar manobra perigosa");
    const hasBafometro = sel.includes("Recusar teste do bafômetro");
    const hasVelocidade = sel.includes("Excesso de velocidade acima de 50%");
    const dirigiuSusp = dirigiuSuspensa === "Sim";
    const recebeuNotif = notificacao === "Sim";

    if (dirigiuSusp) return "cassacao";
    if (hasRacha) return "cassacao";
    if (hasManobra) return "cassacao";
    if (hasAlcool && recebeuNotif) return "cassacao";

    if (pontos === "40 pontos ou mais") return "suspensao";
    if (
      pontos === "Entre 30 e 39 pontos" &&
      (gravissimas === "Uma" || gravissimas === "Duas ou mais")
    )
      return "suspensao";
    if (pontos === "Entre 20 e 29 pontos" && gravissimas === "Duas ou mais")
      return "suspensao";
    if (hasBafometro) return "suspensao";
    if (hasVelocidade) return "suspensao";
    if (recebeuNotif) return "suspensao";

    if (
      pontos === "Entre 20 e 29 pontos" &&
      gravissimas !== "Duas ou mais"
    )
      return "alerta";
    if (
      pontos === "Entre 30 e 39 pontos" &&
      (gravissimas === "Nenhuma" || gravissimas === "Uma")
    )
      return "alerta";
    if (pontos === "Não sei" || gravissimas === "Não sei") return "alerta";
    if (sel.includes("Não sei")) return "alerta";

    if (
      pontos === "Até 19 pontos" &&
      gravissimas === "Nenhuma" &&
      notificacao === "Não" &&
      (sel.includes("Nenhuma dessas") || sel.length === 0)
    )
      return "sem_risco";

    return "alerta";
  };

  const handleSubmit = () => {
    setResult(calculateResult());
    setStep(totalSteps);
  };

  const goBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const resetQuiz = () => {
    setStep(0);
    setResult(null);
    setAnswers(["", "", "", "", ""]);
    setInfracoesSelected([]);
  };

  const resultLabel =
    result === "cassacao"
      ? "Cassação"
      : result === "suspensao"
      ? "Suspensão"
      : result === "alerta"
      ? "Alerta"
      : "Sem risco";

  const buildWhatsAppUrl = () => {
    const msg = encodeURIComponent(
      `Olá, acabei de fazer a análise da minha CNH no site e gostaria de verificar minha situação.\n\nMinhas respostas foram:\n\nPontos na CNH: ${answers[0] || "Não respondido"}\nInfrações gravíssimas: ${answers[1] || "Não respondido"}\nNotificação do DETRAN: ${answers[2] || "Não respondido"}\nDirigir com CNH suspensa: ${answers[3] || "Não respondido"}\nInfrações cometidas: ${infracoesSelected.length ? infracoesSelected.join(", ") : "Não respondido"}\nResultado apresentado: ${resultLabel}\n\nGostaria de saber se existe possibilidade de defesa ou recurso.`
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  };

  const currentResult = result ? resultConfig[result] : null;
  const currentQ = questions[step] as Question | undefined;

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
              Responda algumas perguntas rápidas e veja se sua carteira de
              motorista pode estar em risco.
            </p>
          </div>

          {/* Contact chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <CopyChip icon={Phone} label={PHONE_DISPLAY} value="5561936182228" />
            <CopyChip icon={Mail} label={EMAIL} value={EMAIL} />
          </div>

          {/* ─── Question cards ─── */}
          {!showResult && currentQ && (
            <div className="p-6 md:p-8 rounded-2xl bg-card border border-border shadow-card">
              {/* Progress bar */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground font-medium">
                  Pergunta {step + 1} de {totalSteps}
                </span>
                {step > 0 && (
                  <button
                    onClick={goBack}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="size-3" />
                    Voltar
                  </button>
                )}
              </div>
              <div className="w-full h-1.5 rounded-full bg-secondary mb-6">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-500"
                  style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                />
              </div>

              {/* Question */}
              <p className="text-base md:text-lg font-medium text-foreground mb-6">
                {step + 1}. {currentQ.label}
              </p>

              {/* Options */}
              {currentQ.multi ? (
                <>
                  <p className="text-sm text-muted-foreground mb-3">
                    Selecione todas que se aplicam
                  </p>
                  <div className="space-y-2 mb-6">
                    {currentQ.options.map((opt) => (
                      <label
                        key={opt}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                          infracoesSelected.includes(opt)
                            ? "border-accent bg-accent/10"
                            : "border-border hover:border-muted-foreground"
                        }`}
                      >
                        <Checkbox
                          checked={infracoesSelected.includes(opt)}
                          onCheckedChange={() => handleInfracaoToggle(opt)}
                        />
                        <span className="text-sm text-foreground">{opt}</span>
                      </label>
                    ))}
                  </div>
                  <Button
                    variant="hero"
                    size="xl"
                    className="w-full"
                    disabled={infracoesSelected.length === 0}
                    onClick={handleSubmit}
                  >
                    VER RESULTADO
                  </Button>
                </>
              ) : (
                <div className="space-y-2">
                  {currentQ.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSingleSelect(opt)}
                      className={`w-full text-left p-4 rounded-lg border text-sm transition-all ${
                        answers[step] === opt
                          ? "border-accent bg-accent/10 text-foreground"
                          : "border-border hover:border-muted-foreground text-foreground"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ─── Result card ─── */}
          {showResult && currentResult && (
            <div
              className={`p-6 md:p-8 rounded-2xl bg-card border-2 ${currentResult.borderColor} shadow-card space-y-6`}
            >
              <div className="flex justify-center">
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${currentResult.badgeColor}`}
                >
                  {currentResult.badge}
                </span>
              </div>

              <div className="flex flex-col items-center gap-3">
                <currentResult.icon
                  className={`size-10 ${
                    result === "cassacao"
                      ? "text-[hsl(270,70%,50%)]"
                      : result === "suspensao"
                      ? "text-destructive"
                      : result === "alerta"
                      ? "text-accent"
                      : "text-[hsl(142,70%,45%)]"
                  }`}
                />
                <h3
                  className={`text-lg md:text-2xl font-bold uppercase text-center ${
                    result === "cassacao"
                      ? "text-[hsl(270,70%,50%)]"
                      : result === "suspensao"
                      ? "text-destructive"
                      : result === "alerta"
                      ? "text-accent"
                      : "text-[hsl(142,70%,45%)]"
                  }`}
                >
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
                      <li
                        key={c}
                        className="text-muted-foreground text-sm flex items-start gap-2"
                      >
                        <span
                          className={`mt-1 ${
                            result === "cassacao"
                              ? "text-[hsl(270,70%,50%)]"
                              : "text-destructive"
                          }`}
                        >
                          •
                        </span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {currentResult.urgency && (
                <div
                  className={`rounded-xl p-4 ${
                    result === "cassacao"
                      ? "bg-[hsl(270,70%,50%,0.1)] border border-[hsl(270,70%,50%,0.3)]"
                      : result === "suspensao"
                      ? "bg-destructive/10 border border-destructive/30"
                      : result === "alerta"
                      ? "bg-accent/10 border border-accent/30"
                      : ""
                  }`}
                >
                  <p
                    className={`font-bold text-center text-sm md:text-base uppercase ${
                      result === "cassacao"
                        ? "text-[hsl(270,70%,50%)]"
                        : result === "suspensao"
                        ? "text-destructive"
                        : result === "alerta"
                        ? "text-accent"
                        : ""
                    }`}
                  >
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
                onClick={resetQuiz}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors underline"
              >
                Refazer análise
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuizSection;
