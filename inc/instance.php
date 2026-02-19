<?php
/**
 * Instance Trait
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

trait SLS_Instance {

    /**
     * Singleton instance
     *
     * @var object
     */
    private static $instances = [];

    /**
     * Get class instance
     *
     * @return object
     */
    public static function instance() {
        $class = get_called_class();
        if ( ! isset( self::$instances[ $class ] ) ) {
            self::$instances[ $class ] = new $class();
        }

        return self::$instances[ $class ];
    }

    /**
     * Prevent object cloning
     *
     * @return void
     */
    public function __clone() {
        _doing_it_wrong( __FUNCTION__, __( 'Something went wrong.', 'logo-carousel-block' ), '1.1.0' );
    }

    /**
     * Disable unserializing
     *
     * @return void
     */
    public function __wakeup() {
        _doing_it_wrong( __FUNCTION__, __( 'Something went wrong.', 'logo-carousel-block' ), '1.1.0' );
    }
}