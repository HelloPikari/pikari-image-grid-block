# Pikari Image Grid Block

A customizable image grid block for WordPress that displays four images in various layout patterns.

## Features

-   **Multiple Layout Options**: Choose from asymmetric, equal grid, or masonry layouts
-   **Responsive Images**: Uses WordPress's built-in image functions for proper srcset and lazy loading
-   **Customizable Styling**: Adjust gap between images and border radius
-   **Caption Support**: Optional captions for accessibility
-   **Resizable**: Visual resize handles in the editor
-   **Dynamic Rendering**: Server-side rendering for optimal performance
-   **Block Variations**: Three pre-configured layout styles available as block variations
-   **Flexible Sizing**: Support for custom width and height with multiple unit options

## Requirements

-   WordPress 6.6 or higher
-   PHP 8.2 or higher
-   Node.js 16.0 or higher (for development)

## Installation

1. Upload the `pikari-image-grid-block` folder to your `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. The Image Grid block will be available in the block editor under the "Pikari" category

## Development

### Prerequisites

-   Node.js 16.0 or higher (LTS recommended)
-   npm or yarn
-   Composer (for PHP dependencies)
-   WordPress 6.6 or higher
-   PHP 8.2 or higher

### Setup

```bash
# Install dependencies
npm install
composer install

# Start development build with watch mode
npm start

# Create production build
npm run build

# Create plugin zip for distribution
npm run plugin-zip
```

### Available NPM Scripts

```bash
# Development
npm start                    # Start development build with file watching
npm run build               # Create production build

# Code Quality & Linting
npm run lint:all            # Run all linting (JS, CSS, PHP, Markdown)
npm run lint:fix            # Auto-fix all linting issues
npm run lint:js             # Lint JavaScript files
npm run lint:js:fix         # Auto-fix JavaScript linting issues
npm run lint:css            # Lint CSS/SCSS files
npm run lint:css:fix        # Auto-fix CSS/SCSS linting issues
npm run lint:php            # Lint PHP files
npm run lint:php:fix        # Auto-fix PHP linting issues
npm run lint:md:docs        # Lint Markdown files
npm run lint:md:fix         # Auto-fix Markdown linting issues
npm run lint:pkg-json       # Validate package.json

# Testing
npm run test:unit           # Run JavaScript unit tests
npm run test:e2e            # Run end-to-end tests

# WordPress Playground
npm run playground          # Start local WordPress Playground
npm run playground:demo     # Start Playground with demo content

# Utilities
npm run packages-update     # Update WordPress packages
npm run plugin-zip          # Create distributable plugin zip
npm run prepare             # Setup Husky for git hooks
```

## Code Quality

This project uses comprehensive linting to maintain code quality and consistency:

### Linting Configuration

- **JavaScript**: ESLint with WordPress coding standards (`.eslintrc.cjs`)
- **CSS/SCSS**: Stylelint with WordPress configuration (`.stylelintrc.json`)
- **PHP**: PHP CodeSniffer with WordPress standards (note: uses 4 spaces, not tabs)
- **Markdown**: Markdownlint for documentation
- **Prettier**: Code formatting with WordPress configuration (`.prettierrc`)

### Pre-commit Hooks

This project uses Husky and lint-staged to automatically run linting on changed files before commits:

```bash
# Husky is automatically installed when you run:
npm install

# Pre-commit hook configuration in .husky/pre-commit
# Lint-staged configuration in package.json
```

The pre-commit hook will:

1. Run PHP linting on changed `.php` files
2. Run ESLint on changed `.js` files
3. Run Stylelint on changed `.css` and `.scss` files
4. Run Markdownlint on changed `.md` files
5. Prevent commit if any linting errors are found

To bypass pre-commit hooks in emergency situations:

```bash
git commit --no-verify -m "Emergency fix"
```

### File Structure

```text
pikari-image-grid-block/
├── .husky/                  # Git hooks configuration
│   └── pre-commit          # Pre-commit linting hook
├── _playground/            # WordPress Playground configuration
│   ├── blueprint.json      # Playground blueprint
│   ├── blueprint-local.json # Local playground config
│   └── images/             # Demo images
├── bin/                    # Utility scripts
│   └── release.sh          # Release automation script
├── build/                  # Compiled assets (gitignored)
├── languages/              # Translation files
├── src/                    # Source files
│   ├── index.js           # Main entry point
│   └── blocks/
│       └── image-grid/
│           ├── block.json  # Block metadata
│           ├── index.js    # Block registration
│           ├── editor.jsx  # Editor component
│           ├── editor.scss # Editor styles
│           ├── style.scss  # Frontend/backend styles
│           ├── view.js     # Frontend JavaScript
│           └── render.php  # Server-side rendering
├── vendor/                 # Composer dependencies (gitignored)
├── .eslintrc.cjs          # ESLint configuration
├── .prettierrc            # Prettier configuration
├── .stylelintrc.json      # Stylelint configuration
├── CHANGELOG.md           # Version history
├── CLAUDE.md              # AI assistant instructions
├── composer.json          # PHP dependencies
├── package.json           # NPM configuration
├── phpcs.xml              # PHP CodeSniffer rules
└── pikari-image-grid-block.php # Main plugin file
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

