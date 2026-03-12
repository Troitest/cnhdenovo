import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Send } from "lucide-react";

const WHATSAPP_NUMBER = "5500000000000";

const SITUACAO_LABELS: Record<string, string> = {
  ativa: "Ativa",
  suspensa: "Suspensa",
  cassada: "Cassada",
  "processo-suspensao": "Em processo de suspensão",
  "processo-cassacao": "Em processo de cassação",
  "nao-sei": "Não sei informar",
};

const MOTIVO_LABELS: Record<string, string> = {
  "excesso-velocidade": "Excesso de velocidade",
  "sinal-vermelho": "Avançar sinal vermelho",
  alcool: "Dirigir sob efeito de álcool",
  celular: "Uso de celular ao volante",
  estacionamento: "Estacionamento irregular",
  outro: "Outro",
};

const PRAZO_LABELS: Record<string, string> = {
  sim: "Sim, ainda está no prazo",
  acredito: "Acredito que ainda esteja",
  "nao-sei": "Não tenho certeza",
  venceu: "O prazo já venceu",
};

const CNH_TRABALHO_LABELS: Record<string, string> = {
  profissional: "Sim, sou motorista profissional",
  "sim-nao-profissional": "Sim, utilizo no trabalho mas não sou motorista profissional",
  nao: "Não utilizo para trabalho",
};

const FormSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [situacao, setSituacao] = useState("");
  const [motivo, setMotivo] = useState("");
  const [prazoAberto, setPrazoAberto] = useState("");
  const [defesa, setDefesa] = useState("");
  const [cnhTrabalho, setCnhTrabalho] = useState("");
  const [categorias, setCategorias] = useState<string[]>([]);

  const handleCategoriaToggle = (cat: string, checked: boolean) => {
    setCategorias((prev) =>
      checked ? [...prev, cat] : prev.filter((c) => c !== cat)
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const nome = (formData.get("nome") as string)?.trim();
    const telefone = (formData.get("telefone") as string)?.trim();
    const cidade = (formData.get("cidade") as string)?.trim();
    const numeroCnh = (formData.get("numeroCnh") as string)?.trim();
    const marcaVeiculo = (formData.get("marcaVeiculo") as string)?.trim();
    const modeloVeiculo = (formData.get("modeloVeiculo") as string)?.trim();
    const dataNotificacao = (formData.get("dataNotificacao") as string)?.trim();
    const prazoFinal = (formData.get("prazoFinal") as string)?.trim();
    const mensagem = (formData.get("mensagem") as string)?.trim();

    // Validação dos campos obrigatórios
    if (
      !nome || !telefone || !cidade || !numeroCnh ||
      categorias.length === 0 || !situacao || !motivo ||
      !defesa || !marcaVeiculo || !modeloVeiculo || !cnhTrabalho
    ) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setIsSubmitting(true);

    const categoriasText = categorias.join(", ");
    const situacaoText = SITUACAO_LABELS[situacao] || situacao;
    const motivoText = MOTIVO_LABELS[motivo] || motivo;
    const defesaText = defesa === "sim" ? "Sim" : "Não";
    const cnhTrabalhoText = CNH_TRABALHO_LABELS[cnhTrabalho] || cnhTrabalho;
    const veiculo = `${marcaVeiculo} ${modeloVeiculo}`;

    const msg = [
      "Olá, acabei de solicitar a análise da minha CNH pelo site e gostaria de verificar minha situação.",
      "",
      `Nome: ${nome}`,
      "",
      `Telefone: ${telefone}`,
      "",
      `Cidade / Estado: ${cidade}`,
      "",
      `Número da CNH: ${numeroCnh}`,
      "",
      `Categoria da CNH: ${categoriasText}`,
      "",
      `Situação da CNH: ${situacaoText}`,
      "",
      `Motivo da penalidade: ${motivoText}`,
      "",
      `Data aproximada da notificação: ${dataNotificacao || "NÃO INFORMADO"}`,
      "",
      `Prazo final da notificação: ${prazoFinal || "NÃO INFORMADO"}`,
      "",
      `Já apresentou defesa ou recurso: ${defesaText}`,
      "",
      `Veículo utilizado: ${veiculo}`,
      "",
      `Uso da CNH para trabalho: ${cnhTrabalhoText}`,
      "",
      `Descrição do caso: ${mensagem || "NÃO INFORMADO"}`,
      "",
      "Gostaria de saber se ainda existe possibilidade de defesa ou recurso para o meu caso.",
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    setIsSubmitting(false);
    toast.success("Redirecionando para o WhatsApp...");
  };

  return (
    <section id="formulario" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-medium mb-4">
              Solicite a <span className="text-gradient">análise do seu caso</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Preencha as informações abaixo para avaliarmos sua situação.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 p-6 md:p-8 rounded-2xl bg-card border border-border shadow-card">
            {/* Nome */}
            <div className="space-y-2">
              <Label htmlFor="nome">Nome completo <span className="text-destructive">*</span></Label>
              <Input id="nome" name="nome" placeholder="Seu nome completo" required maxLength={100} />
            </div>

            {/* Telefone */}
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone / WhatsApp <span className="text-destructive">*</span></Label>
              <Input id="telefone" name="telefone" type="tel" placeholder="(00) 00000-0000" required maxLength={20} />
            </div>

            {/* Cidade / Estado */}
            <div className="space-y-2">
              <Label htmlFor="cidade">Cidade e Estado <span className="text-destructive">*</span></Label>
              <Input id="cidade" name="cidade" placeholder="Ex: São Paulo - SP" required maxLength={100} />
            </div>

            {/* Número CNH */}
            <div className="space-y-2">
              <Label htmlFor="numeroCnh">Número da CNH <span className="text-destructive">*</span></Label>
              <Input id="numeroCnh" name="numeroCnh" placeholder="Número da sua CNH" required maxLength={20} />
            </div>

            {/* Categoria */}
            <div className="space-y-3">
              <Label>Categoria da CNH <span className="text-destructive">*</span></Label>
              <div className="flex gap-4 flex-wrap">
                {["A", "B", "C", "D", "E"].map((cat) => (
                  <div key={cat} className="flex items-center gap-2">
                    <Checkbox
                      id={`cat-${cat}`}
                      checked={categorias.includes(cat)}
                      onCheckedChange={(checked) => handleCategoriaToggle(cat, !!checked)}
                    />
                    <Label htmlFor={`cat-${cat}`} className="cursor-pointer">{cat}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Situação da CNH */}
            <div className="space-y-2">
              <Label>Situação da CNH <span className="text-destructive">*</span></Label>
              <Select value={situacao} onValueChange={setSituacao} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a situação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativa">Ativa</SelectItem>
                  <SelectItem value="suspensa">Suspensa</SelectItem>
                  <SelectItem value="cassada">Cassada</SelectItem>
                  <SelectItem value="processo-suspensao">Em processo de suspensão</SelectItem>
                  <SelectItem value="processo-cassacao">Em processo de cassação</SelectItem>
                  <SelectItem value="nao-sei">Não sei informar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Motivo */}
            <div className="space-y-2">
              <Label>Motivo da penalidade <span className="text-destructive">*</span></Label>
              <Select value={motivo} onValueChange={setMotivo} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o motivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excesso-velocidade">Excesso de velocidade</SelectItem>
                  <SelectItem value="sinal-vermelho">Avançar sinal vermelho</SelectItem>
                  <SelectItem value="alcool">Dirigir sob efeito de álcool</SelectItem>
                  <SelectItem value="celular">Uso de celular ao volante</SelectItem>
                  <SelectItem value="estacionamento">Estacionamento irregular</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Data notificação */}
            <div className="space-y-2">
              <Label htmlFor="dataNotificacao">Data aproximada da notificação recebida</Label>
              <Input id="dataNotificacao" name="dataNotificacao" type="text" placeholder="dd/mm/aaaa" maxLength={10} />
            </div>

            {/* Prazo final */}
            <div className="space-y-2">
              <Label htmlFor="prazoFinal">Prazo final informado na notificação (se souber)</Label>
              <Input id="prazoFinal" name="prazoFinal" type="text" placeholder="Exemplo: 15/04/2026" maxLength={10} />
            </div>

            {/* Prazo aberto */}
            <div className="space-y-3">
              <Label>O prazo para defesa ainda está aberto?</Label>
              <RadioGroup value={prazoAberto} onValueChange={setPrazoAberto}>
                <div className="flex flex-col gap-3">
                  {Object.entries(PRAZO_LABELS).map(([value, label]) => (
                    <div key={value} className="flex items-center gap-2">
                      <RadioGroupItem value={value} id={`prazo-${value}`} />
                      <Label htmlFor={`prazo-${value}`} className="cursor-pointer">{label}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Já apresentou defesa */}
            <div className="space-y-3">
              <Label>Você já apresentou defesa ou recurso? <span className="text-destructive">*</span></Label>
              <RadioGroup value={defesa} onValueChange={setDefesa}>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="sim" id="defesa-sim" />
                    <Label htmlFor="defesa-sim" className="cursor-pointer">Sim</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="nao" id="defesa-nao" />
                    <Label htmlFor="defesa-nao" className="cursor-pointer">Não</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Marca do veículo */}
            <div className="space-y-2">
              <Label htmlFor="marcaVeiculo">Marca do veículo que você utiliza com mais frequência <span className="text-destructive">*</span></Label>
              <Input id="marcaVeiculo" name="marcaVeiculo" placeholder="Exemplo: Chevrolet, Volkswagen, Toyota, BMW, Mercedes" required maxLength={100} />
            </div>

            {/* Modelo do veículo */}
            <div className="space-y-2">
              <Label htmlFor="modeloVeiculo">Modelo do veículo <span className="text-destructive">*</span></Label>
              <Input id="modeloVeiculo" name="modeloVeiculo" placeholder="Exemplo: Onix, Gol, Corolla, Hilux, Civic" required maxLength={100} />
            </div>

            {/* Utiliza CNH para trabalhar */}
            <div className="space-y-3">
              <Label>Você utiliza a CNH para trabalhar? <span className="text-destructive">*</span></Label>
              <RadioGroup value={cnhTrabalho} onValueChange={setCnhTrabalho}>
                <div className="flex flex-col gap-3">
                  {Object.entries(CNH_TRABALHO_LABELS).map(([value, label]) => (
                    <div key={value} className="flex items-center gap-2">
                      <RadioGroupItem value={value} id={`trabalho-${value}`} />
                      <Label htmlFor={`trabalho-${value}`} className="cursor-pointer">{label}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Mensagem */}
            <div className="space-y-2">
              <Label htmlFor="mensagem">Conte brevemente o que aconteceu (opcional)</Label>
              <Textarea id="mensagem" name="mensagem" placeholder="Descreva sua situação..." rows={4} maxLength={1000} />
            </div>

            <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isSubmitting}>
              <Send className="!size-5" />
              {isSubmitting ? "Enviando..." : "ENVIAR PARA ANÁLISE"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormSection;
