<?php
/**
 * Fallback template – redireciona para front-page.php
 */
get_header();
?>

<main class="section-dark section-padding">
    <div class="container">
        <?php if ( have_posts() ) : ?>
            <?php while ( have_posts() ) : the_post(); ?>
                <article style="margin-bottom: 3rem;">
                    <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">
                        <a href="<?php the_permalink(); ?>" style="color: var(--primary);"><?php the_title(); ?></a>
                    </h2>
                    <div style="color: var(--fg-muted);">
                        <?php the_excerpt(); ?>
                    </div>
                </article>
            <?php endwhile; ?>
        <?php else : ?>
            <p style="color: var(--fg-muted);">Nenhum conteúdo encontrado.</p>
        <?php endif; ?>
    </div>
</main>

<?php get_footer(); ?>