## Block Version Management

When developing WordPress blocks, you'll encounter version fields in `block.json`. Here's how to manage them properly:

### Understanding Version Fields

**`apiVersion`**: The Block API version your block uses (currently 3)

- Always use the latest version unless you have specific compatibility requirements
- All blocks must use apiVersion 3+ to enable the editor iframe feature

**`version`**: Your individual block's version number

- Independent from your plugin version
- Only update when the block itself changes
- Optional field (WordPress uses its own version for cache busting if omitted)

### Best Practice: Independent Versioning

**Key Principle**: The block version should NOT automatically match your plugin version.

Example scenario:

```json
// block.json
{
  "apiVersion": 3,
  "name": "pikari/image-grid",
  "version": "0.1.0",  // Block version
  // ...
}
```

```php
// pikari-image-grid-block.php
/*
 * Plugin Name: Pikari Image Grid Block
 * Version: 0.1.0     // Plugin version (can be different!)
 */
```

### When to Update Block Versions

✅ **Update block version when**:

- Block JavaScript code changes
- Block styles are modified
- Block attributes are added/removed
- Block edit/save functions change
- Block supports or features are modified

❌ **Don't update block version when**:

- Only PHP files are updated
- Unrelated plugin bugs are fixed
- Documentation is updated
- Plugin features outside the block change

### Version Management Strategy

The release script (`bin/release.sh`) does NOT automatically update block.json versions. This is intentional and follows best practices.

To manage block versions:

1. **Manual Updates**: Update block.json version manually when block changes
2. **Automated Detection**: Consider adding a build step that detects changes in block source files
3. **Separate Tracking**: Maintain a changelog specifically for block changes

### Example Versioning Timeline

1. **Initial Release**: Both plugin and block start at 0.1.0
2. **PHP Bug Fix**: Plugin → 0.1.1, Block stays 0.1.0
3. **Block Enhancement**: Plugin → 0.2.0, Block → 0.2.0
4. **Plugin Feature**: Plugin → 0.3.0, Block stays 0.2.0
5. **Block Style Update**: Plugin → 0.3.1, Block → 0.2.1

This approach ensures:

- Clear tracking of what changed
- Accurate cache invalidation for block assets
- Better debugging when issues arise
- Compliance with WordPress block best practices

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

## Testing

Tests are planned for future releases. The project structure includes support for:

- JavaScript unit tests via `npm run test:unit`
- End-to-end tests via `npm run test:e2e`
- PHP unit tests via `composer test`

## Release Process

This plugin uses an automated release process:

```bash
# Create a new release
./bin/release.sh

# The script will:
# 1. Check for uncommitted changes
# 2. Prompt for version number
# 3. Update version in all necessary files
# 4. Build production assets
# 5. Create git tag
# 6. Push to remote repository
# 7. Create release branch with built files
# 8. Generate GitHub release
```

**Important Notes:**

- The main branch excludes built files (`build/` directory)
- The release branch includes all built files for distribution
- Block versions in `block.json` are NOT automatically updated (see Block Version Management section)
- Always test the build before creating a release

## Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository** and create your feature branch
2. **Follow coding standards** - Run `npm run lint:all` before committing
3. **Write clear commit messages** following the format: `type: Brief description`
   - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
4. **Update documentation** if needed
5. **Test your changes** thoroughly
6. **Submit a pull request** with a clear description of changes

### Development Workflow

1. Clone the repository
2. Run `npm install` and `composer install`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Run linting: `npm run lint:all`
6. Commit your changes (pre-commit hooks will run automatically)
7. Push to your fork and submit a pull request

## License

GPL v2 or later
