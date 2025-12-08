<?php
/**
 * Register Class to register the blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! class_exists( 'LCB_Register_Blocks' ) ) {

    class LCB_Register_Blocks {

        /**
         * Singleton instance
         *
         * @var LCB_Register_Blocks
         */
        private static $instance = null;

        /**
         * Constructor
         *
         * @return void
         */
        public function __construct() {
            add_action( 'init', [ $this, 'register_blocks' ], 20 );
            add_action( 'init', [ $this, 'register_block_category' ], 10 );
        }

        /**
         * Get instance
         *
         * @return LCB_Register_Blocks
         */
        public static function instance() {
            if ( is_null( self::$instance ) ) {
                self::$instance = new self();
            }
            return self::$instance;
        }

        /**
         * Register block category
         *
         * @return void
         */
        public function register_block_category() {
            if ( ! function_exists( 'register_block_type' ) ) {
                return;
            }

            add_filter( 'block_categories_all', function( $categories ) {
                return array_merge(
                    array(
                        array(
                            'slug'  => 'logo-carousel-block',
                            'title' => __( 'Logo Carousel Block', 'logo-carousel-block' ),
                        ),
                    ),
                    $categories
                );
            }, 10, 2 );
        }

        /**
         * Register blocks
         *
         * @return void
         */
        public function register_blocks() {
            // Check if Gutenberg is active
            if ( ! function_exists( 'register_block_type' ) ) {
                return;
            }

            $blocks_dir = LCB_PATH . 'build/blocks/';

            if ( ! is_dir( $blocks_dir ) ) {
                return;
            }

            // Get all block directories
            $blocks = glob( $blocks_dir . '*', GLOB_ONLYDIR );

            foreach ( $blocks as $block_dir ) {
                $block_json = $block_dir . '/block.json';
                if ( file_exists( $block_json ) ) {
                    register_block_type( $block_json );
                }
            }
        }
    }
}