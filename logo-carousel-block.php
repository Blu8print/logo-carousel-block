<?php
/**
 * Plugin Name:       Logo Carousel Block
 * Plugin URI:        https://whiterabbit.codes
 * Description:       A professional Gutenberg block for displaying logos in a smooth scrolling carousel with pagination, hover effects, and mobile swipe navigation.
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Version:           1.0.1
 * Author:            The White Rabbit - Sebastiaan Castenmiller
 * Author URI:        https://whiterabbit.codes
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
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