/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { useRef, useEffect, useState } from '@wordpress/element';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	Button,
	BaseControl,
	TextControl,
	ResizableBox,
} from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import classnames from 'classnames';
import './editor.scss';

/**
 * Edit function that renders in the admin
 * @param {Object}   root0               - The block props
 * @param {Object}   root0.attributes    - The block attributes
 * @param {Function} root0.setAttributes - Function to update block attributes
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		gridLayout,
		gap,
		imageBorderRadius,
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
		width,
		height,
	} = attributes;

	const blockProps = useBlockProps( {
		style: {
			'--image-grid-gap': `${ gap }px`,
			'--image-grid-border-radius': `${ imageBorderRadius }px`,
		},
	} );

	// Ref to track the block container for measuring parent dimensions
	const containerRef = useRef( null );

	// State to store parent dimensions
	const [ parentDimensions, setParentDimensions ] = useState( null );

	// Measure parent container dimensions
	useEffect( () => {
		if ( containerRef.current ) {
			// Get the block wrapper's parent (the actual container)
			const blockWrapper = containerRef.current.parentElement;
			const parent = blockWrapper?.parentElement;
			if ( parent ) {
				const parentWidth = parent.offsetWidth;
				const parentHeight = parent.offsetHeight;
				
				console.log( 'Block wrapper:', blockWrapper );
				console.log( 'Parent element:', parent );
				console.log( 'Parent width:', parentWidth );
				console.log( 'Parent height:', parentHeight );
				console.log( 'Parent computed style:', window.getComputedStyle( parent ) );
				
				setParentDimensions( {
					width: parentWidth,
					height: parentHeight,
				} );
			}
		}
	}, [] );

	// Calculate dimensions for the ResizableBox
	const currentWidth = width || '100%';
	const currentHeight = height || 'auto';

	// Parse numeric values for ResizableBox
	const getNumericValue = ( value ) => {
		if ( ! value || value === 'auto' ) {
			return null;
		}
		return parseInt( value );
	};

	const resizableWidth = getNumericValue( width ) || parentDimensions?.width || 600;
	const resizableHeight = getNumericValue( height ) || parentDimensions?.height || 400;

	console.log( 'Current resizable values:', {
		resizableWidth,
		resizableHeight,
		parentDimensions,
		widthAttribute: width,
		heightAttribute: height,
	} );

	const onSelectImage = ( imageNumber ) => ( media ) => {
		setAttributes( {
			[ `image${ imageNumber }Id` ]: media.id,
			[ `image${ imageNumber }Url` ]: media.url,
			[ `image${ imageNumber }Alt` ]: media.alt || '',
		} );
	};

	const onRemoveImage = ( imageNumber ) => () => {
		setAttributes( {
			[ `image${ imageNumber }Id` ]: 0,
			[ `image${ imageNumber }Url` ]: '',
			[ `image${ imageNumber }Alt` ]: '',
		} );
	};

	const onUpdateAlt = ( imageNumber ) => ( value ) => {
		setAttributes( {
			[ `image${ imageNumber }Alt` ]: value,
		} );
	};

	const renderImageControl = ( imageNumber, imageId, imageUrl, imageAlt ) => {
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
						onSelect={ onSelectImage( imageNumber ) }
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
												onClick={ onRemoveImage(
													imageNumber
												) }
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
						onChange={ onUpdateAlt( imageNumber ) }
						help={ __(
							'Describe the image for screen readers.',
							'pikari-image-grid'
						) }
					/>
				) }
			</BaseControl>
		);
	};

	const images = [
		{ id: image1Id, url: image1Url, alt: image1Alt },
		{ id: image2Id, url: image2Url, alt: image2Alt },
		{ id: image3Id, url: image3Url, alt: image3Alt },
		{ id: image4Id, url: image4Url, alt: image4Alt },
	];

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Layout Settings', 'pikari-image-grid' ) }
				>
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

				<PanelBody
					title={ __( 'Display Settings', 'pikari-image-grid' ) }
				>
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

				<PanelBody
					title={ __( 'Images', 'pikari-image-grid' ) }
					initialOpen={ true }
				>
					{ renderImageControl( 1, image1Id, image1Url, image1Alt ) }
					{ renderImageControl( 2, image2Id, image2Url, image2Alt ) }
					{ renderImageControl( 3, image3Id, image3Url, image3Alt ) }
					{ renderImageControl( 4, image4Id, image4Url, image4Alt ) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div ref={ containerRef } style={ { height: '100%' } }>
					<ResizableBox
					size={ {
						width: resizableWidth,
						height: resizableHeight,
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
					onResizeStop={ ( event, direction, element, delta ) => {
						const newWidth = resizableWidth + delta.width;
						const newHeight = resizableHeight + delta.height;
						setAttributes( {
							width: `${ newWidth }px`,
							height: `${ newHeight }px`,
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
							<div key={ index } className="image-grid-item">
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
				</div>
			</div>
		</>
	);
}
