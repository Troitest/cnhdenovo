<?php get_header(); ?>

<main class="section-dark section-padding" style="padding-top: 7rem;">
    <div class="container">
        <div style="max-width: 48rem; margin: 0 auto;">
            <?php while ( have_posts() ) : the_post(); ?>
                <h1 style="font-size: 2.25rem; margin-bottom: 2rem;"><?php the_title(); ?></h1>
                <div style="color: var(--fg-muted); line-height: 1.8;">
                    <?php the_content(); ?>
                </div>
            <?php endwhile; ?>
        </div>
    </div>
</main>

<?php get_footer(); ?>
