/**
 * CNH de Novo – Quiz interativo
 */
(function () {
  var WHATSAPP_NUMBER = '5561936182228';
  var container = document.getElementById('quiz-container');
  if (!container) return;

  var state = {
    pontos: '',
    gravissimas: '',
    notificacao: '',
    dirigiuSuspensa: '',
    infracoes: []
  };

  var infracoesOptions = [
    'Dirigir sob efeito de álcool ou drogas',
    'Recusar teste do bafômetro',
    'Participar de racha',
    'Realizar manobra perigosa',
    'Excesso de velocidade acima de 50%',
    'Omitir socorro em acidente',
    'Ultrapassagem perigosa',
    'Transpor bloqueio viário',
    'Nenhuma dessas',
    'Não sei'
  ];

  function calculateResult() {
    var sel = state.infracoes;
    var hasAlcool = sel.indexOf('Dirigir sob efeito de álcool ou drogas') >= 0;
    var hasRacha = sel.indexOf('Participar de racha') >= 0;
    var hasManobra = sel.indexOf('Realizar manobra perigosa') >= 0;
    var hasBafometro = sel.indexOf('Recusar teste do bafômetro') >= 0;
    var hasVelocidade = sel.indexOf('Excesso de velocidade acima de 50%') >= 0;
    var dirigiuSusp = state.dirigiuSuspensa === 'Sim';
    var recebeuNotif = state.notificacao === 'Sim';

    if (dirigiuSusp || hasRacha || hasManobra || (hasAlcool && recebeuNotif)) return 'cassacao';
    if (state.pontos === '40 pontos ou mais') return 'suspensao';
    if (state.pontos === 'Entre 30 e 39 pontos' && (state.gravissimas === 'Uma' || state.gravissimas === 'Duas ou mais')) return 'suspensao';
    if (state.pontos === 'Entre 20 e 29 pontos' && state.gravissimas === 'Duas ou mais') return 'suspensao';
    if (hasBafometro || hasVelocidade || recebeuNotif) return 'suspensao';
    if (state.pontos === 'Entre 20 e 29 pontos' || state.pontos === 'Entre 30 e 39 pontos') return 'alerta';
    if (state.pontos === 'Não sei' || state.gravissimas === 'Não sei' || sel.indexOf('Não sei') >= 0) return 'alerta';
    if (state.pontos === 'Até 19 pontos' && state.gravissimas === 'Nenhuma' && state.notificacao === 'Não' && (sel.indexOf('Nenhuma dessas') >= 0 || sel.length === 0)) return 'sem_risco';
    return 'alerta';
  }

  var resultConfig = {
    cassacao: {
      badge: 'ALERTA MÁXIMO', badgeColor: 'background:hsl(270,70%,50%);color:#fff;',
      borderColor: 'hsl(270,70%,50%)', accentColor: 'hsl(270,70%,50%)',
      title: 'VOCÊ PODE TER A CNH CASSADA',
      text: 'A cassação da CNH é uma penalidade extremamente grave.',
      consequences: ['Proibição de dirigir por 2 anos', 'Necessidade de refazer todo o processo de habilitação', 'Novos exames médicos, psicológicos, teóricos e práticos'],
      urgency: 'MAS NÃO SE PREOCUPE. EM MUITOS CASOS AINDA EXISTE POSSIBILIDADE DE DEFESA OU RECURSO ADMINISTRATIVO.',
      buttonLabel: 'ANALISAR MINHA CNH NO WHATSAPP', isGreen: true
    },
    suspensao: {
      badge: 'ATENÇÃO', badgeColor: 'background:var(--destructive);color:#fff;',
      borderColor: 'var(--destructive)', accentColor: 'var(--destructive)',
      title: 'VOCÊ TERÁ A CNH SUSPENSA',
      text: 'Seu histórico indica forte risco de processo de suspensão da CNH.',
      consequences: ['Proibição temporária de dirigir', 'Curso obrigatório de reciclagem', 'Processo administrativo no DETRAN'],
      urgency: 'MAS NÃO SE PREOCUPE, EM MUITOS CASOS AINDA É POSSÍVEL RECORRER E EVITAR A SUSPENSÃO.',
      buttonLabel: 'FALAR COM ESPECIALISTA', isGreen: true
    },
    alerta: {
      badge: 'ATENÇÃO', badgeColor: 'background:var(--primary);color:var(--primary-fg);',
      borderColor: 'var(--primary)', accentColor: 'var(--primary)',
      title: 'SUA CNH PODE ESTAR PRÓXIMA DO LIMITE DE SUSPENSÃO',
      text: 'Se novas infrações ocorrerem, um processo administrativo pode ser aberto.',
      consequences: null,
      urgency: 'VERIFIQUE SUA SITUAÇÃO ANTES QUE O PROBLEMA AUMENTE.',
      buttonLabel: 'VERIFICAR MINHA CNH', isGreen: false
    },
    sem_risco: {
      badge: 'SEM RISCO NO MOMENTO', badgeColor: 'background:hsl(142,70%,45%);color:#fff;',
      borderColor: 'hsl(142,70%,45%)', accentColor: 'hsl(142,70%,45%)',
      title: 'ATÉ O MOMENTO SUA CNH NÃO APRESENTA RISCO DE SUSPENSÃO',
      text: 'Mesmo assim é importante acompanhar regularmente sua pontuação. Se você conhece alguém que esteja com a CNH suspensa ou cassada, nossa equipe pode ajudar.',
      consequences: null, urgency: '',
      buttonLabel: 'FALAR CONOSCO', isGreen: false
    }
  };

  function buildWhatsAppUrl(resultKey) {
    var label = resultKey === 'cassacao' ? 'Cassação' : resultKey === 'suspensao' ? 'Suspensão' : resultKey === 'alerta' ? 'Alerta' : 'Sem risco';
    var msg = 'Olá, acabei de fazer a análise da minha CNH no site e gostaria de verificar minha situação.\n\nMinhas respostas foram:\n\nPontos na CNH: ' + (state.pontos || 'Não respondido') + '\nInfrações gravíssimas: ' + (state.gravissimas || 'Não respondido') + '\nNotificação do DETRAN: ' + (state.notificacao || 'Não respondido') + '\nDirigir com CNH suspensa: ' + (state.dirigiuSuspensa || 'Não respondido') + '\nInfrações cometidas: ' + (state.infracoes.length ? state.infracoes.join(', ') : 'Não respondido') + '\nResultado apresentado: ' + label + '\n\nGostaria de saber se existe possibilidade de defesa ou recurso.';
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
  }

  function renderRadioGroup(name, options, currentValue) {
    return options.map(function (opt) {
      var checked = currentValue === opt ? ' checked' : '';
      return '<label class="radio-option"><input type="radio" name="' + name + '" value="' + opt + '"' + checked + '> ' + opt + '</label>';
    }).join('');
  }

  function renderQuiz() {
    var isComplete = state.pontos && state.gravissimas && state.notificacao && state.dirigiuSuspensa && state.infracoes.length > 0;

    var html = '';
    // Q1
    html += '<div class="quiz-question"><label class="question-title">1. Quantos pontos você possui na CNH nos últimos 12 meses?</label><div class="radio-group">';
    html += renderRadioGroup('pontos', ['Até 19 pontos', 'Entre 20 e 29 pontos', 'Entre 30 e 39 pontos', '40 pontos ou mais', 'Não sei'], state.pontos);
    html += '</div></div>';

    // Q2
    html += '<div class="quiz-question"><label class="question-title">2. Quantas infrações gravíssimas você teve nos últimos 12 meses?</label><div class="radio-group">';
    html += renderRadioGroup('gravissimas', ['Nenhuma', 'Uma', 'Duas ou mais', 'Não sei'], state.gravissimas);
    html += '</div></div>';

    // Q3
    html += '<div class="quiz-question"><label class="question-title">3. Você recebeu alguma notificação do DETRAN informando processo de suspensão da CNH?</label><div class="radio-group">';
    html += renderRadioGroup('notificacao', ['Sim', 'Não', 'Não tenho certeza'], state.notificacao);
    html += '</div></div>';

    // Q4
    html += '<div class="quiz-question"><label class="question-title">4. Você já dirigiu algum veículo enquanto sua CNH estava suspensa?</label><div class="radio-group">';
    html += renderRadioGroup('dirigiuSuspensa', ['Sim', 'Não', 'Não sei'], state.dirigiuSuspensa);
    html += '</div></div>';

    // Q5
    html += '<div class="quiz-question"><label class="question-title">5. Você cometeu alguma dessas infrações?</label><p style="font-size:0.875rem;color:var(--fg-muted);margin-bottom:0.5rem;">Selecione todas que se aplicam</p><div class="checkbox-group">';
    infracoesOptions.forEach(function (inf) {
      var checked = state.infracoes.indexOf(inf) >= 0 ? ' checked' : '';
      html += '<label class="checkbox-option"><input type="checkbox" name="infracoes" value="' + inf + '"' + checked + '> ' + inf + '</label>';
    });
    html += '</div></div>';

    html += '<button type="button" id="quiz-submit" class="btn btn-hero btn-xl btn-full"' + (isComplete ? '' : ' disabled style="opacity:0.5;cursor:not-allowed;"') + '>VER RESULTADO</button>';

    container.innerHTML = html;
    bindQuizEvents();
  }

  function renderResult(resultKey) {
    var cfg = resultConfig[resultKey];
    var html = '<div class="result-box" style="border-color:' + cfg.borderColor + ';">';
    html += '<div style="text-align:center;"><span class="result-badge" style="' + cfg.badgeColor + '">' + cfg.badge + '</span></div>';
    html += '<h3 class="result-title" style="color:' + cfg.accentColor + ';">' + cfg.title + '</h3>';
    html += '<p class="result-text">' + cfg.text + '</p>';

    if (cfg.consequences) {
      html += '<div class="result-consequences"><h4>Consequências possíveis:</h4><ul>';
      cfg.consequences.forEach(function (c) {
        html += '<li><span class="bullet" style="color:' + cfg.accentColor + ';">•</span> ' + c + '</li>';
      });
      html += '</ul></div>';
    }

    if (cfg.urgency) {
      html += '<div class="urgency-box" style="background:' + cfg.accentColor + '15;border:1px solid ' + cfg.accentColor + '40;color:' + cfg.accentColor + ';">' + cfg.urgency + '</div>';
    }

    var btnClass = cfg.isGreen ? 'btn-whatsapp' : 'btn-hero';
    html += '<a href="' + buildWhatsAppUrl(resultKey) + '" target="_blank" rel="noopener noreferrer" class="btn ' + btnClass + ' btn-xl btn-full">';
    html += '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg> ';
    html += cfg.buttonLabel + '</a>';

    html += '<button type="button" id="quiz-reset" class="reset-link">Refazer análise</button>';
    html += '</div>';

    container.innerHTML = html;

    document.getElementById('quiz-reset').addEventListener('click', function () {
      state = { pontos: '', gravissimas: '', notificacao: '', dirigiuSuspensa: '', infracoes: [] };
      renderQuiz();
    });
  }

  function bindQuizEvents() {
    // Radio buttons
    container.querySelectorAll('input[type="radio"]').forEach(function (input) {
      input.addEventListener('change', function () {
        state[this.name] = this.value;
        renderQuiz();
      });
    });

    // Checkboxes
    container.querySelectorAll('input[name="infracoes"]').forEach(function (input) {
      input.addEventListener('change', function () {
        var val = this.value;
        if (val === 'Nenhuma dessas' || val === 'Não sei') {
          state.infracoes = this.checked ? [val] : [];
        } else {
          state.infracoes = state.infracoes.filter(function (i) { return i !== 'Nenhuma dessas' && i !== 'Não sei'; });
          if (this.checked) {
            state.infracoes.push(val);
          } else {
            state.infracoes = state.infracoes.filter(function (i) { return i !== val; });
          }
        }
        renderQuiz();
      });
    });

    // Submit
    var submitBtn = document.getElementById('quiz-submit');
    if (submitBtn && !submitBtn.disabled) {
      submitBtn.addEventListener('click', function () {
        var resultKey = calculateResult();
        renderResult(resultKey);
      });
    }
  }

  renderQuiz();
})();
