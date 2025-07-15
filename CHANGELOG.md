# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

-   Initial release of Pikari Image Grid Block
-   Multiple layout options: asymmetric, equal grid, and masonry layouts
-   Responsive image support with WordPress srcset and lazy loading
-   Customizable styling options:
    -   Adjustable gap between images (0-50px)
    -   Configurable border radius (0-50px)
    -   Resizable grid with visual handles in editor
-   Caption support for accessibility
-   Server-side rendering for optimal performance
-   Block inspector controls for all image selections
-   Support for WordPress 6.0+
-   PHP 8.2+ compatibility
-   Comprehensive build tooling with @wordpress/scripts
-   Automated CI/CD with GitHub Actions
-   Pre-commit hooks with Husky and lint-staged
-   PHP filters for customization:
    -   `pikari_image_grid_attributes` - Modify block attributes before rendering
    -   `pikari_image_grid_image_size` - Customize image size used for rendering

[Unreleased]: https://github.com/HelloPikari/pikari-image-grid-block/compare/main...HEAD