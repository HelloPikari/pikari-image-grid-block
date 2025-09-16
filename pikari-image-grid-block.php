<?php
/**
 * Plugin Name:       Pikari Image Grid Block
 * Plugin URI:        https://github.com/pikari/pikari-image-grid-block
 * Description:       A customizable image grid block with multiple layout options.
 * Version: 0.4.0
 * Requires at least: 6.6
 * Requires PHP:      8.2
 * Author:            Pikari
 * Author URI:        https://pikari.io
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       pikari-image-grid-block
 * Domain Path:       /languages
 *
 * @package PikariImageGrid
 */

// Exit if accessed directly.
if ( ! defined('ABSPATH') ) {
    exit;
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function pikari_image_grid_block_init()
{
    // Register the block by passing the build directory.
    register_block_type(__DIR__ . '/build/blocks/image-grid');
}
add_action('init', 'pikari_image_grid_block_init');

/**
 * Activation hook.
 */
function pikari_image_grid_block_activate() {
    // Code to run on plugin activation.
    flush_rewrite_rules();
}
register_activation_hook( __FILE__, 'pikari_image_grid_block_activate' );

/**
 * Deactivation hook.
 */
function pikari_image_grid_block_deactivate() {
    // Code to run on plugin deactivation.
    flush_rewrite_rules();
}
register_deactivation_hook( __FILE__, 'pikari_image_grid_block_deactivate' );
