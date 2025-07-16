/**
 * WordPress dependencies
 */
import { ResizableBox } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { getNumericValue } from '../utils/imageHelpers';

/**
 * Image grid display component
 * @param {Object}   props               - Component props
 * @param {Array}    props.images        - Array of image objects
 * @param {string}   props.gridLayout    - Grid layout type
 * @param {number}   props.gap           - Gap between images
 * @param {string}   props.width         - Grid width
 * @param {string}   props.height        - Grid height
 * @param {Function} props.setAttributes - Function to update block attributes
 */
export default function ImageGrid( {
    images,
    gridLayout,
    gap,
    width,
    height,
    setAttributes,
} ) {
    // Calculate dimensions for the ResizableBox
    const currentWidth = width || 'fit-content';
    const currentHeight = height || 'fit-content';

    // For width and height, only use numeric value if explicitly set
    const resizableWidth = getNumericValue( width );
    const resizableHeight = getNumericValue( height );

    return (
        <ResizableBox
            key={ `${ width }-${ height }` }
            size={ {
                width: resizableWidth || undefined,
                height: resizableHeight || undefined,
            } }
            style={ {
                width: currentWidth,
                height: currentHeight,
            } }
            minHeight={ 200 }
            minWidth={ 200 }
            enable={ {
                top: false,
                right: true,
                bottom: true,
                left: false,
                topRight: false,
                bottomRight: true,
                bottomLeft: false,
                topLeft: false,
            } }
            onResizeStop={ ( event, direction, element ) => {
                // Get the actual element dimensions after resize
                const rect = element.getBoundingClientRect();
                setAttributes( {
                    width: `${ Math.round( rect.width ) }px`,
                    height: `${ Math.round( rect.height ) }px`,
                } );
            } }
            className="image-grid-resizable"
        >
            <div
                className={ classnames(
                    'image-grid-container',
                    `is-layout-${ gridLayout }`
                ) }
                style={ {
                    width: '100%',
                    height: '100%',
                    display: 'grid',
                    gap: `${ gap }px`,
                } }
            >
                { images.map( ( image, index ) => (
                    <div
                        key={ index }
                        className={ classnames(
                            'image-grid-item',
                            { 'has-placeholder': ! image.url }
                        ) }
                    >
                        { image.url ? (
                            <img
                                src={ image.url }
                                alt={ image.alt }
                                style={ {
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                } }
                            />
                        ) : (
                            <div className="image-placeholder">
                                <span>
                                    { sprintf(
                                    /* translators: %d: Image number */
                                        __(
                                            'Image %d',
                                            'pikari-image-grid'
                                        ),
                                        index + 1
                                    ) }
                                </span>
                            </div>
                        ) }
                    </div>
                ) ) }
            </div>
        </ResizableBox>
    );
}