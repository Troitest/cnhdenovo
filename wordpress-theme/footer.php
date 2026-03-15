<!-- FOOTER -->
<footer class="site-footer">
    <div class="container">
        <div class="footer-inner">
            <div class="footer-logo">
                <?php if ( has_custom_logo() ) : ?>
                    <?php the_custom_logo(); ?>
                <?php else : ?>
                    <img src="<?php echo esc_url( get_template_directory_uri() . '/images/logo.png' ); ?>" alt="CNH de Novo">
                <?php endif; ?>
                <p>Especialistas em CNH Suspensa e Cassada.</p>
            </div>
            <div class="footer-social">
                <a href="<?php echo esc_url( cnhdenovo_whatsapp_url() ); ?>" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="WhatsApp">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                </a>
                <a href="<?php echo esc_url( cnhdenovo_instagram_url() ); ?>" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; <?php echo date( 'Y' ); ?> CNH de Novo. Todos os direitos reservados.</p>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
