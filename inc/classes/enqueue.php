<?php
/**
 * Enqueue Class to enqueue scripts and styles
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( 'LCB_Enqueue_Assets' ) ) {

    class LCB_Enqueue_Assets {

        /**
         * Singleton instance
         *
         * @var LCB_Enqueue_Assets
         */
        private static $instance = null;

        /**
         * Constructor
         *
         * @return void
         */
        public function __construct() {
            add_action( 'enqueue_block_assets', [ $this, 'enqueue_global_assets' ] );
            add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_editor_assets' ] );
        }

        /**
         * Get instance
         *
         * @return LCB_Enqueue_Assets
         */
        public static function instance() {
            if ( is_null( self::$instance ) ) {
                self::$instance = new self();
            }
            return self::$instance;
        }

        /**
         * Enqueue global assets (frontend and editor)
         *
         * @return void
         */
        public function enqueue_global_assets() {
            $global_css = LCB_URL . 'build/global/index.css';
            $global_css_path = LCB_PATH . 'build/global/index.css';

            if ( file_exists( $global_css_path ) ) {
                wp_enqueue_style(
                    'logo-carousel-block-global',
                    $global_css,
                    [],
                    filemtime( $global_css_path )
                );
            }
        }

        /**
         * Enqueue editor assets
         *
         * @return void
         */
        public function enqueue_editor_assets() {
            $editor_js = LCB_URL . 'build/global/index.js';
            $editor_js_path = LCB_PATH . 'build/global/index.js';

            if ( file_exists( $editor_js_path ) ) {
                $asset_file = LCB_PATH . 'build/global/index.asset.php';
                $asset = file_exists( $asset_file ) ? include $asset_file : array(
                    'dependencies' => [],
                    'version'      => filemtime( $editor_js_path )
                );

                wp_enqueue_script(
                    'logo-carousel-block-editor',
                    $editor_js,
                    $asset['dependencies'],
                    $asset['version'],
                    true
                );
            }
        }
    }
}