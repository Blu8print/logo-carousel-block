# Logo Scroller Block

A lightweight, dependency-free WordPress Gutenberg block for infinite logo carousels. No jQuery, no bloat — just smooth scrolling with full client control from the WordPress editor.

**By [Blueprint 8](https://www.blu8print.com)**

## Features

- **Simple Logo Management**: Upload and manage multiple logo images
- **Logo URL Links**: Add clickable links to each logo (opens in new tab)
- **Auto Scroll**: Enable/disable automatic scrolling
- **Responsive Design**: Set different logo counts for desktop, tablet and mobile
- **Speed Control**: Adjustable scroll speed (10–100)
- **Logo Height**: Customisable logo height (40–200px)
- **Pagination Dots**: Optional navigation dots with custom colour, size and roundness
- **Hover Effects**: Scale, Fade, Brighten or None
- **Zero Dependencies**: No jQuery or external libraries

## Installation

1. Upload the `logo-carousel-block.zip` file via **Plugins > Add New > Upload Plugin**
2. Activate the plugin
3. Search for **"Logo Scroller"** in the Gutenberg block inserter

## Usage

1. Add the **Logo Scroller** block to any page or post
2. Click **Select Logos** to upload your logo images
3. Optionally add a link URL to each logo via the **Logo Links** panel
4. Adjust settings in the sidebar:
   - Logo height
   - Logos per view (desktop / tablet / mobile)
   - Auto scroll on/off and speed
   - Pagination dots

## Technical Details

- **WordPress**: 6.0+
- **PHP**: 7.4+
- **Dependencies**: None (vanilla JavaScript)
- **License**: GPL v2 or later

## Browser Support

Chrome 60+, Firefox 55+, Safari 12+, Edge 79+

## Development

```bash
npm install
npm run build
```

## Changelog

### v1.1.0
- Fixed sizing bug caused by `window.resize` not firing when container width changes (CSS transitions, boxed/full-width layout switches) — replaced with `ResizeObserver`
- Standardised text domain to `logo-carousel-block` across all files
- Updated branding to Blueprint 8

### v1.0.4
- Added pagination dots with clickable navigation

### v1.0.3
- Added clickable logo links with proper security attributes

### v1.0.2
- Fixed missing `inc/` directory in plugin package

### v1.0.1
- Fixed fatal error on activation

### v1.0.0
- Initial release
