<?php get_header(); ?>

<!-- ========== HERO ========== -->
<section class="hero">
    <div class="hero-bg">
        <img src="<?php echo esc_url( get_template_directory_uri() . '/images/hero-image.jpg' ); ?>" alt="CNH brasileira">
        <div class="hero-overlay"></div>
    </div>
    <div class="container">
        <div class="hero-content">
            <div class="hero-badge">⚠️ Especialistas em CNH Suspensa e Cassada</div>
            <h1>Perdeu a CNH? <span class="text-gradient">Nós ajudamos você a ter sua CNH de novo.</span></h1>
            <p>Especialistas em defesa de motoristas com CNH suspensa ou cassada. Analisamos seu caso e buscamos a melhor estratégia para recuperar seu direito de dirigir.</p>
            <div class="hero-buttons">
                <a href="<?php echo esc_url( cnhdenovo_whatsapp_url() ); ?>" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                    Falar no WhatsApp agora
                </a>
                <a href="#formulario" class="btn btn-hero-outline btn-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    Analisar meu caso
                </a>
            </div>
        </div>
    </div>
    <div class="hero-line"></div>
</section>

<!-- ========== PROBLEM ========== -->
<section class="section-alt section-padding">
    <div class="container">
        <div class="section-header">
            <h2>CNH suspensa ou cassada pode trazer <span class="text-gradient">grandes prejuízos</span></h2>
        </div>
        <div class="grid-2" style="max-width: 56rem; margin: 0 auto 3rem;">
            <?php
            $problems = array(
                array( 'text' => 'Perda imediata da capacidade de trabalhar dirigindo' ),
                array( 'text' => 'Multas altíssimas e novos processos administrativos' ),
                array( 'text' => 'Proibição de dirigir por meses ou até anos' ),
                array( 'text' => 'Necessidade de refazer todo o processo de habilitação' ),
            );
            foreach ( $problems as $p ) : ?>
                <div class="card problem-card">
                    <div class="card-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                    </div>
                    <p><?php echo esc_html( $p['text'] ); ?></p>
                </div>
            <?php endforeach; ?>
        </div>
        <p style="text-align: center; color: var(--fg-muted); max-width: 42rem; margin: 0 auto; font-size: 1.125rem; line-height: 1.7;">
            Muitas pessoas perdem o prazo de defesa ou apresentam recursos errados. Com orientação adequada, é possível contestar penalidades e buscar a recuperação da sua CNH.
        </p>
    </div>
</section>

<!-- ========== SOLUTION ========== -->
<section class="section-dark section-padding">
    <div class="container">
        <div class="section-header">
            <h2>Como podemos <span class="text-gradient">ajudar você</span></h2>
        </div>
        <div class="grid-4" style="max-width: 64rem; margin: 0 auto 3.5rem;">
            <?php
            $solutions = array(
                array( 'title' => 'Análise completa', 'desc' => 'Análise completa do processo administrativo' ),
                array( 'title' => 'Defesa e recursos', 'desc' => 'Elaboração de defesa e recursos' ),
                array( 'title' => 'Acompanhamento', 'desc' => 'Acompanhamento do processo junto ao DETRAN' ),
                array( 'title' => 'Estratégia jurídica', 'desc' => 'Estratégia jurídica para recuperar sua CNH' ),
            );
            foreach ( $solutions as $s ) : ?>
                <div class="card card-center">
                    <div class="card-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/></svg>
                    </div>
                    <h3 style="font-weight:500; font-size:1.125rem; margin-bottom:0.5rem;"><?php echo esc_html( $s['title'] ); ?></h3>
                    <p style="color: var(--fg-muted); font-size: 0.875rem;"><?php echo esc_html( $s['desc'] ); ?></p>
                </div>
            <?php endforeach; ?>
        </div>
        <div class="highlight-box">
            <p>"Mesmo que sua CNH esteja suspensa ou cassada, ainda podem existir <span class="accent">caminhos legais</span> para recuperar o direito de dirigir."</p>
        </div>
    </div>
</section>

