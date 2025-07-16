/**
 * WordPress dependencies
 */
import { MediaPlaceholder } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { handlePlaceholderImageSelection } from '../utils/imageHelpers';

/**
 * Image placeholder component for empty state
 * @param {Object}   props               - Component props
 * @param {Object}   props.attributes    - Block attributes
 * @param {Function} props.setAttributes - Function to update block attributes
 */
export default function ImagePlaceholder( { attributes, setAttributes } ) {
    return (
        <MediaPlaceholder
            icon="grid-view"
            labels={ {
                title: __( 'Image Grid', 'pikari-image-grid' ),
                instructions: __(
                    'Upload images or select from your media library to create a beautiful image grid.',
                    'pikari-image-grid'
                ),
            } }
            onSelect={ ( media ) =>
                handlePlaceholderImageSelection( media, attributes, setAttributes )
            }
            accept="image/*"
            allowedTypes={ [ 'image' ] }
            multiple
        />
    );
}