# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2025-07-15

## [0.2.0] - 2025-07-15

### Added

-   Semantic HTML structure with `<figure>` elements for images
-   MediaPlaceholder component for empty block state

### Fixed

-   Dynamic parent dimension measurement for responsive sizing
-   Block centering when placed inside WordPress Group blocks
-   ResizableBox behavior with fit-content when dimensions not set
-   Placeholder border display using has-placeholder class
-   Frontend dimension respect for width/height settings

### Changed

-   Improved empty block handling without min-height constraints
-   Enhanced placeholder styling to prevent border cut-off

## [0.1.0] - 2025-07-14

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

[Unreleased]: https://github.com/HelloPikari/pikari-image-grid-block/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/HelloPikari/pikari-image-grid-block/compare/v0.2.0...v0.2.0[0.2.0]: https://github.com/HelloPikari/pikari-image-grid-block/compare/v0.1.0...v0.2.0[0.1.0]: https://github.com/HelloPikari/pikari-image-grid-block/compare/v0.1.0...v0.1.0