<!-- ========== QUIZ ========== -->
<section id="quiz" class="section-dark section-padding">
    <div class="container">
        <div class="section-header">
            <p style="color: var(--primary); font-weight: 700; font-size: 0.875rem; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.75rem;">Análise da situação da sua CNH</p>
            <h2>DESCUBRA AGORA SE SUA CNH PODE SER <span class="text-gradient">SUSPENSA OU CASSADA</span></h2>
            <p>Responda algumas perguntas rápidas e veja se sua carteira de motorista pode estar em risco.</p>
        </div>

        <div class="quiz-box" id="quiz-container">
            <!-- Quiz é renderizado via JavaScript -->
        </div>
    </div>
</section>

<!-- ========== CNH RULES ========== -->
<section class="section-alt section-padding">
    <div class="container">
        <div style="max-width: 48rem; margin: 0 auto;">
            <!-- Regras de Suspensão -->
            <div style="margin-bottom: 3rem;">
                <div class="rules-heading">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary);"><path d="M12 3 2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/></svg>
                    <h2>REGRAS DE SUSPENSÃO DA CNH</h2>
                </div>
                <p style="color: var(--fg-muted); margin-bottom: 1.5rem;">Uma das principais causas de suspensão é o excesso de pontos no período de 12 meses. Atualmente os limites são:</p>
                <div class="grid-3" style="margin-bottom: 1.5rem;">
                    <div class="points-card"><p class="points">40 pontos</p><p class="desc">quando não há infração gravíssima</p></div>
                    <div class="points-card"><p class="points">30 pontos</p><p class="desc">quando existe uma infração gravíssima</p></div>
                    <div class="points-card"><p class="points">20 pontos</p><p class="desc">quando existem duas ou mais infrações gravíssimas</p></div>
                </div>
                <p style="color: var(--fg-muted); font-size: 0.875rem; font-style: italic;">Motoristas profissionais com atividade remunerada registrada na CNH possuem limite de 40 pontos independentemente da quantidade de infrações gravíssimas.</p>
            </div>

            <!-- Infrações com suspensão direta -->
            <div style="margin-bottom: 3rem;">
                <div class="rules-heading">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--destructive);"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    <h3>INFRAÇÕES QUE GERAM SUSPENSÃO DIRETA</h3>
                </div>
                <ul class="rules-list">
                    <?php
                    $infracoes = array(
                        'Dirigir sob influência de álcool ou drogas',
                        'Recusar teste do bafômetro',
                        'Participar de racha',
                        'Realizar manobras perigosas',
                        'Excesso de velocidade acima de 50%',
                        'Omitir socorro em acidente',
                        'Transpor bloqueio viário',
                    );
                    foreach ( $infracoes as $inf ) : ?>
                        <li><span class="bullet" style="color: var(--destructive);">•</span> <?php echo esc_html( $inf ); ?></li>
                    <?php endforeach; ?>
                </ul>
            </div>

            <!-- Cassação -->
            <div>
                <div class="rules-heading">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--purple);"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    <h3>CASSAÇÃO DA CNH</h3>
                </div>
                <p style="color: var(--fg-muted); margin-bottom: 1rem;">Principais causas previstas no Art. 263 do Código de Trânsito Brasileiro:</p>
                <ul class="rules-list" style="margin-bottom: 1.5rem;">
                    <?php
                    $cassacao = array(
                        'Dirigir com a CNH suspensa',
                        'Reincidir em infrações graves no período de 12 meses',
                        'Participar de racha',
                        'Realizar manobras perigosas',
                        'Permitir que pessoa sem CNH conduza o veículo',
                        'Fraude na obtenção da CNH',
                        'Condenação judicial por crime de trânsito',
                    );
                    foreach ( $cassacao as $c ) : ?>
                        <li><span class="bullet" style="color: var(--purple);">•</span> <?php echo esc_html( $c ); ?></li>
                    <?php endforeach; ?>
                </ul>
                <div class="info-box">
                    <p><strong>Consequência:</strong> o motorista fica proibido de dirigir por 2 anos e depois precisa refazer todo o processo de habilitação.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ========== URGENT ========== -->
