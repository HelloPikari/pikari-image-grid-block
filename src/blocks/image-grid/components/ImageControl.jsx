/**
 * WordPress dependencies
 */
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, BaseControl, TextControl } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Image control component for managing individual images
 * @param {Object}   props                - Component props
 * @param {number}   props.imageNumber    - The image number (1-4)
 * @param {number}   props.imageId        - The image ID
 * @param {string}   props.imageUrl       - The image URL
 * @param {string}   props.imageAlt       - The image alt text
 * @param {boolean}  props.enableCaptions - Whether captions are enabled
 * @param {Function} props.onSelectImage  - Handler for image selection
 * @param {Function} props.onRemoveImage  - Handler for image removal
 * @param {Function} props.onUpdateAlt    - Handler for alt text update
 */
export default function ImageControl( {
    imageNumber,
    imageId,
    imageUrl,
    imageAlt,
    enableCaptions,
    onSelectImage,
    onRemoveImage,
    onUpdateAlt,
} ) {
    return (
        <BaseControl
            id={ `pikari-image-grid-control-${ imageNumber }` }
            label={ sprintf(
                /* translators: %d: Image number */
                __( 'Image %d', 'pikari-image-grid' ),
                imageNumber
            ) }
            className="image-grid-control"
        >
            <MediaUploadCheck>
                <MediaUpload
                    onSelect={ onSelectImage }
                    allowedTypes={ [ 'image' ] }
                    value={ imageId }
                    render={ ( { open } ) => (
                        <div className="image-control-wrapper">
                            { imageUrl ? (
                                <>
                                    <img
                                        src={ imageUrl }
                                        alt={ imageAlt }
                                        style={ {
                                            width: '100%',
                                            height: '150px',
                                            objectFit: 'cover',
                                            borderRadius: '4px',
                                            marginBottom: '8px',
                                        } }
                                    />
                                    <div
                                        style={ {
                                            display: 'flex',
                                            gap: '8px',
                                            marginBottom: '8px',
                                        } }
                                    >
                                        <Button
                                            onClick={ open }
                                            variant="secondary"
                                            size="small"
                                        >
                                            { __(
                                                'Replace',
                                                'pikari-image-grid'
                                            ) }
                                        </Button>
                                        <Button
                                            onClick={ onRemoveImage }
                                            variant="secondary"
                                            size="small"
                                            isDestructive
                                        >
                                            { __(
                                                'Remove',
                                                'pikari-image-grid'
                                            ) }
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <Button
                                    onClick={ open }
                                    variant="secondary"
                                >
                                    { __(
                                        'Select Image',
                                        'pikari-image-grid'
                                    ) }
                                </Button>
                            ) }
                        </div>
                    ) }
                />
            </MediaUploadCheck>
            { imageUrl && enableCaptions && (
                <TextControl
                    label={ __( 'Alt Text', 'pikari-image-grid' ) }
                    value={ imageAlt }
                    onChange={ onUpdateAlt }
                    help={ __(
                        'Describe the image for screen readers.',
                        'pikari-image-grid'
                    ) }
                />
            ) }
        </BaseControl>
    );
}