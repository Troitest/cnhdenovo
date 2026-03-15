<?php get_header(); ?>

<main class="section-dark" style="min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center;">
    <div class="container">
        <h1 style="font-size: 6rem; margin-bottom: 1rem;" class="text-gradient">404</h1>
        <p style="font-size: 1.25rem; color: var(--fg-muted); margin-bottom: 2rem;">Página não encontrada</p>
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn btn-hero">Voltar ao início</a>
    </div>
</main>

<?php get_footer(); ?>
