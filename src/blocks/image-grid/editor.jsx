/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { useRef } from '@wordpress/element';
import './editor.scss';

/**
 * Internal dependencies
 */
import Controls from './components/controls';
import ImagePlaceholder from './components/ImagePlaceholder';
import ImageGrid from './components/ImageGrid';
import { extractImagesFromAttributes } from './utils/imageHelpers';

/**
 * Edit function that renders in the admin
 * @param {Object}   root0               - The block props
 * @param {Object}   root0.attributes    - The block attributes
 * @param {Function} root0.setAttributes - Function to update block attributes
 */
export default function Edit( { attributes, setAttributes } ) {
	const { gap, imageBorderRadius, imageBorderWidth, imageBorderColor, gridLayout, width, height } = attributes;

	const blockProps = useBlockProps( {
		style: {
			'--image-grid-gap': `${ gap }px`,
			'--image-grid-border-radius': `${ imageBorderRadius }px`,
			'--image-grid-border-width': `${ imageBorderWidth }px`,
			'--image-grid-border-color': imageBorderColor || 'transparent',
		},
	} );

	// Ref to track the block container for measuring parent dimensions
	const containerRef = useRef( null );

	// Extract images from attributes
	const images = extractImagesFromAttributes( attributes );

	// Check if all images are empty
	const hasImages = images.some( ( image ) => image.url );

	// If no images, show placeholder
	if ( ! hasImages ) {
		return (
			<>
				<Controls attributes={ attributes } setAttributes={ setAttributes } />
				<div { ...blockProps }>
					<ImagePlaceholder
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
				</div>
			</>
		);
	}

	return (
		<>
			<Controls attributes={ attributes } setAttributes={ setAttributes } />
			<div { ...blockProps }>
				<div ref={ containerRef } style={ { height: '100%' } }>
					<ImageGrid
						images={ images }
						gridLayout={ gridLayout }
						gap={ gap }
						width={ width }
						height={ height }
						setAttributes={ setAttributes }
					/>
				</div>
			</div>
		</>
	);
}
