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
];

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
for ( $i = 1; $i <= 4; $i++ ) {
    $image_id = $attributes[ "image{$i}Id" ] ?? 0;
    if ( $image_id ) {
        $images[] = [
            'id' => $image_id,
            'alt' => $attributes[ "image{$i}Alt" ] ?? '',
        ];
    } else {
        $images[] = null;
    }
}

?>

<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- get_block_wrapper_attributes() output is safe ?>>
    <div class="<?php echo esc_attr(implode(' ', $container_classes)); ?>">
        <?php foreach ( $images as $index => $image ) : ?>
            <div class="image-grid-item">
            <?php if ( $image && $image['id'] ) : ?>
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