# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

[PROJECT_NAME] is a WordPress [PROJECT_SUBTYPE] that [PROJECT_DESCRIPTION].

## Development Commands

### Build and Development

```bash
# Install dependencies
npm install
composer install

# Start development build with file watching
npm start

# Production build
npm run build

# Create plugin ZIP for distribution
npm run plugin-zip
```

### Code Quality

```bash
# Run all linting
npm run lint:all

# Auto-fix linting issues
npm run lint:fix

# Run PHP linting only
npm run lint:php

# Run JavaScript linting only
npm run lint:js

# Run CSS linting only
npm run lint:css
```

### Testing

```bash
# Run JavaScript tests
npm test

# Run PHP tests
composer test
```

### WordPress Playground

```bash
# Start local WordPress Playground
npm run playground
```

## Coding Standards

### WordPress Development Standards

**Core Principles:**

-   Follow [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/)
-   Use WordPress APIs and functions instead of direct PHP/MySQL
-   Maintain backwards compatibility
-   Support internationalization (i18n)
-   Ensure accessibility (a11y)

**PHP Standards:**

-   Follow WordPress PHP Coding Standards
-   Use tabs for indentation in PHP files
-   Opening braces on same line for control structures
-   Use Yoda conditions for comparisons
-   Prefix all functions, classes, and globals

**JavaScript Standards:**

-   Follow WordPress JavaScript Coding Standards
-   Use tabs for indentation in JS files
-   Prefer native JavaScript over jQuery when possible
-   Use `wp` global for WordPress JavaScript APIs

**Database Operations:**

-   Use `$wpdb` for all database operations
-   Properly prepare all SQL queries
-   Use WordPress table prefixes
-   Never execute raw SQL from user input

**File Organization:**

-   Follow WordPress file naming conventions
-   Use lowercase with hyphens for file names
-   Organize files logically by functionality

### Code Style and Linting

**IMPORTANT**: All generated code MUST follow the linting configurations defined in this project:

-   **PHP**: Use 4 spaces for indentation (NO TABS) - see phpcs.xml
-   **JavaScript**: Follow ESLint configuration (ESLint handles all JS formatting)
-   **CSS/SCSS**: Follow Stylelint configuration (Prettier formats CSS/SCSS)
-   Generated code must pass all linting checks without modifications

Note: Prettier is configured to ignore JavaScript files. ESLint handles all JavaScript formatting to ensure WordPress coding standards are followed.

### General Principles

-   Write clean, readable, and maintainable code
-   Follow the principle of least surprise
-   Prefer clarity over cleverness
-   Use meaningful variable and function names
-   Keep functions small and focused on a single responsibility
-   Comment complex logic, not obvious code
-   Maintain consistent formatting (enforced by linters)

### Documentation

-   Document all public APIs
-   Include examples in documentation
-   Keep documentation up-to-date with code changes
-   Use inline comments sparingly and only when necessary

### Error Handling

-   Always handle errors appropriately
-   Provide meaningful error messages
-   Log errors for debugging but don't expose sensitive info
-   Fail fast and fail clearly

### Performance

-   Optimize for readability first, performance second
-   Profile before optimizing
-   Avoid premature optimization
-   Consider caching for expensive operations

## Architecture

### Project Structure

-   `[MAIN_FILE]` - Main plugin/theme file with WordPress headers
-   `includes/` - PHP classes and core functionality (PSR-4 autoloaded)
-   `src/` - JavaScript and SCSS source files
-   `build/` - Compiled assets (gitignored, created by build process)
-   `languages/` - Translation files (.pot, .po, .mo)
-   `tests/` - Unit and integration tests
-   `bin/` - Utility scripts (e.g., release automation)
-   `_playground/` - WordPress Playground configuration

### Key WordPress Patterns

-   Use WordPress hooks: `add_action()`, `add_filter()`, `remove_action()`, `remove_filter()`
-   Enqueue scripts and styles properly using `wp_enqueue_script()` and `wp_enqueue_style()`
-   Register scripts/styles first with `wp_register_script()` when reusing
-   Use WordPress APIs for all operations (database, HTTP requests, filesystem)
-   Follow WordPress file naming conventions
-   Use WordPress template hierarchy for themes

### Technical Dependencies

-   WordPress [WP_VERSION]
-   PHP [PHP_VERSION]
-   Node.js for build tools
-   Composer for PHP dependencies

## Git Workflow

-   Main branch: `main`
-   Feature branches: `feature/description`
-   Bugfix branches: `fix/description`
-   Commit format: `type: Brief description`
    -   Types: feat, fix, docs, style, refactor, test, chore
