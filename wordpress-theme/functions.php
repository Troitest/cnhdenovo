<?php
/**
 * CNH de Novo – functions.php
 */

// Segurança: impedir acesso direto
if ( ! defined( 'ABSPATH' ) ) exit;

// ========== Setup do tema ==========
function cnhdenovo_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption' ) );
    add_theme_support( 'custom-logo', array(
        'height'      => 80,
        'width'       => 300,
        'flex-width'  => true,
        'flex-height' => true,
    ) );
}
add_action( 'after_setup_theme', 'cnhdenovo_setup' );

// ========== Enqueue styles ==========
function cnhdenovo_scripts() {
    wp_enqueue_style( 'cnhdenovo-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Russo+One&display=swap', array(), null );
    wp_enqueue_style( 'cnhdenovo-style', get_stylesheet_uri(), array( 'cnhdenovo-fonts' ), '1.0.0' );
    wp_enqueue_script( 'cnhdenovo-quiz', get_template_directory_uri() . '/js/quiz.js', array(), '1.0.0', true );
    wp_enqueue_script( 'cnhdenovo-form', get_template_directory_uri() . '/js/form.js', array(), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'cnhdenovo_scripts' );

// ========== Customizer: WhatsApp number ==========
function cnhdenovo_customizer( $wp_customize ) {
    $wp_customize->add_section( 'cnhdenovo_whatsapp', array(
        'title'    => 'WhatsApp',
        'priority' => 30,
    ) );

    $wp_customize->add_setting( 'whatsapp_number', array(
        'default'           => '5561936182228',
        'sanitize_callback' => 'sanitize_text_field',
    ) );

    $wp_customize->add_control( 'whatsapp_number', array(
        'label'   => 'Número do WhatsApp (com código do país)',
        'section' => 'cnhdenovo_whatsapp',
        'type'    => 'text',
    ) );

    $wp_customize->add_setting( 'instagram_url', array(
        'default'           => 'https://www.instagram.com/cnhdenovo',
        'sanitize_callback' => 'esc_url_raw',
    ) );

    $wp_customize->add_control( 'instagram_url', array(
        'label'   => 'URL do Instagram',
        'section' => 'cnhdenovo_whatsapp',
        'type'    => 'url',
    ) );
}
add_action( 'customize_register', 'cnhdenovo_customizer' );

// Helper para pegar o número
function cnhdenovo_whatsapp_number() {
    return get_theme_mod( 'whatsapp_number', '5561936182228' );
}

function cnhdenovo_whatsapp_url( $message = 'Olá! Preciso de ajuda para recuperar minha CNH.' ) {
    return 'https://wa.me/' . cnhdenovo_whatsapp_number() . '?text=' . rawurlencode( $message );
}

function cnhdenovo_instagram_url() {
    return get_theme_mod( 'instagram_url', 'https://www.instagram.com/cnhdenovo' );
}