<section class="section-alt section-padding urgent-section">
    <div class="urgent-glow"></div>
    <div class="container">
        <div class="urgent-content">
            <div class="urgent-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <h2 style="font-size: 1.875rem; font-weight: 500; margin-bottom: 1.5rem;">Não espere <span class="text-gradient">piorar a situação</span> da sua CNH</h2>
            <p style="font-size: 1.125rem; color: var(--fg-muted); margin-bottom: 2.5rem; line-height: 1.7;">
                Quanto antes seu caso for analisado, maiores são as chances de construir uma defesa eficiente.
            </p>
            <a href="<?php echo esc_url( cnhdenovo_whatsapp_url() ); ?>" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                Falar com especialista no WhatsApp
            </a>
        </div>
    </div>
</section>

<!-- ========== FORM ========== -->
<section id="formulario" class="section-dark section-padding">
    <div class="container">
        <div class="form-section">
            <div class="section-header">
                <h2>Solicite a <span class="text-gradient">análise do seu caso</span></h2>
                <p>Preencha as informações abaixo para avaliarmos sua situação.</p>
            </div>
            <form id="analise-form" class="form-box">
                <!-- Nome -->
                <div class="form-group">
                    <label>Nome completo <span class="required">*</span></label>
                    <input type="text" name="nome" class="form-input" placeholder="Seu nome completo" required maxlength="100">
                </div>
                <!-- Telefone -->
                <div class="form-group">
                    <label>Telefone / WhatsApp <span class="required">*</span></label>
                    <input type="tel" name="telefone" class="form-input" placeholder="(00) 00000-0000" required maxlength="20">
                </div>
                <!-- Cidade -->
                <div class="form-group">
                    <label>Cidade e Estado <span class="required">*</span></label>
                    <input type="text" name="cidade" class="form-input" placeholder="Ex: São Paulo - SP" required maxlength="100">
                </div>
                <!-- Número CNH -->
                <div class="form-group">
                    <label>Número da CNH <span class="required">*</span></label>
                    <input type="text" name="numeroCnh" class="form-input" placeholder="Número da sua CNH" required maxlength="20">
                </div>
                <!-- Categoria -->
                <div class="form-group">
                    <label>Categoria da CNH <span class="required">*</span></label>
                    <div class="checkbox-row">
                        <label class="checkbox-option"><input type="checkbox" name="categoria" value="A"> A</label>
                        <label class="checkbox-option"><input type="checkbox" name="categoria" value="B"> B</label>
                        <label class="checkbox-option"><input type="checkbox" name="categoria" value="C"> C</label>
                        <label class="checkbox-option"><input type="checkbox" name="categoria" value="D"> D</label>
                        <label class="checkbox-option"><input type="checkbox" name="categoria" value="E"> E</label>
                    </div>
                </div>
                <!-- Situação -->
                <div class="form-group">
                    <label>Situação da CNH <span class="required">*</span></label>
                    <select name="situacao" class="form-select" required>
                        <option value="">Selecione a situação</option>
                        <option value="Ativa">Ativa</option>
                        <option value="Suspensa">Suspensa</option>
                        <option value="Cassada">Cassada</option>
                        <option value="Em processo de suspensão">Em processo de suspensão</option>
                        <option value="Em processo de cassação">Em processo de cassação</option>
                        <option value="Não sei informar">Não sei informar</option>
                    </select>
                </div>
                <!-- Motivo -->
                <div class="form-group">
                    <label>Motivo da penalidade <span class="required">*</span></label>
                    <select name="motivo" class="form-select" required>
                        <option value="">Selecione o motivo</option>
                        <option value="Excesso de velocidade">Excesso de velocidade</option>
                        <option value="Avançar sinal vermelho">Avançar sinal vermelho</option>
                        <option value="Dirigir sob efeito de álcool">Dirigir sob efeito de álcool</option>
                        <option value="Uso de celular ao volante">Uso de celular ao volante</option>
                        <option value="Estacionamento irregular">Estacionamento irregular</option>
                        <option value="Outro">Outro</option>
                    </select>
                </div>
                <!-- Data notificação -->
                <div class="form-group">
                    <label>Data aproximada da notificação recebida</label>
                    <input type="text" name="dataNotificacao" class="form-input" placeholder="dd/mm/aaaa" maxlength="10">
                </div>
                <!-- Prazo final -->
                <div class="form-group">
                    <label>Prazo final informado na notificação (se souber)</label>
                    <input type="text" name="prazoFinal" class="form-input" placeholder="Exemplo: 15/04/2026" maxlength="10">
                </div>
                <!-- Prazo aberto -->
                <div class="form-group">
                    <label>O prazo para defesa ainda está aberto?</label>
                    <div class="radio-group">
                        <label class="radio-option"><input type="radio" name="prazoAberto" value="Sim, ainda está no prazo"> Sim, ainda está no prazo</label>
                        <label class="radio-option"><input type="radio" name="prazoAberto" value="Acredito que ainda esteja"> Acredito que ainda esteja</label>
                        <label class="radio-option"><input type="radio" name="prazoAberto" value="Não tenho certeza"> Não tenho certeza</label>
                        <label class="radio-option"><input type="radio" name="prazoAberto" value="O prazo já venceu"> O prazo já venceu</label>
                    </div>
                </div>
                <!-- Defesa -->
                <div class="form-group">
                    <label>Você já apresentou defesa ou recurso? <span class="required">*</span></label>
                    <div class="radio-group" style="flex-direction: row; gap: 1.5rem;">
                        <label class="radio-option"><input type="radio" name="defesa" value="Sim" required> Sim</label>
                        <label class="radio-option"><input type="radio" name="defesa" value="Não"> Não</label>
                    </div>
                </div>
                <!-- Marca -->
                <div class="form-group">
                    <label>Marca do veículo <span class="required">*</span></label>
                    <input type="text" name="marcaVeiculo" class="form-input" placeholder="Ex: Chevrolet, Volkswagen, Toyota" required maxlength="100">
                </div>
                <!-- Modelo -->
                <div class="form-group">
                    <label>Modelo do veículo <span class="required">*</span></label>
                    <input type="text" name="modeloVeiculo" class="form-input" placeholder="Ex: Onix, Gol, Corolla" required maxlength="100">
                </div>
                <!-- CNH trabalho -->
                <div class="form-group">
                    <label>Você utiliza a CNH para trabalhar? <span class="required">*</span></label>
                    <div class="radio-group">
                        <label class="radio-option"><input type="radio" name="cnhTrabalho" value="Sim, sou motorista profissional" required> Sim, sou motorista profissional</label>
                        <label class="radio-option"><input type="radio" name="cnhTrabalho" value="Sim, utilizo no trabalho mas não sou motorista profissional"> Sim, utilizo no trabalho mas não sou motorista profissional</label>
                        <label class="radio-option"><input type="radio" name="cnhTrabalho" value="Não utilizo para trabalho"> Não utilizo para trabalho</label>
                    </div>
                </div>
                <!-- Mensagem -->
                <div class="form-group">
                    <label>Conte brevemente o que aconteceu (opcional)</label>
                    <textarea name="mensagem" class="form-textarea" placeholder="Descreva sua situação..." maxlength="1000"></textarea>
                </div>
                <button type="submit" class="btn btn-hero btn-xl btn-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    ENVIAR PARA ANÁLISE
                </button>
            </form>
        </div>
    </div>
</section>

<!-- ========== CONTACT ========== -->
<section class="section-alt section-padding">
    <div class="container">
        <div class="section-header">
            <h2>Fale conosco <span class="text-gradient">agora</span></h2>
        </div>
        <div class="contact-buttons">
            <a href="<?php echo esc_url( cnhdenovo_whatsapp_url() ); ?>" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                WhatsApp
            </a>
            <a href="<?php echo esc_url( cnhdenovo_instagram_url() ); ?>" target="_blank" rel="noopener noreferrer" class="btn btn-hero-outline btn-xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                Instagram
            </a>
        </div>
    </div>
</section>

<?php get_footer(); ?>
