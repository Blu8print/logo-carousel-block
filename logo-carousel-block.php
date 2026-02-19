<?php
/**
 * Plugin Name:       Logo Scroller Block
 * Plugin URI:        www.blu8print.com
 * Description:       A lightweight, dependency-free Gutenberg block for infinite logo carousels. No jQuery, no bloat — just smooth CSS animation with full client control from the WordPress editor.
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Tested up to:      6.7
 * Version:           1.1.0
 * Author:            Blueprint 8
 * Author URI:        www.blu8print.com
 * License:           GPL v2 or later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       logo-carousel-block
 * Domain Path:       /languages
 */

// Stop Direct Access
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Logo Carousel Block Main Class
 */
if ( ! class_exists( 'Logo_Carousel_Block' ) ) {

    final class Logo_Carousel_Block {

        // Version
        const VERSION = '1.0.4';

        // Instance
        private static $instance = null;

        /**
         * Constructor
         */
        public function __construct() {
            $this->constants();
            $this->includes();
        }

        /**
         * Define Constants
         *
         * @return void
         */
        public function constants() {
            $constants = [
                'LCB_VERSION' => self::VERSION,
                'LCB_FILE'    => __FILE__,
                'LCB_URL'     => plugin_dir_url( __FILE__ ),
                'LCB_PATH'    => plugin_dir_path( __FILE__ ),
                'LCB_INC'     => plugin_dir_path( __FILE__ ) . 'inc/',
            ];

            foreach ( $constants as $key => $value ) {
                if ( ! defined( $key ) ) {
                    define( $key, $value );
                }
            }
        }

        /**
         * Include Files
         *
         * @return void
         */
        public function includes() {
            require_once LCB_INC . 'init.php';
        }

        /**
         * Get Instance (Singleton)
         *
         * @return Logo_Carousel_Block
         */
        public static function instance() {
            if ( is_null( self::$instance ) ) {
                self::$instance = new self();
            }
            return self::$instance;
        }

    }

    /**
     * Initialize the plugin
     */
    function logo_carousel_block() {
        return Logo_Carousel_Block::instance();
    }

    // Start the plugin
    logo_carousel_block();
}