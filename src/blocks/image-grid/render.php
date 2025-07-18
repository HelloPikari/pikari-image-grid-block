<?php
/**
 * Image Grid Block Template - forcing action to run
 *
 * @package PikariImageGrid
 *
 * @param array    $attributes The block attributes.
 * @param string   $content    The block content.
 * @param WP_Block $block      The block instance.
 */

// Extract attributes
$grid_layout = $attributes['gridLayout'] ?? 'asymmetric';
$gap = $attributes['gap'] ?? 16;
$image_border_radius = $attributes['imageBorderRadius'] ?? 8;
$image_border_width = $attributes['imageBorderWidth'] ?? 0;
$image_border_color = $attributes['imageBorderColor'] ?? '';
$enable_captions = $attributes['enableCaptions'] ?? false;
$width = $attributes['width'] ?? '';
$height = $attributes['height'] ?? '';

// Build wrapper classes
$container_classes = [
    'image-grid-container',
    'is-layout-' . $grid_layout,
];

// if ( ! empty($attributes['className']) ) {
// $wrapper_classes[] = $attributes['className'];
// }

// if ( ! empty($attributes['align']) ) {
// $wrapper_classes[] = 'align' . $attributes['align'];
// }

// Build wrapper styles
$wrapper_styles = [
    '--image-grid-gap: ' . $gap . 'px',
    '--image-grid-border-radius: ' . $image_border_radius . 'px',
    '--image-grid-border-width: ' . $image_border_width . 'px',
];

if ( ! empty($image_border_color) ) {
    $wrapper_styles[] = '--image-grid-border-color: ' . esc_attr($image_border_color);
}

if ( ! empty($width) ) {
    $wrapper_styles[] = 'width: ' . esc_attr($width);
}

if ( ! empty($height) ) {
    $wrapper_styles[] = 'height: ' . esc_attr($height);
}

// Get block wrapper attributes
$wrapper_attributes = get_block_wrapper_attributes(
    [
        'style' => implode('; ', $wrapper_styles),
    ]
);

// Collect images
$images = [];
$has_images = false;
for ( $i = 1; $i <= 4; $i++ ) {
    $image_id = $attributes[ "image{$i}Id" ] ?? 0;
    if ( $image_id ) {
        $images[] = [
            'id' => $image_id,
            'alt' => $attributes[ "image{$i}Alt" ] ?? '',
        ];
        $has_images = true;
    } else {
        $images[] = null;
    }
}

// Don't render anything if no images are set
if ( ! $has_images ) {
    return '';
}

?>

<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- get_block_wrapper_attributes() output is safe ?>>
    <div class="<?php echo esc_attr(implode(' ', $container_classes)); ?>">
        <?php foreach ( $images as $index => $image ) : ?>
            <div class="image-grid-item<?php echo ( ! $image || ! $image['id'] ) ? ' has-placeholder' : ''; ?>">
            <?php if ( $image && $image['id'] ) : ?>
                <figure class="image-grid-figure">
                <?php
                // Use WordPress functions for proper responsive images
                echo wp_get_attachment_image(
                    $image['id'],
                    'large',
                    false,
                    [
                        'class' => 'image-grid-image',
                        'alt' => esc_attr($image['alt']),
                        'loading' => 'lazy',
                        'decoding' => 'async',
                    ]
                );
                ?>
                <?php if ( $enable_captions && $image['alt'] ) : ?>
                    <figcaption class="image-grid-caption"><?php echo esc_html($image['alt']); ?></figcaption>
                <?php endif; ?>
                </figure>
                <?php else : ?>
                    <div class="image-placeholder">
                        <span>
                    <?php
                    /* translators: %d: Image number */
                    echo esc_html(sprintf(__('Image %d', 'pikari-image-grid'), $index + 1));
                    ?>
                        </span>
                    </div>
                <?php endif; ?>
            </div>
        <?php endforeach; ?>
    </div>
</div>