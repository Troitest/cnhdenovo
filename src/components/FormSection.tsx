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

const FormSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Formulário enviado com sucesso! Entraremos em contato em breve.");
      (e.target as HTMLFormElement).reset();
    }, 1500);
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
              <Label htmlFor="nome">Nome completo</Label>
              <Input id="nome" name="nome" placeholder="Seu nome completo" required maxLength={100} />
            </div>

            {/* Telefone */}
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone / WhatsApp</Label>
              <Input id="telefone" name="telefone" type="tel" placeholder="(00) 00000-0000" required maxLength={20} />
            </div>

            {/* Cidade / Estado */}
            <div className="space-y-2">
              <Label htmlFor="cidade">Cidade e Estado</Label>
              <Input id="cidade" name="cidade" placeholder="Ex: São Paulo - SP" required maxLength={100} />
            </div>

            {/* Número CNH */}
            <div className="space-y-2">
              <Label htmlFor="numeroCnh">Número da CNH</Label>
              <Input id="numeroCnh" name="numeroCnh" placeholder="Número da sua CNH" maxLength={20} />
            </div>

            {/* Categoria */}
            <div className="space-y-3">
              <Label>Categoria da CNH</Label>
              <div className="flex gap-4 flex-wrap">
                {["A", "B", "C", "D", "E"].map((cat) => (
                  <div key={cat} className="flex items-center gap-2">
                    <Checkbox id={`cat-${cat}`} name="categoria" value={cat} />
                    <Label htmlFor={`cat-${cat}`} className="cursor-pointer">{cat}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Situação da CNH */}
            <div className="space-y-2">
              <Label>Situação da CNH</Label>
              <Select name="situacao" required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a situação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="suspensa">Suspensa</SelectItem>
                  <SelectItem value="cassada">Cassada</SelectItem>
                  <SelectItem value="processo">Processo de suspensão em andamento</SelectItem>
                  <SelectItem value="nao-sei">Não tenho certeza</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Motivo */}
            <div className="space-y-2">
              <Label>Motivo da penalidade (se souber)</Label>
              <Select name="motivo">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o motivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pontos">Excesso de pontos</SelectItem>
                  <SelectItem value="lei-seca">Lei seca</SelectItem>
                  <SelectItem value="gravissima">Multa gravíssima</SelectItem>
                  <SelectItem value="bafometro">Recusa ao bafômetro</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Data notificação */}
            <div className="space-y-2">
              <Label htmlFor="dataNotificacao">Data aproximada da notificação recebida</Label>
              <Input id="dataNotificacao" name="dataNotificacao" type="date" />
            </div>

            {/* Já apresentou defesa */}
            <div className="space-y-3">
              <Label>Você já apresentou defesa ou recurso?</Label>
              <RadioGroup name="defesa" defaultValue="">
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

            {/* Mensagem */}
            <div className="space-y-2">
              <Label htmlFor="mensagem">Conte brevemente o que aconteceu (opcional)</Label>
              <Textarea id="mensagem" name="mensagem" placeholder="Descreva sua situação..." rows={4} maxLength={1000} />
            </div>

            <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isSubmitting}>
              <Send className="!size-5" />
              {isSubmitting ? "Enviando..." : "Enviar para análise"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormSection;
