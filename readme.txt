=== Logo Scroller Block ===
Contributors: blueprint8
Tags: logo, carousel, scroller, block, gutenberg
Requires at least: 6.0
Tested up to: 6.7
Requires PHP: 7.4
Stable tag: 1.1.0
License: GPL v2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A lightweight, dependency-free Gutenberg block for infinite logo carousels. No jQuery, no bloat.

== Description ==

Logo Scroller Block adds a smooth infinite logo carousel to your WordPress site using a single Gutenberg block. No jQuery, no external libraries — just clean JavaScript and CSS transforms for maximum performance.

**Features:**

* Upload and manage multiple logo images directly from the block
* Clickable logo links (open in new tab)
* Auto-scroll with adjustable speed
* Responsive: set different logo counts for desktop, tablet and mobile
* Pagination dots with customisable colour, size and roundness
* Hover effects: Scale, Fade, Brighten or None
* Adjustable logo height (40–200px)
* Full-width, wide and centred alignment support
* Custom spacing via block padding and margin controls
* Zero dependencies — no jQuery, no external scripts

== Installation ==

1. Upload the `logo-carousel-block` folder to the `/wp-content/plugins/` directory, or install via **Plugins > Add New > Upload Plugin**.
2. Activate the plugin through the **Plugins** menu in WordPress.
3. In the Gutenberg editor, search for **"Logo Scroller"** and add the block to any page or post.

== Frequently Asked Questions ==

= Does this plugin require jQuery? =

No. The carousel is built with vanilla JavaScript and CSS transforms only.

= Can I add links to individual logos? =

Yes. Each logo has a URL field in the **Logo Links** panel in the block sidebar.

= How do I control how many logos are visible? =

Use the **Responsive Settings** panel to set the number of logos visible on desktop, tablet and mobile independently.

= Does it work with full-site editing (FSE) themes? =

Yes. The block supports wide, full and centre alignments and works with any FSE or classic theme.

== Screenshots ==

1. Logo Scroller block in the Gutenberg editor
2. Frontend view with logos scrolling smoothly

== Changelog ==

= 1.1.0 =
* Fixed item sizing when container width changes without a window resize (CSS transitions, boxed/full-width layout switches) by replacing `window.resize` with `ResizeObserver`
* Added `transition: none` to track and items to prevent theme-level `transition: all` from interfering with JS-driven transforms
* Improved clone duplication logic to always cover the widest breakpoint
* Updated plugin branding to Blueprint 8
* Standardised text domain to `logo-carousel-block` across all files
* Added explicit `load_plugin_textdomain()` call

= 1.0.4 =
* Added pagination dots with clickable navigation
* Added "Show Pagination Dots" toggle in Scroll Settings panel
* Smooth transitions when navigating between pages
* Enhanced responsive pagination design

= 1.0.3 =
* Added logo URL linking functionality
* Added "Logo Links" panel in sidebar
* Proper link security (target="_blank", rel="noopener noreferrer")

= 1.0.2 =
* Fixed missing `inc/` directory in plugin package

= 1.0.1 =
* Fixed fatal error on plugin activation

= 1.0.0 =
* Initial release

== Upgrade Notice ==

= 1.1.0 =
Fixes a sizing bug that caused logos to appear too small after container width changes (e.g. switching between boxed and full-width layouts without resizing the browser window).
