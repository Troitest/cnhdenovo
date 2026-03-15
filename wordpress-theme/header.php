<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Especialistas em CNH Suspensa e Cassada. Analisamos seu caso e buscamos a melhor estratégia para recuperar seu direito de dirigir.">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- NAVBAR -->
<nav class="navbar">
    <div class="container">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="navbar-logo">
            <?php if ( has_custom_logo() ) : ?>
                <?php the_custom_logo(); ?>
            <?php else : ?>
                <img src="<?php echo esc_url( get_template_directory_uri() . '/images/logo.png' ); ?>" alt="CNH de Novo">
            <?php endif; ?>
        </a>
        <a href="<?php echo esc_url( cnhdenovo_whatsapp_url() ); ?>" target="_blank" rel="noopener noreferrer" class="btn btn-hero btn-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            <span class="hide-mobile">Fale conosco</span>
        </a>
    </div>
</nav>
