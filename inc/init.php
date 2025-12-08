<?php
/**
 * Initialize all the functionality
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( 'LCB_Init' ) ) {

    class LCB_Init {

        /**
         * Singleton instance
         *
         * @var LCB_Init
         */
        private static $instance = null;

        /**
         * Constructor
         *
         * @return void
         */
        public function __construct() {
            $this->includes();
        }

        /**
         * Get instance
         *
         * @return LCB_Init
         */
        public static function instance() {
            if ( is_null( self::$instance ) ) {
                self::$instance = new self();
            }
            return self::$instance;
        }

        /**
         * Include Files
         *
         * @return void
         */
        private function includes() {
            require_once LCB_INC . 'classes/register.php';
            require_once LCB_INC . 'classes/enqueue.php';

            // Initialize classes
            LCB_Register_Blocks::instance();
            LCB_Enqueue_Assets::instance();
        }
    }

    // Initialize
    LCB_Init::instance();
}