-   Pre-commit hooks run linting automatically via Husky
-   All commits must pass linting

## Testing Strategy

-   JavaScript tests in `tests/unit/`
-   PHP tests in `tests/` following PHPUnit structure
-   Run all tests before submitting PR
-   Write tests for new features and bug fixes
-   Aim for good test coverage

## Security Considerations

### WordPress Security Best Practices

**Data Validation & Sanitization:**

-   Validate all input data using WordPress functions
-   Use `sanitize_*()` functions for input sanitization
-   Escape output using `esc_*()` functions
-   Never trust user input, even from admins

**Nonces:**

-   Use WordPress nonces for all forms and AJAX requests
-   Verify nonces before processing any action
-   Generate unique nonces for different actions

**Capabilities & Permissions:**

-   Always check user capabilities before actions
-   Use `current_user_can()` for permission checks
-   Don't check roles directly, check capabilities
-   Apply principle of least privilege

**Database Security:**

-   Use `$wpdb->prepare()` for all database queries
-   Never concatenate user input into SQL
-   Use proper data types in queries
-   Validate data before database operations

**File Operations:**

-   Use WordPress Filesystem API for file operations
-   Validate file types and extensions
-   Never allow arbitrary file uploads
-   Check file permissions

**AJAX Security:**

-   Use `wp_ajax_*` and `wp_ajax_nopriv_*` actions
-   Always verify nonces in AJAX handlers
-   Check user capabilities in AJAX functions
-   Return proper error responses

**Common Vulnerabilities to Avoid:**

-   SQL Injection: Use prepared statements
-   XSS: Escape all output
-   CSRF: Use nonces
-   File Inclusion: Validate file paths
-   Authentication Bypass: Check capabilities

### Input Validation

-   Never trust user input
-   Validate all input on the server side
-   Use allowlists over blocklists when possible
-   Validate data type, length, format, and range

### Output Escaping

-   Escape all output based on context
-   Escape late (right before output)
-   Use context-appropriate escaping functions

### Authentication & Authorization

-   Check user permissions before any sensitive operation
-   Use secure session management
-   Implement proper access controls
-   Never store passwords in plain text

### Data Protection

-   Use HTTPS for all communications
-   Encrypt sensitive data at rest
-   Follow the principle of least privilege
-   Never commit secrets or API keys to version control
-   Use environment variables for sensitive configuration

### Dependency Management

-   Keep all dependencies up to date
-   Regularly audit dependencies for vulnerabilities
-   Only use trusted packages from reputable sources
-   Review dependency licenses for compatibility

## Important Notes

-   This project uses Husky for pre-commit hooks
-   All PRs must pass CI checks (linting, tests, build)
-   The `build/` folder is gitignored but required for the plugin to function
-   Releases are created from the `build` branch which includes compiled assets
-   Compatible with WordPress [WP_VERSION]+
-   Requires PHP [PHP_VERSION]+
-   Uses `@wordpress/scripts` for build tooling
-   Follow WordPress plugin/theme guidelines for wordpress.org submission

## Release Process

See bin/release.sh for automated release process

## WordPress-Specific Guidelines

### Block Editor (Gutenberg)

-   Use `@wordpress/*` packages for block editor functionality
-   Register blocks properly with `register_block_type()`
-   Provide block.json for block metadata
-   Support WordPress core blocks where applicable

### Internationalization

-   All user-facing strings must be translatable
-   Use proper text domains: `__()`, `_e()`, `_n()`, `_x()`, etc.
-   Text domain must match plugin/theme slug
-   Generate .pot files for translators

### WordPress Performance

-   Minimize database queries
-   Use object caching when available
-   Lazy load assets and functionality
-   Follow WordPress performance best practices

### Backwards Compatibility

-   Maintain compatibility with supported WordPress versions
-   Check for function existence when using newer functions
-   Provide graceful degradation

## Quick Reference

### Common WordPress Functions

```php
// Escaping
esc_html( $text )
esc_attr( $text )
esc_url( $url )
wp_kses_post( $content )

// Sanitization
sanitize_text_field( $input )
sanitize_email( $email )
absint( $number )

// Capabilities
current_user_can( 'edit_posts' )
current_user_can( 'manage_options' )

// Nonces
wp_nonce_field( 'action_name' )
wp_verify_nonce( $_POST['_wpnonce'], 'action_name' )
```

### WP-CLI Commands

```bash
# Useful during development
wp cache flush
wp rewrite flush
wp cron run --all
```
