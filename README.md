# Pikari Image Grid Gutenberg Block

A customizable image grid block for WordPress that displays four images in various layout patterns.

## Features

-   **Multiple Layout Options**: Choose from asymmetric, equal grid, or masonry layouts
-   **Responsive Images**: Uses WordPress's built-in image functions for proper srcset and lazy loading
-   **Customizable Styling**: Adjust gap between images and border radius
-   **Caption Support**: Optional captions for accessibility
-   **Resizable**: Visual resize handles in the editor
-   **Dynamic Rendering**: Server-side rendering for optimal performance

## Installation

1. Upload the `pikari-image-grid-block` folder to your `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. The Image Grid block will be available in the block editor under the "Pikari" category

## Development

### Prerequisites

-   Node.js 14.0 or higher
-   npm or yarn
-   WordPress 6.0 or higher

### Setup

```bash
# Install dependencies
npm install

# Start development build with watch mode
npm start

# Create production build
npm run build

# Create plugin zip
npm run plugin-zip
```

### File Structure

```
pikari-image-grid-block/
├── pikari-image-grid-block.php    # Main plugin file
├── package.json             # NPM configuration
├── build/                   # Compiled assets (generated)
└── src/
    └── blocks/
        └── image-grid/
            ├── block.json   # Block metadata
            ├── index.js     # Block registration
            ├── editor.jsx   # Editor component
            ├── editor.scss  # Editor styles
            ├── style.scss   # Frontend/backend styles
            ├── view.js      # Frontend JavaScript
            └── render.php   # Server-side rendering
```

## Usage

1. Add the Image Grid block to your post or page
2. Select images using the sidebar controls
3. Choose a layout style (asymmetric, equal, or masonry)
4. Adjust styling options as needed
5. Optionally enable captions and set alt text for accessibility

## Block Attributes

-   `gridLayout` - Layout style: asymmetric, equal, or masonry
-   `gap` - Space between images (0-50px)
-   `imageBorderRadius` - Corner radius for images (0-50px)
-   `enableCaptions` - Show/hide image captions
-   `width` - Grid width (auto, px, %, vw)
-   `height` - Grid height (auto, px, %, vh)
-   `image1Id` through `image4Id` - WordPress attachment IDs
-   `image1Alt` through `image4Alt` - Alt text for each image

## Filters

### PHP Filters

```php
// Modify block attributes before rendering
add_filter('pikari_image_grid_attributes', function($attributes, $block) {
    // Modify attributes
    return $attributes;
}, 10, 2);

// Customize image size used for rendering
add_filter('pikari_image_grid_image_size', function($size) {
    return 'large'; // Default is 'large'
});
```

## License

GPL v2 or later
