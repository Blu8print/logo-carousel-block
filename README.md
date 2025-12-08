# Logo Carousel Block

A lightweight WordPress Gutenberg block for displaying logos in a smooth scrolling carousel with pagination, links, and mobile swipe support.

**Created by [The White Rabbit](https://whiterabbit.codes)**

## Features

- **Simple Logo Management**: Upload and manage multiple logo images
- **Logo URL Links**: Add clickable links to each logo (opens in new tab)
- **Auto Scroll**: Enable/disable automatic scrolling
- **Responsive Design**: Different logo counts for desktop (4) and mobile (2)
- **Speed Control**: Adjustable scroll speed
- **Logo Height**: Customizable logo height (40-200px)
- **Editor Consistency**: What you see in the editor matches the frontend exactly

## Installation

1. Upload the `logo-carousel-block.zip` file to your WordPress site
2. Activate the plugin through the 'Plugins' menu in WordPress
3. The "Logo Carousel Block" block will be available in the Gutenberg editor under the "Logo Carousel Block" category

## Usage

1. **Add the Block**: In the Gutenberg editor, search for "Logo Carousel Block" and add it to your page
2. **Upload Logos**: Click "Select Logos" to upload multiple logo images
3. **Add Logo Links** (Optional): Use the "Logo Links" panel in the sidebar to add clickable URLs to your logos
4. **Configure Settings**: Use the block sidebar to adjust:
   - Logo height
   - Logos per view (desktop/mobile)
   - Auto scroll on/off
   - Scroll speed

## Block Settings

### Logo Settings
- **Select/Edit Logos**: Upload or modify logo images
- **Logo Height**: Adjust the height of logos (40-200px)

### Logo Links
- **URL Input**: Add clickable links to each logo
- **Visual Indicators**: See 🔗 icon in editor for logos with links
- **Security**: All links open in new tabs with proper security attributes

### Responsive Settings
- **Desktop**: Number of logos visible on desktop screens
- **Mobile**: Number of logos visible on mobile screens

### Scroll Settings
- **Auto Scroll**: Toggle automatic scrolling on/off
- **Scroll Speed**: Control the scrolling speed (10-100)

## Technical Details

- **WordPress Version**: 6.0+
- **PHP Version**: 7.4+
- **Dependencies**: None (vanilla JavaScript, no external libraries)
- **File Size**: ~7KB (lightweight)
- **Performance**: Optimized for speed with CSS transforms and requestAnimationFrame

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Build Information

- **Version**: 1.0.3 (Logo Links Feature)
- **Build**: 20250915111618
- **Built with**: @wordpress/scripts + manual packaging
- **Bundle Size**: ~29KB total (includes all PHP files + link functionality)

## Changelog

### v1.0.4 (20250915120000) - LATEST VERSION WITH PAGINATION ✅
- **NEW**: Pagination dots functionality with clickable navigation
- **NEW**: "Show Pagination Dots" toggle in Scroll Settings panel
- **NEW**: Centered pagination dots display under logos for both editor and frontend
- **NEW**: Smooth transitions when navigating between pages
- **IMPROVED**: Enhanced responsive pagination design
- **IMPROVED**: Better accessibility with page navigation aria-labels
- **INCLUDES**: All features from v1.0.3 (logo links, visual indicators, etc.)

### v1.0.3 (20250915111618)
- **NEW**: Logo URL linking functionality
- **NEW**: "Logo Links" panel in sidebar for easy link management
- **NEW**: Visual link indicators (🔗) in editor
- **NEW**: Proper link security (target="_blank", rel="noopener noreferrer")
- **IMPROVED**: Enhanced hover effects for linked logos
- **IMPROVED**: Better accessibility with aria-labels

### v1.0.2 (20250915110233)
- **FIXED**: Missing PHP files in plugin package (inc/ directory)
- **FIXED**: "Failed to open stream" errors due to missing files
- **IMPROVED**: Manual packaging process ensures all required files are included
- **VERIFIED**: Complete plugin structure with all dependencies

### v1.0.1 (20250915105235)
- **FIXED**: Fatal error on plugin activation
- **FIXED**: Removed trait dependency issues that caused "Trait not found" errors
- **FIXED**: Simplified singleton pattern implementation
- **IMPROVED**: More reliable file loading order
- **ISSUE**: Missing inc/ directory in package (incomplete)

### v1.0.0 (20250915104639)
- Initial release (had fatal error on activation)

## Development

To modify or build this plugin:

1. Clone/download the source files
2. Run `npm install` to install dependencies
3. Run `npm run build` to build assets
4. Run `npm run plugin-zip` to create distribution package

## Support

This plugin focuses on simplicity and ease of use. For more advanced features, consider using a more comprehensive carousel plugin.

## License

GPL-2.0-or-later