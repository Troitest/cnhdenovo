/**
 * CNH de Novo – Formulário de Análise → WhatsApp
 */
(function () {
  var WHATSAPP_NUMBER = '5561936182228';

  var form = document.getElementById('analise-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var fd = new FormData(form);

    var nome = (fd.get('nome') || '').trim();
    var telefone = (fd.get('telefone') || '').trim();
    var cidade = (fd.get('cidade') || '').trim();
    var numeroCnh = (fd.get('numeroCnh') || '').trim();
    var situacao = (fd.get('situacao') || '').trim();
    var motivo = (fd.get('motivo') || '').trim();
    var defesa = (fd.get('defesa') || '').trim();
    var marcaVeiculo = (fd.get('marcaVeiculo') || '').trim();
    var modeloVeiculo = (fd.get('modeloVeiculo') || '').trim();
    var cnhTrabalho = (fd.get('cnhTrabalho') || '').trim();

    // Categorias (checkboxes)
    var categorias = fd.getAll('categoria');

    // Campos opcionais
    var dataNotificacao = (fd.get('dataNotificacao') || '').trim() || 'NÃO INFORMADO';
    var prazoFinal = (fd.get('prazoFinal') || '').trim() || 'NÃO INFORMADO';
    var prazoAberto = (fd.get('prazoAberto') || '').trim() || 'NÃO INFORMADO';
    var mensagem = (fd.get('mensagem') || '').trim() || 'NÃO INFORMADO';

    // Validação obrigatórios
    if (!nome || !telefone || !cidade || !numeroCnh || categorias.length === 0 || !situacao || !motivo || !defesa || !marcaVeiculo || !modeloVeiculo || !cnhTrabalho) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    var veiculo = marcaVeiculo + ' ' + modeloVeiculo;

    var msg = [
      'Olá, acabei de solicitar a análise da minha CNH pelo site e gostaria de verificar minha situação.',
      '',
      'Nome: ' + nome,
      '',
      'Telefone: ' + telefone,
      '',
      'Cidade / Estado: ' + cidade,
      '',
      'Número da CNH: ' + numeroCnh,
      '',
      'Categoria da CNH: ' + categorias.join(', '),
      '',
      'Situação da CNH: ' + situacao,
      '',
      'Motivo da penalidade: ' + motivo,
      '',
      'Data aproximada da notificação: ' + dataNotificacao,
      '',
      'Prazo final da notificação: ' + prazoFinal,
      '',
      'Prazo para defesa: ' + prazoAberto,
      '',
      'Já apresentou defesa ou recurso: ' + defesa,
      '',
      'Veículo utilizado: ' + veiculo,
      '',
      'Uso da CNH para trabalho: ' + cnhTrabalho,
      '',
      'Descrição do caso: ' + mensagem,
      '',
      'Gostaria de saber se ainda existe possibilidade de defesa ou recurso para o meu caso.'
    ].join('\n');

    var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
    window.open(url, '_blank', 'noopener,noreferrer');
  });
})();
