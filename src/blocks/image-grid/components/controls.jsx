/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import {
    PanelBody,
    RangeControl,
    SelectControl,
    ToggleControl,
    TextControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import ImageControl from './ImageControl';
import {
    createSelectImageHandler,
    createRemoveImageHandler,
    createUpdateAltHandler,
} from '../utils/imageHelpers';

/**
 * Layout settings panel
 * @param {Object}   props                   - Component props
 * @param {string}   props.gridLayout        - Current grid layout
 * @param {number}   props.gap               - Gap between images
 * @param {number}   props.imageBorderRadius - Border radius for images
 * @param {Function} props.setAttributes     - Function to update block attributes
 */
function LayoutSettings( { gridLayout, gap, imageBorderRadius, setAttributes } ) {
    return (
        <PanelBody title={ __( 'Layout Settings', 'pikari-image-grid' ) }>
            <SelectControl
                label={ __( 'Grid Layout', 'pikari-image-grid' ) }
                value={ gridLayout }
                options={ [
                    {
                        label: __( 'Asymmetric', 'pikari-image-grid' ),
                        value: 'asymmetric',
                    },
                    {
                        label: __( 'Equal Grid', 'pikari-image-grid' ),
                        value: 'equal',
                    },
                    {
                        label: __( 'Masonry', 'pikari-image-grid' ),
                        value: 'masonry',
                    },
                ] }
                onChange={ ( value ) =>
                    setAttributes( {
                        gridLayout: value,
                    } )
                }
                help={ __(
                    'Choose how the images are arranged in the grid.',
                    'pikari-image-grid'
                ) }
            />

            <RangeControl
                label={ __(
                    'Gap Between Images',
                    'pikari-image-grid'
                ) }
                value={ gap }
                onChange={ ( value ) =>
                    setAttributes( {
                        gap: value,
                    } )
                }
                min={ 0 }
                max={ 50 }
                step={ 1 }
            />

            <RangeControl
                label={ __(
                    'Image Border Radius',
                    'pikari-image-grid'
                ) }
                value={ imageBorderRadius }
                onChange={ ( value ) =>
                    setAttributes( {
                        imageBorderRadius: value,
                    } )
                }
                min={ 0 }
                max={ 50 }
                step={ 1 }
                help={ __(
                    'Add rounded corners to images.',
                    'pikari-image-grid'
                ) }
            />
        </PanelBody>
    );
}

/**
 * Display settings panel
 * @param {Object}   props                - Component props
 * @param {boolean}  props.enableCaptions - Whether captions are enabled
 * @param {Function} props.setAttributes  - Function to update block attributes
 */
function DisplaySettings( { enableCaptions, setAttributes } ) {
    return (
        <PanelBody title={ __( 'Display Settings', 'pikari-image-grid' ) }>
            <ToggleControl
                label={ __( 'Enable Captions', 'pikari-image-grid' ) }
                checked={ enableCaptions }
                onChange={ ( value ) =>
                    setAttributes( {
                        enableCaptions: value,
                    } )
                }
                help={ __(
                    'Show image captions below each image.',
                    'pikari-image-grid'
                ) }
            />
        </PanelBody>
    );
}

/**
 * Dimension settings panel
 * @param {Object}   props               - Component props
 * @param {string}   props.width         - Grid width
 * @param {string}   props.height        - Grid height
 * @param {Function} props.setAttributes - Function to update block attributes
 */
function DimensionSettings( { width, height, setAttributes } ) {
    return (
        <PanelBody title={ __( 'Dimensions', 'pikari-image-grid' ) }>
            <div
                style={ {
                    display: 'flex',
                    gap: '8px',
                } }
            >
                <TextControl
                    label={ __( 'Width', 'pikari-image-grid' ) }
                    value={ width }
                    onChange={ ( value ) =>
                        setAttributes( {
                            width: value,
                        } )
                    }
                    placeholder={ __( 'Auto', 'pikari-image-grid' ) }
                    help={ __(
                        'Enter width with unit (px, %, vw)',
                        'pikari-image-grid'
                    ) }
                />

                <TextControl
                    label={ __( 'Height', 'pikari-image-grid' ) }
                    value={ height }
                    onChange={ ( value ) =>
                        setAttributes( {
                            height: value,
                        } )
                    }
                    placeholder={ __( 'Auto', 'pikari-image-grid' ) }
                    help={ __(
                        'Enter height with unit (px, %, vh)',
                        'pikari-image-grid'
                    ) }
                />
            </div>
        </PanelBody>
    );
}

/**
 * Images panel with all image controls
 * @param {Object}   props               - Component props
 * @param {Object}   props.attributes    - Block attributes
 * @param {Function} props.setAttributes - Function to update block attributes
 */
function ImagesPanel( { attributes, setAttributes } ) {
    const {
        enableCaptions,
        image1Id,
        image1Url,
        image1Alt,
        image2Id,
        image2Url,
        image2Alt,
        image3Id,
        image3Url,
        image3Alt,
        image4Id,
        image4Url,
        image4Alt,
    } = attributes;

    return (
        <PanelBody
            title={ __( 'Images', 'pikari-image-grid' ) }
            initialOpen={ false }
        >
            <ImageControl
                imageNumber={ 1 }
                imageId={ image1Id }
                imageUrl={ image1Url }
                imageAlt={ image1Alt }
                enableCaptions={ enableCaptions }
                onSelectImage={ createSelectImageHandler( setAttributes, 1 ) }
                onRemoveImage={ createRemoveImageHandler( setAttributes, 1 ) }
                onUpdateAlt={ createUpdateAltHandler( setAttributes, 1 ) }
            />
            <ImageControl
                imageNumber={ 2 }
                imageId={ image2Id }
                imageUrl={ image2Url }
                imageAlt={ image2Alt }
                enableCaptions={ enableCaptions }
                onSelectImage={ createSelectImageHandler( setAttributes, 2 ) }
                onRemoveImage={ createRemoveImageHandler( setAttributes, 2 ) }
                onUpdateAlt={ createUpdateAltHandler( setAttributes, 2 ) }
            />
            <ImageControl
                imageNumber={ 3 }
                imageId={ image3Id }
                imageUrl={ image3Url }
                imageAlt={ image3Alt }
                enableCaptions={ enableCaptions }
                onSelectImage={ createSelectImageHandler( setAttributes, 3 ) }
                onRemoveImage={ createRemoveImageHandler( setAttributes, 3 ) }
                onUpdateAlt={ createUpdateAltHandler( setAttributes, 3 ) }
            />
            <ImageControl
                imageNumber={ 4 }
                imageId={ image4Id }
                imageUrl={ image4Url }
                imageAlt={ image4Alt }
                enableCaptions={ enableCaptions }
                onSelectImage={ createSelectImageHandler( setAttributes, 4 ) }
                onRemoveImage={ createRemoveImageHandler( setAttributes, 4 ) }
                onUpdateAlt={ createUpdateAltHandler( setAttributes, 4 ) }
            />
        </PanelBody>
    );
}

/**
 * All sidebar controls for the Image Grid block
 * @param {Object}   props               - Component props
 * @param {Object}   props.attributes    - Block attributes
 * @param {Function} props.setAttributes - Function to update block attributes
 */
export default function Controls( { attributes, setAttributes } ) {
    const {
        gridLayout,
        gap,
        imageBorderRadius,
        enableCaptions,
        width,
        height,
    } = attributes;

    return (
        <InspectorControls>
            <LayoutSettings
                gridLayout={ gridLayout }
                gap={ gap }
                imageBorderRadius={ imageBorderRadius }
                setAttributes={ setAttributes }
            />
            <DisplaySettings
                enableCaptions={ enableCaptions }
                setAttributes={ setAttributes }
            />
            <DimensionSettings
                width={ width }
                height={ height }
                setAttributes={ setAttributes }
            />
            <ImagesPanel
                attributes={ attributes }
                setAttributes={ setAttributes }
            />
        </InspectorControls>
    );
}