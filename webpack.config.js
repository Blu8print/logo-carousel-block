const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = {
    ...defaultConfig,
    entry: {
        'blocks/simple-logo-scroller/index': path.resolve( process.cwd(), 'src/blocks/simple-logo-scroller', 'index.js' ),
        'blocks/simple-logo-scroller/view': path.resolve( process.cwd(), 'src/blocks/simple-logo-scroller', 'view.js' ),
        'global/index': path.resolve( process.cwd(), 'src/global', 'index.js' ),
    },
    output: {
        ...defaultConfig.output,
        path: path.resolve( process.cwd(), 'build' ),
    },
};